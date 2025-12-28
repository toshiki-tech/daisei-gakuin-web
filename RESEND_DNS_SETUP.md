# Resend DNS 配置指南

## 问题诊断

根据你的截图，发现了以下配置问题：

### 1. SPF 记录配置说明

**重要**：根据 Resend 界面的要求，`send.notifications` 需要配置**两个记录**，它们是一组的：

1. **MX 记录**（用于接收退信和反馈）：
   - **类型**：MX
   - **名称**：`send.notifications`
   - **内容**：`feedback-smtp.ap-northeast-1.amazonses.com`
   - **优先级**：10
   - **作用**：用于接收邮件退信（bounce）和投诉（complaint）反馈

2. **SPF TXT 记录**（用于授权发送邮件）：
   - **类型**：TXT
   - **名称**：`send.notifications`
   - **内容**：`v=spf1 include:amazonses.com ~all`
   - **作用**：授权 Amazon SES 代表你的域名发送邮件

**这两个记录都需要配置**，它们分别负责不同的功能。

### 2. 正确的 DNS 配置

根据 Resend 的要求，你需要配置以下记录：

#### 发送邮件（Enable Sending）

**需要配置两个记录（它们是一组的）**：

1. **MX 记录**（用于接收反馈）：
   - **类型**：MX
   - **名称**：`send.notifications`
   - **内容**：`feedback-smtp.ap-northeast-1.amazonses.com`
   - **优先级**：10
   - **TTL**：3600（或 Auto）
   - **作用**：接收邮件退信和投诉反馈

2. **SPF 记录（TXT 类型）**（用于授权发送）：
   - **类型**：TXT
   - **名称**：`send.notifications`
   - **内容**：`v=spf1 include:amazonses.com ~all`
   - **TTL**：3600（或 Auto）
   - **作用**：授权 Amazon SES 代表你的域名发送邮件

**重要说明**：
- ✅ **这两个记录都需要配置**，它们分别负责不同的功能
- SPF TXT 记录配置是正确的，不需要添加自己的域名（如 `dcxy.jp`）
- `include:amazonses.com` 已经授权 Amazon SES（Resend 使用的服务）代表你的域名发送邮件
- `~all` 表示软失败（soft fail），其他未匹配的服务器会被标记但不会拒绝

**DKIM 记录（TXT 类型）**：
- **类型**：TXT
- **名称**：`resend._domainkey.notifications`（或根据 Resend 要求）
- **内容**：`p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBIQKBgQDCTOKHp6h8BJx9ES4/07qtbqJVhHmkAwZ5WRZItUI4n9vQymayXcovgAQKcQ8Q/1olLlhdGzNGhdqnu/1LrE5t3ZzhQE/qek/FwABADA4hQh5nqvvpGMx3iLP3GlLqoMhGAzBY8p46fXC7FiZ78yt5KyWLENNMMbP9p0Dv3+e+wIDAQAB`
- **TTL**：3600（或 Auto）
- ✅ **状态**：已验证

#### 接收邮件（Enable Receiving）

**MX 记录**：
- **类型**：MX
- **名称**：`notifications`（不是 `send.notifications`）
- **内容**：`inbound-smtp.ap-northeast-1.amazonaws.com`
- **优先级**：10
- **TTL**：3600（或 Auto）

### 3. 需要检查的事项

1. **记录名称是否正确**：
   - 在 Resend 管理界面中，查看它要求的确切记录名称
   - 可能是 `send.notifications`、`send`、`@` 或 `notifications`
   - 确保 Value-Domain 中的名称与 Resend 要求完全一致

2. **DNS 传播时间**：
   - DNS 记录更新后，可能需要几分钟到 48 小时才能在全球生效
   - 可以使用以下工具检查：
     - [MXToolbox](https://mxtoolbox.com/)
     - [DNS Checker](https://dnschecker.org/)
     - 命令行：`dig TXT send.notifications.dcxy.jp`

3. **确保两个记录都配置**：
   - `send.notifications` 的 MX 记录（用于接收反馈）
   - `send.notifications` 的 TXT 记录（SPF，用于授权发送）
   - `notifications` 的 MX 记录（用于接收邮件，如果启用接收功能）

## 修复步骤

### 步骤 1：配置 send.notifications 的两个记录

在 Value-Domain 的 DNS 设置中，确保 `send.notifications` 有两个记录：

1. **MX 记录**：
   - **类型**：MX
   - **名称**：`send.notifications`
   - **内容**：`feedback-smtp.ap-northeast-1.amazonses.com`
   - **优先级**：10

2. **TXT 记录（SPF）**：
   - **类型**：TXT
   - **名称**：`send.notifications`
   - **内容**：`v=spf1 include:amazonses.com ~all`

### 步骤 2：验证 MX 记录（用于接收邮件，如果启用接收功能）

确保存在以下 MX 记录：
- **名称**：`notifications`（注意：不是 `send.notifications`）
- **类型**：MX
- **内容**：`inbound-smtp.ap-northeast-1.amazonaws.com`
- **优先级**：10

### 步骤 4：等待 DNS 传播

1. 等待 5-30 分钟
2. 使用 DNS 检查工具验证记录是否已生效
3. 在 Resend 管理界面中点击"验证"或"刷新"

### 步骤 5：检查 Resend 要求的确切名称

在 Resend 管理界面中：
1. 查看每个记录要求的确切名称
2. 确保 Value-Domain 中的记录名称与 Resend 要求完全匹配（包括大小写）

## 常见问题

### Q: send.notifications 的 MX 记录和 TXT 记录都需要配置吗？

A: **是的，都需要配置**。它们是一组的，但作用不同：
- **MX 记录**：用于接收邮件退信和投诉反馈（`feedback-smtp.ap-northeast-1.amazonses.com`）
- **TXT 记录（SPF）**：用于授权 Amazon SES 发送邮件（`v=spf1 include:amazonses.com ~all`）

### Q: 为什么 SPF 记录显示失败？

A: 可能的原因：
1. MX 记录或 TXT 记录的名称不正确（都应该是 `send.notifications`）
2. DNS 还未传播完成
3. 记录内容格式错误（注意不要有多余的空格）
4. 两个记录中有一个未配置或配置错误

### Q: 为什么 MX 记录显示失败？

A: 可能的原因：
1. 记录名称应该是 `notifications`，不是 `send.notifications`
2. 优先级设置错误（应该是 10）
3. DNS 还未传播完成

### Q: SPF 记录是否需要添加自己的域名？

A: **不需要**。`v=spf1 include:amazonses.com ~all` 这个配置是正确的：
- SPF 记录本身就是针对你的域名的（`send.notifications.dcxy.jp`）
- `include:amazonses.com` 已经授权 Amazon SES 代表你的域名发送邮件
- 不需要添加 `dcxy.jp` 或其他域名到 SPF 记录中
- 如果你有其他邮件服务器，可以添加 `ip4:` 或 `ip6:` 机制，但对于 Resend，只需要 `include:amazonses.com`

### Q: 如何验证 DNS 记录是否正确？

A: 使用命令行工具：
```bash
# 检查 SPF 记录
dig TXT send.notifications.dcxy.jp

# 检查 MX 记录
dig MX notifications.dcxy.jp

# 检查 DKIM 记录
dig TXT resend._domainkey.notifications.dcxy.jp
```

## 参考

- [Resend 官方文档](https://resend.com/docs)
- [SPF 记录说明](https://en.wikipedia.org/wiki/Sender_Policy_Framework)
- [MX 记录说明](https://en.wikipedia.org/wiki/MX_record)

