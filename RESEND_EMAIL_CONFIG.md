# Resend 邮件发送配置说明

## 问题诊断

如果遇到错误：`The yahoo.co.jp domain is not verified`

这个错误信息可能有误导性。实际上，Resend 的要求是：
- ✅ **发件人（from）** 必须使用已验证的域名
- ✅ **收件人（to）** 可以是任何邮箱地址（如 yahoo.co.jp），不需要验证

## 解决方案

### 1. 检查域名验证状态

在 Resend Dashboard 中：
1. 访问：https://resend.com/domains
2. 确认 `notifications.dcxy.jp` 域名已完全验证（所有 DNS 记录显示 ✅）

### 2. 配置发件人地址

在 Vercel 环境变量中设置 `RESEND_FROM_EMAIL`：

**选项 1：使用已验证的域名（推荐）**
```
RESEND_FROM_EMAIL=noreply@notifications.dcxy.jp
```

**选项 2：使用带显示名称的格式**
```
RESEND_FROM_EMAIL=大成学院 <noreply@notifications.dcxy.jp>
```

**选项 3：使用其他已验证的邮箱地址**
如果你在 Resend 中验证了其他邮箱地址，也可以使用：
```
RESEND_FROM_EMAIL=info@notifications.dcxy.jp
```

### 3. 在 Resend Dashboard 中添加发件人地址

1. 访问：https://resend.com/domains
2. 点击你的域名 `notifications.dcxy.jp`
3. 在 "From Addresses" 部分，添加你想要的发件人地址：
   - `noreply@notifications.dcxy.jp`
   - 或 `info@notifications.dcxy.jp`
   - 或其他你需要的地址

### 4. 验证配置

确保：
- ✅ 域名 `notifications.dcxy.jp` 在 Resend 中已完全验证
- ✅ 发件人地址使用的是已验证域名下的邮箱
- ✅ `RESEND_API_KEY` 环境变量已正确设置
- ✅ 发件人地址格式正确（邮箱@域名 或 名称 <邮箱@域名>）

## 常见问题

### Q: 为什么错误信息说 yahoo.co.jp 未验证？

A: 这是 Resend 的错误信息可能有误导性。实际上：
- 收件人地址（如 `iken_kai@yahoo.co.jp`）**不需要验证**
- 问题通常出在**发件人地址**没有使用已验证的域名

### Q: 可以使用其他发件人地址吗？

A: 可以，但必须满足：
1. 发件人地址的域名必须在 Resend 中已验证
2. 发件人地址必须在 Resend Dashboard 中添加

例如：
- ✅ `noreply@notifications.dcxy.jp`（已验证域名）
- ✅ `info@notifications.dcxy.jp`（已验证域名）
- ❌ `noreply@dcxy.jp`（如果 dcxy.jp 未验证）
- ❌ `noreply@example.com`（未验证的域名）

### Q: 如何检查域名验证状态？

A: 在 Resend Dashboard：
1. 访问：https://resend.com/domains
2. 查看域名状态
3. 确保所有 DNS 记录（DKIM、SPF、MX）都显示 ✅

## 推荐配置

在 Vercel 环境变量中设置：

```
RESEND_API_KEY=你的resend_api_key
RESEND_FROM_EMAIL=noreply@notifications.dcxy.jp
```

这样配置后，可以发送邮件到任何邮箱地址（包括 yahoo.co.jp、gmail.com 等）。

