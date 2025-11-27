import { createClient } from '@supabase/supabase-js'

// Supabase 服务端配置（用于 API routes）
// 支持 SUPABASE_URL 或 NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lumlfzmdrheesrzsuyfy.supabase.co'

// 优先使用环境变量中的 service_role key
// 如果没有配置，则使用 anon key（需要确保 RLS 策略允许插入）
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

// 如果没有 service_role key，使用 anon key
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bWxmem1kcmhlZXNyenN1eWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzc2MTksImV4cCI6MjA3OTcxMzYxOX0.QXWSqLZ43E3_GG49p5z4BX7ww2u2Pr_7vwxuHh6Hua8'

// 使用 service_role key（如果配置了）或 anon key
const keyToUse = supabaseServiceKey || anonKey

if (!supabaseServiceKey) {
  console.warn('Using anon key for Supabase. Please configure SUPABASE_SERVICE_ROLE_KEY for production.')
}

export const supabaseServer = createClient(supabaseUrl, keyToUse, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

