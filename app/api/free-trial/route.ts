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
  const { name, email, phone, privacy_agreed } = body

  if (!name || !email || !phone || !privacy_agreed) {
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
    preferred_time_1: body.preferred_time_1 || null,
    preferred_time_2: body.preferred_time_2 || null,
    interested_courses: body.interested_courses && Array.isArray(body.interested_courses) && body.interested_courses.length > 0 
      ? body.interested_courses 
      : null,
    chinese_experience: body.chinese_experience ?? null,
    learning_period: body.learning_period || null,
    visited_china: body.visited_china ?? null,
    china_visit_count: body.china_visit_count || null,
    learning_purpose: body.learning_purpose || null,
    privacy_agreed: privacy_agreed,
    status: 'pending',
    locale: body.locale || null,
  }

  // 插入数据到 Supabase
  const { data, error } = await supabaseServer
    .from('dcxy_free_trial_applications')
    .insert([insertData])
    .select()

  if (error) {
    console.error('Supabase insert error:', error)
    console.error('Insert data:', JSON.stringify(insertData, null, 2))
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to submit application', 
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

  // 构建邮件消息内容（包含免费试听申请的详细信息）
  const messageContent = `
お名前: ${insertData.name}
メールアドレス: ${insertData.email}
電話番号: ${insertData.phone}
希望時間1: ${insertData.preferred_time_1 || '未指定'}
希望時間2: ${insertData.preferred_time_2 || '未指定'}
興味のあるコース: ${insertData.interested_courses ? insertData.interested_courses.join(', ') : '未指定'}
中国語経験: ${insertData.chinese_experience ? 'あり' : 'なし'}
学習期間: ${insertData.learning_period || '未指定'}
中国訪問経験: ${insertData.visited_china ? 'あり' : 'なし'}
訪問回数: ${insertData.china_visit_count || '未指定'}
学習目的: ${insertData.learning_purpose || '未指定'}
`.trim()

  // 调用 form-notify Edge Function 发送邮件通知（异步，不阻塞响应）
  // 即使邮件发送失败，也不影响数据插入的成功响应
  supabaseServer.functions.invoke('form-notify', {
    body: {
      name: insertData.name,
      email: insertData.email,
      message: messageContent,
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

