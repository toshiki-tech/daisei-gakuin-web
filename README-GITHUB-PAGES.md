# GitHub Pages 部署说明

## 概述

本项目同时支持 **Vercel** 和 **GitHub Pages** 两种部署方式：

- **Vercel**（本番环境）: https://dcxy.jp - 自动部署，支持动态功能
- **GitHub Pages**（备用）: https://toshiki-tech.github.io/daisei-gakuin-web/ - 静态导出

## 重要说明

### Vercel vs GitHub Pages 的区别

| 特性 | Vercel | GitHub Pages |
|------|--------|--------------|
| 部署方式 | 动态渲染（SSR/ISR） | 静态导出（Static Export） |
| 环境变量 | 自动管理 | 需要在 GitHub Secrets 中设置 |
| 构建配置 | 自动检测 | 需要 `output: 'export'` |
| 功能支持 | 完整 Next.js 功能 | 仅静态功能 |
| 推荐用途 | **本番环境** | 备用/演示 |

### 为什么 GitHub Pages 构建可能失败？

1. **缺少环境变量** - 需要在 GitHub Secrets 中设置
2. **静态导出限制** - 某些动态功能不支持
3. **构建配置** - 需要正确设置 `NODE_ENV=production`

**解决方案**: 如果 GitHub Pages 构建失败，不影响 Vercel 部署。Vercel 是本番环境，GitHub Pages 只是备用。

## 设置步骤

### 1. 在 GitHub 仓库中启用 GitHub Pages

1. 进入仓库设置：`Settings` → `Pages`
2. 在 `Source` 部分选择：`GitHub Actions`
3. 保存设置

### 2. 配置 GitHub Secrets（可选但推荐）

如果使用 Sanity CMS，需要在 GitHub Secrets 中设置环境变量：

1. 进入仓库设置：`Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret`
3. 添加以下 Secrets：
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: 你的 Sanity Project ID
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`（默认）

**注意**: 如果不设置这些 Secrets，构建时会使用 fallback 数据，网站仍然可以正常工作。

### 3. 推送代码

代码已经配置好了 GitHub Actions workflow，推送代码到 `main` 分支后会自动构建和部署。

```bash
git add .
git commit -m "更新代码"
git push origin main
```

### 4. 查看部署状态

- 在 GitHub 仓库中，点击 `Actions` 标签页
- 查看 workflow 运行状态
- 部署完成后，在 `Settings` → `Pages` 中可以看到网站地址

## 网站地址

部署完成后，网站地址为：
- **本番环境**: `https://dcxy.jp` (Vercel)
- **备用地址**: `https://toshiki-tech.github.io/daisei-gakuin-web/` (GitHub Pages)

## 故障排除

### 构建失败的原因

1. **缺少环境变量**
   - 解决：在 GitHub Secrets 中设置 `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - 或者：检查 `.github/workflows/deploy.yml` 中的环境变量配置

2. **依赖安装失败**
   - 解决：确保 workflow 中使用 `npm ci --legacy-peer-deps`

3. **静态导出错误**
   - 解决：确保 `NODE_ENV=production` 已设置
   - 检查 `next.config.js` 中的 `output: 'export'` 配置

### 如果构建失败怎么办？

1. **检查 Actions 日志** - 查看具体的错误信息
2. **不影响 Vercel** - Vercel 部署是独立的，不会受影响
3. **使用 fallback 数据** - 即使 Sanity 连接失败，网站仍可使用硬编码数据

## 本地测试静态导出

在部署前，可以在本地测试静态导出：

```bash
# 设置环境变量
export NODE_ENV=production
export NEXT_PUBLIC_BASE_PATH=/daisei-gakuin-web

# 构建
npm run build
```

构建完成后，会在 `out` 目录生成静态文件。可以使用任何静态文件服务器测试：

```bash
# 使用 Python
cd out
python -m http.server 8000

# 或使用 Node.js serve
npx serve out
```

## 注意事项

1. **首次部署**: 第一次部署可能需要几分钟时间
2. **自动部署**: 每次推送到 `main` 分支都会自动触发部署
3. **构建时间**: 构建过程大约需要 2-5 分钟
4. **环境变量**: GitHub Pages 需要手动设置 Secrets，Vercel 会自动管理
5. **功能限制**: GitHub Pages 只支持静态功能，不支持服务端功能

## 推荐配置

- **主要使用 Vercel** - 功能完整，自动部署
- **GitHub Pages 作为备用** - 用于演示或备份

