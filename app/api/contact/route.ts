import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  let body
  try {
    body = await request.json()
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid JSON', details: String(e) }),
      { 
        status: 400, 
        headers: { 'Content-Type': 'application/json; charset=utf-8' } 
      }
    )
  }

  // 验证必填字段
  const { name, email, phone, message, privacy_agreed } = body

  if (!name || !email || !phone || !message || !privacy_agreed) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing required fields' }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    )
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid email format' }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    )
  }

  // 准备插入数据
  const insertData = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    privacy_agreed: privacy_agreed,
    status: 'pending',
    locale: body.locale || null,
  }

  // 插入数据到 Supabase
  const { data, error } = await supabaseServer
    .from('dcxy_contact_inquiries')
    .insert([insertData])
    .select()

  if (error) {
    console.error('Supabase insert error:', error)
    console.error('Insert data:', JSON.stringify(insertData, null, 2))
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to submit inquiry', 
        details: error.message,
        code: error.code,
        hint: error.hint
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' } 
      }
    )
  }

  // 调用 form-notify Edge Function 发送邮件通知（异步，不阻塞响应）
  // 即使邮件发送失败，也不影响数据插入的成功响应
  supabaseServer.functions.invoke('form-notify', {
    body: {
      name: insertData.name,
      email: insertData.email,
      message: insertData.message,
    },
  }).then(({ data: notifyData, error: notifyError }) => {
    if (notifyError) {
      console.error('Failed to send notification email:', notifyError)
    } else {
      console.log('Notification email sent successfully:', notifyData)
    }
  }).catch((err) => {
    console.error('Error invoking form-notify function:', err)
  })

  return new NextResponse(
    JSON.stringify({ success: true, data }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' } 
    }
  )
}

