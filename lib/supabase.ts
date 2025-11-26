import { createClient } from '@supabase/supabase-js'

// Supabase 配置
const supabaseUrl = 'https://lumlfzmdrheesrzsuyfy.supabase.co'
// 优先使用环境变量，如果没有则使用默认的 anon key
const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bWxmem1kcmhlZXNyenN1eWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzc2MTksImV4cCI6MjA3OTcxMzYxOX0.QXWSqLZ43E3_GG49p5z4BX7ww2u2Pr_7vwxuHh6Hua8'

export const supabase = createClient(supabaseUrl, supabaseKey)

