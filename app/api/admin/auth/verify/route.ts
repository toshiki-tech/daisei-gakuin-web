import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required', valid: false },
        { status: 400 }
      )
    }

    // 使用 Supabase 验证 token（使用 service_role key，与其他 API 路由一致）
    const { data: { user }, error } = await supabaseServer.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token', valid: false },
        { status: 401 }
      )
    }

    // Token 有效，返回用户信息
    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Verification failed', valid: false },
      { status: 500 }
    )
  }
}

