# DNS 配置验证失败排查指南

## 快速检查清单

### 1. 验证 DNS 记录是否已生效

使用以下命令或工具检查 DNS 记录是否正确传播：

#### 命令行检查（推荐）

```bash
# 检查 SPF TXT 记录
dig TXT send.notifications.dcxy.jp +short

# 检查 MX 记录（用于反馈）
dig MX send.notifications.dcxy.jp +short

# 检查 DKIM 记录
dig TXT resend._domainkey.notifications.dcxy.jp +short

# 检查接收邮件的 MX 记录（如果启用）
dig MX notifications.dcxy.jp +short
```

#### 在线工具检查

1. [MXToolbox](https://mxtoolbox.com/)
   - 选择 "TXT Lookup" 或 "MX Lookup"
   - 输入：`send.notifications.dcxy.jp`

2. [DNS Checker](https://dnschecker.org/)
   - 选择记录类型（TXT 或 MX）
   - 输入域名检查全球 DNS 传播情况

3. [Google Admin Toolbox](https://toolbox.googleapps.com/apps/checkmx/check)

### 2. 常见问题排查

#### 问题 1：DNS 传播延迟

**症状**：记录已添加，但验证失败

**解决方案**：
- DNS 记录更新后，通常需要 **5-30 分钟** 才能在全球生效
- 某些情况下可能需要 **24-48 小时**
- 使用 DNS Checker 检查全球传播情况
- 等待后再次在 Resend 界面点击"验证"或"刷新"

#### 问题 2：记录名称不匹配

**症状**：记录存在，但 Resend 找不到

**检查项**：
- ✅ 确保记录名称与 Resend 要求**完全一致**（包括大小写）
- ✅ 检查是否有**多余的空格**
- ✅ 确认是 `send.notifications` 还是 `send` 或 `@`
- ✅ 在 Value-Domain 中，记录名称应该**不包括域名**（例如：输入 `send.notifications`，不是 `send.notifications.dcxy.jp`）

**常见错误**：
- ❌ 记录名称：`send.notifications.dcxy.jp`（错误，包含了完整域名）
- ✅ 记录名称：`send.notifications`（正确）

#### 问题 3：记录内容格式错误

**症状**：记录存在，但内容不正确

**检查项**：

**SPF TXT 记录**：
- ✅ 内容应该是：`v=spf1 include:amazonses.com ~all`
- ❌ 不要有多余的空格：`v=spf1  include:amazonses.com  ~all`
- ❌ 不要有引号：`"v=spf1 include:amazonses.com ~all"`
- ❌ 不要换行

**MX 记录**：
- ✅ 内容应该是：`feedback-smtp.ap-northeast-1.amazonses.com`
- ✅ 优先级应该是：`10`
- ❌ 不要包含优先级在内容中：`10 feedback-smtp.ap-northeast-1.amazonses.com`（优先级应该单独设置）

#### 问题 4：记录类型错误

**检查项**：
- ✅ SPF 必须是 **TXT** 类型，不是 MX 类型
- ✅ MX 记录必须是 **MX** 类型
- ✅ DKIM 必须是 **TXT** 类型

#### 问题 5：TTL 设置

**建议**：
- 可以设置为 `3600`（1 小时）或 `Auto`
- 如果设置为很长的 TTL（如 86400），DNS 更新会较慢

### 3. 详细验证步骤

#### 步骤 1：使用 dig 命令验证

```bash
# 检查 SPF 记录
dig TXT send.notifications.dcxy.jp

# 期望输出应该包含：
# "v=spf1 include:amazonses.com ~all"

# 检查 MX 记录
dig MX send.notifications.dcxy.jp

# 期望输出应该包含：
# feedback-smtp.ap-northeast-1.amazonses.com. 10
```

#### 步骤 2：检查 Value-Domain 中的配置

在 Value-Domain 的 DNS 设置中，确认：

1. **SPF TXT 记录**：
   - 类型：`TXT`
   - 名称：`send.notifications`（注意：不包括 `.dcxy.jp`）
   - 内容：`v=spf1 include:amazonses.com ~all`（注意：不要有引号，不要有多余空格）

2. **MX 记录（反馈）**：
   - 类型：`MX`
   - 名称：`send.notifications`
   - 内容：`feedback-smtp.ap-northeast-1.amazonses.com`
   - 优先级：`10`

3. **DKIM TXT 记录**：
   - 类型：`TXT`
   - 名称：`resend._domainkey.notifications`
   - 内容：（你的完整 DKIM 密钥）

#### 步骤 3：检查 Resend 界面要求

在 Resend 管理界面中：
1. 查看每个记录要求的确切名称和内容
2. 与 Value-Domain 中的配置逐字对比
3. 特别注意：
   - 大小写是否一致
   - 是否有空格差异
   - 内容是否完全匹配

### 4. 常见错误示例

#### 错误 1：记录名称包含完整域名
```
❌ 错误：名称 = send.notifications.dcxy.jp
✅ 正确：名称 = send.notifications
```

#### 错误 2：SPF 内容有多余空格
```
❌ 错误：v=spf1  include:amazonses.com  ~all
✅ 正确：v=spf1 include:amazonses.com ~all
```

#### 错误 3：SPF 内容有引号
```
❌ 错误："v=spf1 include:amazonses.com ~all"
✅ 正确：v=spf1 include:amazonses.com ~all
```

#### 错误 4：MX 记录优先级设置错误
```
❌ 错误：内容 = 10 feedback-smtp.ap-northeast-1.amazonses.com
✅ 正确：内容 = feedback-smtp.ap-northeast-1.amazonses.com，优先级 = 10
```

### 5. 如果仍然失败

#### 检查 1：清除 DNS 缓存

```bash
# macOS/Linux
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns
```

#### 检查 2：使用不同的 DNS 服务器查询

```bash
# 使用 Google DNS 查询
dig @8.8.8.8 TXT send.notifications.dcxy.jp

# 使用 Cloudflare DNS 查询
dig @1.1.1.1 TXT send.notifications.dcxy.jp
```

#### 检查 3：联系 Resend 支持

如果所有配置都正确，但验证仍然失败：
1. 截图 Value-Domain 中的 DNS 配置
2. 截图 dig 命令的输出结果
3. 联系 Resend 技术支持，提供这些信息

### 6. 验证清单

在联系支持前，请确认：

- [ ] DNS 记录已添加超过 30 分钟
- [ ] 使用 dig 命令可以查询到记录
- [ ] 记录名称与 Resend 要求完全一致（无空格、大小写正确）
- [ ] 记录内容格式正确（无多余空格、无引号）
- [ ] 记录类型正确（TXT 是 TXT，MX 是 MX）
- [ ] 优先级设置正确（MX 记录优先级为 10）
- [ ] 已清除本地 DNS 缓存
- [ ] 使用多个 DNS 服务器查询都能看到记录

