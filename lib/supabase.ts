import { createClient } from '@supabase/supabase-js'

// Supabase 配置（客户端）
// URL 建议通过环境变量配置；这里保留你的项目 URL 作为默认值，便于本地开发
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lumlfzmdrheesrzsuyfy.supabase.co'
// 使用 anon public key（前端可见）
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseKey) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Supabase client will not work correctly.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

