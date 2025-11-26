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

  return new NextResponse(
    JSON.stringify({ success: true, data }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' } 
    }
  )
}

