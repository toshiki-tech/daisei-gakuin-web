# Supabase Edge Function 部署说明

## 快速部署

### 方法 1：使用部署脚本（推荐）

1. **获取 Access Token**：
   - 访问：https://supabase.com/dashboard/account/tokens
   - 点击 "Generate new token"
   - 复制生成的 token

2. **设置环境变量并部署**：
   ```bash
   export SUPABASE_ACCESS_TOKEN="你的token"
   ./deploy-function.sh
   ```

### 方法 2：使用 Supabase CLI 命令

1. **登录 Supabase**：
   ```bash
   supabase login
   ```
   这会打开浏览器让你登录。

2. **链接项目**（如果需要）：
   ```bash
   supabase link --project-ref lumlfzmdrheesrzsuyfy
   ```

3. **部署函数**：
   ```bash
   supabase functions deploy form-notify
   ```

### 方法 3：在 Supabase Dashboard 中手动更新

1. 登录 Supabase Dashboard
2. 进入项目：https://supabase.com/dashboard/project/lumlfzmdrheesrzsuyfy
3. 左侧菜单 → **Edge Functions**
4. 找到 `form-notify` 函数
5. 点击 **Edit** 或 **Update**
6. 将 `supabase/functions/form-notify/index.ts` 的内容复制粘贴
7. 点击 **Deploy**

## 验证部署

部署成功后，当用户提交表单时：
- ✅ 主收件人 `iken_kai@yahoo.co.jp` 会收到邮件
- ✅ 密送 `dogiant@gmail.com` 也会收到邮件（但其他收件人看不到）

## 当前配置

- **主收件人**: `iken_kai@yahoo.co.jp`
- **密送 (BCC)**: `dogiant@gmail.com`
- **发件人**: `大成学院フォーム通知 <noreply@notifications.dcxy.jp>`

