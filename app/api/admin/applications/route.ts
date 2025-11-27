import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

// 验证用户是否已登录
// 使用 service_role key 验证 token（因为 supabaseServer 已经配置了 service_role key）
async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')
  
  // 使用 service_role key 的客户端验证 token
  // 这样可以绕过 RLS，管理员应该有完全访问权限
  const { data: { user }, error } = await supabaseServer.auth.getUser(token)
  
  if (error || !user) {
    return null
  }

  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    const { data, error } = await supabaseServer
      .from('dcxy_free_trial_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取数据失败' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('dcxy_free_trial_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '更新失败' },
      { status: 500 }
    )
  }
}

