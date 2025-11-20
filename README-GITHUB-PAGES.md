# GitHub Pages 部署说明

## 设置步骤

### 1. 在 GitHub 仓库中启用 GitHub Pages

1. 进入仓库设置：`Settings` → `Pages`
2. 在 `Source` 部分选择：`GitHub Actions`
3. 保存设置

### 2. 推送代码

代码已经配置好了 GitHub Actions workflow，推送代码到 `main` 分支后会自动构建和部署。

```bash
git add .
git commit -m "配置 GitHub Pages 部署"
git push origin main
```

### 3. 查看部署状态

- 在 GitHub 仓库中，点击 `Actions` 标签页
- 查看 workflow 运行状态
- 部署完成后，在 `Settings` → `Pages` 中可以看到网站地址

## 网站地址

部署完成后，网站地址为：
- `https://toshiki-tech.github.io/daisei-gakuin-web/`

## 注意事项

1. **首次部署**：第一次部署可能需要几分钟时间
2. **自动部署**：每次推送到 `main` 分支都会自动触发部署
3. **构建时间**：构建过程大约需要 2-5 分钟
4. **自定义域名**：可以在 `Settings` → `Pages` 中设置自定义域名

## 本地测试静态导出

在部署前，可以在本地测试静态导出：

```bash
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

## 故障排除

如果部署失败，请检查：
1. GitHub Actions 日志中的错误信息
2. `next.config.js` 配置是否正确
3. 所有依赖是否已正确安装

