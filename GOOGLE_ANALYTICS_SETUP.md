# Google Analytics 配置说明

## 环境变量配置

### 本地开发环境

在项目根目录的 `.env.local` 文件中添加：

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-3X5LHX4V3D
```

### Vercel 生产环境

1. 登录 Vercel 控制台：https://vercel.com/dashboard
2. 选择项目 `daisei-gakuin-web`
3. 进入 `Settings` → `Environment Variables`
4. 添加新的环境变量：
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-3X5LHX4V3D`
   - **Environment**: 选择 `Production`, `Preview`, `Development`（或根据需要选择）
5. 点击 `Save`
6. 重新部署项目（或等待下次自动部署）

### GitHub Pages（可选）

如果需要 GitHub Pages 也支持 Google Analytics，需要在 GitHub Secrets 中设置：

1. 进入仓库设置：`Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret`
3. 添加：
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-3X5LHX4V3D`
4. 更新 `.github/workflows/deploy.yml`，在 `Build` 步骤的 `env` 中添加：
   ```yaml
   NEXT_PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.NEXT_PUBLIC_GA_MEASUREMENT_ID }}
   ```

## 验证安装

### 1. 本地测试

1. 在 `.env.local` 中添加环境变量
2. 重启开发服务器：`npm run dev`
3. 打开浏览器开发者工具（F12）
4. 切换到 `Network` 标签
5. 刷新页面
6. 查找 `gtag/js` 请求，应该能看到 Google Analytics 脚本已加载

### 2. 生产环境验证

1. 部署到 Vercel 后，访问网站
2. 打开浏览器开发者工具（F12）
3. 切换到 `Network` 标签
4. 查找 `gtag/js` 请求
5. 或者在 Google Analytics 控制台中查看实时数据

### 3. Google Analytics 控制台

1. 登录 [Google Analytics](https://analytics.google.com/)
2. 选择你的属性
3. 进入 `Reports` → `Realtime`
4. 访问网站，应该能看到实时访问数据

## 功能说明

当前实现的功能：

- ✅ **页面浏览跟踪** - 自动跟踪所有页面访问
- ✅ **性能优化** - 使用 `afterInteractive` 策略，不影响页面加载速度
- ✅ **多语言支持** - 自动跟踪所有语言版本的页面

## 自定义事件跟踪（可选）

如果需要跟踪自定义事件（如按钮点击、表单提交等），可以使用以下代码：

```typescript
// lib/analytics.ts
'use client'

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
```

使用示例：

```typescript
import { event } from '@/lib/analytics'

// 在按钮点击时
const handleClick = () => {
  event({
    action: 'click',
    category: 'button',
    label: 'Contact Form Submit',
  })
}
```

## 隐私政策

网站已经在隐私政策中提到了 Google Analytics 的使用，符合 GDPR 和隐私要求。

## 故障排除

### Google Analytics 没有数据

1. **检查环境变量** - 确保 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 已正确设置
2. **检查浏览器控制台** - 查看是否有 JavaScript 错误
3. **检查网络请求** - 确认 `gtag/js` 请求已发送
4. **等待时间** - Google Analytics 数据可能需要几分钟才能显示

### 开发环境不加载

- 确保 `.env.local` 文件存在且包含正确的环境变量
- 重启开发服务器
- 清除浏览器缓存

## 相关文档

- [Google Analytics 官方文档](https://developers.google.com/analytics)
- [Next.js Script 组件文档](https://nextjs.org/docs/app/api-reference/components/script)
