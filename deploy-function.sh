#!/bin/bash

# Supabase Edge Function 部署脚本
# 使用方法：
# 1. 获取 Access Token: https://supabase.com/dashboard/account/tokens
# 2. 运行: SUPABASE_ACCESS_TOKEN="你的token" ./deploy-function.sh

set -e

echo "🚀 开始部署 Supabase Edge Function: form-notify"

# 检查 access token
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "❌ 错误: 需要设置 SUPABASE_ACCESS_TOKEN 环境变量"
  echo ""
  echo "请按以下步骤操作："
  echo "1. 访问 https://supabase.com/dashboard/account/tokens"
  echo "2. 生成新的 access token"
  echo "3. 运行: export SUPABASE_ACCESS_TOKEN='你的token'"
  echo "4. 然后再次运行此脚本"
  exit 1
fi

# 项目 ID
PROJECT_REF="lumlfzmdrheesrzsuyfy"

echo "📦 项目 ID: $PROJECT_REF"
echo "🔧 部署函数: form-notify"

# 部署函数
supabase functions deploy form-notify --project-ref "$PROJECT_REF"

echo ""
echo "✅ 部署完成！"
echo ""
echo "📧 邮件配置："
echo "   - 主收件人: iken_kai@yahoo.co.jp"
echo "   - 密送 (BCC): dogiant@gmail.com"

