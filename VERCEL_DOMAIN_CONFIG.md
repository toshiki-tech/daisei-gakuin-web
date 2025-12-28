# Vercel 域名配置说明

## 问题

在 Vercel 预览部署中，metadata（OG 标签、canonical 链接等）使用了预览域名（如 `daisei-gakuin-g6thg2b0e-sky-future.vercel.app`），而不是自定义域名（`dcxy.jp`）。

## 解决方案

### 方案 1：设置环境变量（推荐）

在 Vercel 项目设置中设置环境变量：

1. 登录 Vercel Dashboard
2. 进入你的项目设置
3. 进入 **Settings** → **Environment Variables**
4. 添加以下环境变量：
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://dcxy.jp`
   - **Environment**: 选择所有环境（Production, Preview, Development）

这样，无论是什么环境，都会使用正确的域名。

### 方案 2：代码已修复（已实现）

代码已经修改，现在会：
- 在 Vercel 预览部署中，自动使用生产域名 `dcxy.jp`（而不是预览域名）
- 在生产部署中，使用自定义域名
- 优先使用 `NEXT_PUBLIC_SITE_URL` 环境变量（如果设置了）

## 验证

部署后，检查页面源代码中的 metadata：

```html
<!-- 应该显示 -->
<link rel="canonical" href="https://dcxy.jp/zh"/>
<meta property="og:url" content="https://dcxy.jp/zh"/>
<meta property="og:image" content="https://dcxy.jp/images/og/og.png"/>

<!-- 不应该显示 -->
<link rel="canonical" href="https://daisei-gakuin-g6thg2b0e-sky-future.vercel.app/zh"/>
```

## 代码修改说明

修改了 `lib/seo.ts` 中的 `getSiteUrl()` 函数：

- ✅ 优先使用 `NEXT_PUBLIC_SITE_URL` 环境变量
- ✅ 在 Vercel 预览部署中，使用生产域名而不是预览域名
- ✅ 在生产部署中，使用自定义域名
- ✅ 本地开发使用 localhost

## 最佳实践

建议在 Vercel 中设置 `NEXT_PUBLIC_SITE_URL` 环境变量，这样可以：
1. 确保所有环境都使用正确的域名
2. 方便以后更换域名（只需修改环境变量）
3. 避免代码中的硬编码

