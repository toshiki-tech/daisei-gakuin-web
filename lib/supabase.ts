import { createClient } from '@supabase/supabase-js'

// Supabase 配置（客户端）
// 注意：客户端只能访问 NEXT_PUBLIC_ 前缀的环境变量
// 支持 NEXT_PUBLIC_SUPABASE_URL 或使用默认值
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lumlfzmdrheesrzsuyfy.supabase.co'

// 使用 anon public key（前端可见）
// 如果没有配置环境变量，使用默认的 anon key（仅用于开发）
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bWxmem1kcmhlZXNyenN1eWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzc2MTksImV4cCI6MjA3OTcxMzYxOX0.QXWSqLZ43E3_GG49p5z4BX7ww2u2Pr_7vwxuHh6Hua8'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultAnonKey

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Using default key for development.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

