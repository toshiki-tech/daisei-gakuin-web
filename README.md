# 大成学院官网

日本人のための本格中国語教室のウェブサイトです。

## 技術スタック

- **Next.js 14** - React フレームワーク
- **TypeScript** - 型安全性
- **TailwindCSS** - スタイリング
- **next-intl** - 国際化対応（日本語・中文）
- **Sanity CMS** - コンテンツ管理システム（ニュース管理）
- **Vercel / GitHub Pages** - デプロイメント

## セットアップ

### 必要な環境

- Node.js 18 以上
- npm または yarn

### インストール

```bash
npm install --legacy-peer-deps
```

**注意**: `--legacy-peer-deps` フラグが必要です（依存関係の競合を解決するため）

### 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下を設定：

```bash
# Sanity CMS 設定（必須）
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production

# サイト URL（オプション）
NEXT_PUBLIC_SITE_URL=https://dcxy.jp
```

詳細は `SANITY_SETUP.md` を参照してください。

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## デプロイメント

### Vercel（推奨・本番環境）

- **自動デプロイ**: `main` ブランチにプッシュすると自動デプロイ
- **URL**: https://dcxy.jp
- **環境変数**: Vercel ダッシュボードで設定

詳細は Vercel ダッシュボードを参照してください。

### GitHub Pages（バックアップ）

- **自動デプロイ**: GitHub Actions で自動ビルド・デプロイ
- **URL**: https://toshiki-tech.github.io/daisei-gakuin-web/
- **設定**: `.github/workflows/deploy.yml` を参照

詳細は `README-GITHUB-PAGES.md` を参照してください。

## プロジェクト構造

```
├── app/
│   ├── [locale]/          # 多言語対応ページ
│   │   ├── page.tsx       # ホームページ
│   │   ├── news/          # ニュースページ
│   │   ├── courses/       # コースページ
│   │   └── ...
│   ├── studio/            # Sanity Studio
│   ├── layout.tsx          # ルートレイアウト
│   └── globals.css        # グローバルスタイル
├── components/
│   ├── sections/          # 各セクションコンポーネント
│   ├── news/              # ニュース関連コンポーネント
│   └── ...
├── lib/
│   ├── content/           # コンテンツ管理
│   ├── sanity/            # Sanity CMS クライアント
│   └── seo/               # SEO 関連（構造化データなど）
├── messages/              # 多言語翻訳ファイル
│   ├── ja.json
│   └── zh.json
└── public/                # 静的ファイル
```

## カラーパレット

- **Primary (朱砂红)**: `#BB3A2E`
- **Primary Dark (赤红)**: `#CE3B32`
- **Ink (墨黑)**: `#1A1A1A`
- **Background (米白)**: `#F7F3EE`

## 主な機能

- ✅ 多言語対応（日本語・中文）
- ✅ レスポンシブデザイン
- ✅ Sanity CMS によるニュース管理
- ✅ SEO 最適化（構造化データ、sitemap、robots.txt）
- ✅ Google Search Console 対応

## 注意事項

1. **環境変数**: `.env.local` ファイルを設定してください（特に Sanity 設定）
2. **依存関係**: `npm install` 時は `--legacy-peer-deps` フラグが必要です
3. **デプロイ**: Vercel が本番環境、GitHub Pages はバックアップとして使用

## 関連ドキュメント

- `SANITY_SETUP.md` - Sanity CMS 設定ガイド
- `README-GITHUB-PAGES.md` - GitHub Pages デプロイガイド
- `SEO_OPTIMIZATION_GUIDE.md` - SEO 最適化ガイド

## ライセンス

© 大成学院 All Rights Reserved.

