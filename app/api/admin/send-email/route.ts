import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

// 验证用户是否已登录
async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')
  
  // 使用 service_role key 的客户端验证 token
  const { data: { user }, error } = await supabaseServer.auth.getUser(token)
  
  if (error || !user) {
    return null
  }

  return user
}

export async function POST(request: NextRequest) {
  try {
    // 验证认证
    const user = await verifyAuth(request)
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: '未授权' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      )
    }

    const body = await request.json()
    const { to, subject, message } = body

    // 验证必填字段
    if (!to || !subject || !message) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields: to, subject, message' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      )
    }

    // 获取 Resend API Key
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set')
      return new NextResponse(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      )
    }

    // 发件人地址（必须使用已验证的域名）
    // 优先使用环境变量，否则使用已验证的 notifications.dcxy.jp 域名
    // 注意：发件人地址必须与 Resend 中验证的域名匹配
    const fromAddress = process.env.RESEND_FROM_EMAIL || 
      'noreply@notifications.dcxy.jp'

    console.log('Sending email:', {
      from: fromAddress,
      to: to,
      subject: subject,
    })

    // 发送邮件
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [to],
        subject: subject,
        html: message.replace(/\n/g, '<br>'),
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend API error:', {
        status: resendResponse.status,
        statusText: resendResponse.statusText,
        error: errorText,
      })

      return new NextResponse(
        JSON.stringify({ 
          error: 'Failed to send email',
          detail: errorText,
          status: resendResponse.status,
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      )
    }

    const resendData = await resendResponse.json()
    console.log('Email sent successfully:', resendData)

    return new NextResponse(
      JSON.stringify({ success: true, data: resendData }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    )
  }
}

