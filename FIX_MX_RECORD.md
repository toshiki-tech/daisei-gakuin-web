# 修复 MX 记录配置

## 问题

当前 MX 记录内容错误：
```
❌ feedback-smtp.ap-northeast-1.amazonses.com.dcxy.jp.
```

正确的内容应该是：
```
✅ feedback-smtp.ap-northeast-1.amazonses.com
```

## 修复步骤

### 在 Value-Domain 中修改

1. 登录 Value-Domain 管理界面
2. 进入「DNS設定」
3. 找到 `send.notifications` 的 MX 记录
4. 点击编辑
5. 将「コンテンツ」（内容）字段修改为：
   ```
   feedback-smtp.ap-northeast-1.amazonses.com
   ```
   **重要**：确保：
   - 末尾没有 `.dcxy.jp`
   - 末尾没有点号 `.`
   - 没有多余的空格
6. 优先级保持为 `10`
7. 保存

### 验证修复

等待 5-10 分钟后，运行以下命令验证：

```bash
dig MX send.notifications.dcxy.jp +short
```

期望输出应该是：
```
10 feedback-smtp.ap-northeast-1.amazonses.com.
```

（注意：末尾的点号 `.` 是 DNS 查询结果的正常格式，不是问题）

### 如果 Value-Domain 自动添加域名后缀

如果 Value-Domain 在保存时自动添加了 `.dcxy.jp` 后缀，尝试：

1. **方法 1**：在内容末尾添加一个点号 `.`：
   ```
   feedback-smtp.ap-northeast-1.amazonses.com.
   ```
   这样 Value-Domain 就不会再添加域名后缀

2. **方法 2**：联系 Value-Domain 技术支持，询问如何配置绝对域名（FQDN）

## 修复后检查清单

- [ ] MX 记录内容已修改为 `feedback-smtp.ap-northeast-1.amazonses.com`
- [ ] 优先级设置为 `10`
- [ ] 等待 5-10 分钟
- [ ] 使用 `dig MX send.notifications.dcxy.jp` 验证
- [ ] 在 Resend 界面重新验证

