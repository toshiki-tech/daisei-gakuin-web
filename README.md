# 大成学院官网

日本人のための本格中国語教室のウェブサイトです。

## 技術スタック

- **Next.js 14** - React フレームワーク
- **TypeScript** - 型安全性
- **TailwindCSS** - スタイリング
- **React** - UI ライブラリ

## セットアップ

### 必要な環境

- Node.js 18 以上
- npm または yarn

### インストール

```bash
npm install
```

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

## プロジェクト構造

```
├── app/
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # ホームページ
├── components/
│   └── sections/        # 各セクションコンポーネント
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Courses.tsx
│       ├── Method.tsx
│       ├── Testimonials.tsx
│       ├── Access.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
└── public/
    └── logo.png         # ロゴ画像（ここに配置してください）
```

## カラーパレット

- **Primary (朱砂红)**: `#BB3A2E`
- **Primary Dark (赤红)**: `#CE3B32`
- **Ink (墨黑)**: `#1A1A1A`
- **Background (米白)**: `#F7F3EE`

## 注意事項

1. **ロゴ画像**: `public/logo.png` にロゴ画像を配置してください。
2. **Google Maps**: `components/sections/Access.tsx` の Google Maps 埋め込み部分を実際の地図に置き換えてください。
3. **連絡先情報**: 実際の住所、電話番号、メールアドレスに更新してください。

## ライセンス

© 大成学院 All Rights Reserved.

