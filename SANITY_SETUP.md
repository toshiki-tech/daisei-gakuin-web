# Sanity CMS 配置说明

## 环境变量配置

请在项目根目录创建 `.env.local` 文件，并添加以下配置：

```bash
# Sanity Configuration
# 请从 Sanity 管理后台获取 Project ID: https://www.sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production

# Optional: API Token for server-side operations
# 如果需要服务端读取，可以在 Sanity 管理后台创建 API token
# SANITY_API_READ_TOKEN=your-read-token-here
```

## 获取 Project ID

1. 登录 [Sanity 管理后台](https://www.sanity.io/manage)
2. 选择项目 `daisei-gakuin`
3. 在项目设置中可以找到 Project ID
4. 将 Project ID 复制到 `.env.local` 文件中的 `NEXT_PUBLIC_SANITY_PROJECT_ID`

## 访问 Studio

配置完成后，可以通过以下地址访问 Sanity Studio：

- 开发环境: `http://localhost:3000/studio`
- 生产环境: `https://your-domain.com/studio`

## 数据迁移

当前系统已配置为：
1. 优先从 Sanity 获取新闻数据
2. 如果 Sanity 查询失败或返回空数据，自动回退到硬编码数据

### 导入现有数据

可以通过以下方式将现有新闻数据导入到 Sanity：

1. 访问 Studio (`/studio`)
2. 手动创建新闻条目
3. 或使用 Sanity CLI 导入脚本（需要时创建）

现有硬编码数据位于 `lib/content/news.ts` 中的 `fallbackNewsPosts`。




