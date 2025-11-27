import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 创建用于认证的客户端（使用 anon key，因为 signInWithPassword 需要 anon key）
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lumlfzmdrheesrzsuyfy.supabase.co'
// 注意：signInWithPassword 需要使用 anon key，不能使用 service_role key
// 支持从服务端环境变量读取（不需要 NEXT_PUBLIC_ 前缀）
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bWxmem1kcmhlZXNyenN1eWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzc2MTksImV4cCI6MjA3OTcxMzYxOX0.QXWSqLZ43E3_GG49p5z4BX7ww2u2Pr_7vwxuHh6Hua8'

const supabaseAuth = createClient(supabaseUrl, anonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码不能为空' },
        { status: 400 }
      )
    }

    // 使用 Supabase 客户端进行认证
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    // 返回用户信息和 session token
    return NextResponse.json({
      user: data.user,
      session: data.session,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '登录失败' },
      { status: 500 }
    )
  }
}

