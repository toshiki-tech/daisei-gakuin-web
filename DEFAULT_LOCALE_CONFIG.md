# 默认语言配置说明

## 当前配置

✅ **默认语言已设置为日语（ja）**

### 配置文件

1. **`i18n/config.ts`**：
   ```typescript
   export const defaultLocale: Locale = 'ja'
   ```

2. **`middleware.ts`**：
   ```typescript
   export default createMiddleware({
     locales,
     defaultLocale,  // 'ja'
     localePrefix: 'always'  // 所有路径都需要语言前缀
   })
   ```

3. **`app/page.tsx`**：
   ```typescript
   export default function RootPage() {
     redirect(`/${defaultLocale}`)  // 重定向到 /ja
   }
   ```

## 工作原理

当用户访问 `https://www.dcxy.jp` 时：

1. **Middleware 处理**：`next-intl` 的 middleware 会检测到根路径没有语言前缀，自动重定向到 `/${defaultLocale}`，即 `/ja`
2. **备用重定向**：如果 middleware 没有处理（理论上不应该发生），`app/page.tsx` 中的 `redirect()` 也会将用户重定向到 `/ja`

## 验证

访问以下 URL 应该都显示日语版本：

- ✅ `https://www.dcxy.jp` → 自动重定向到 `https://www.dcxy.jp/ja`
- ✅ `https://www.dcxy.jp/ja` → 直接显示日语版本
- ✅ `https://www.dcxy.jp/zh` → 显示中文版本

## 如果重定向不工作

如果访问 `https://www.dcxy.jp` 时没有自动跳转到 `/ja`，可能的原因：

1. **缓存问题**：
   - 清除浏览器缓存
   - 使用无痕模式访问
   - 清除 CDN 缓存（如果使用了 CDN）

2. **需要重新部署**：
   - 在 Vercel 中触发新的部署
   - 确保最新的代码已部署

3. **Vercel 配置**：
   - 检查 Vercel 项目设置中是否有重定向规则冲突
   - 确保没有自定义的重写规则覆盖了默认行为

## 测试

在本地测试：

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
# 应该自动重定向到 http://localhost:3000/ja
```

## 总结

✅ 配置已正确设置为日语（ja）作为默认语言
✅ 访问根路径会自动重定向到 `/ja`
✅ 所有相关文件都已正确配置

如果仍然有问题，请检查：
1. Vercel 部署日志
2. 浏览器开发者工具的网络标签页，查看重定向是否发生
3. 是否有其他中间件或配置影响了重定向

