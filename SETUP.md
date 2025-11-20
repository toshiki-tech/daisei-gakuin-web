# セットアップガイド

## ロゴ画像の追加

1. 提供されたロゴ画像を `public/logo.png` として保存してください
2. 画像が存在しない場合、自動的に SVG フォールバックが表示されます

## 必要な設定

### Google Maps の埋め込み

`components/sections/Access.tsx` の以下の部分を実際の Google Maps 埋め込みコードに置き換えてください：

```tsx
{/* Google Maps Embed Placeholder */}
<div className="text-center p-8">
  {/* ここに Google Maps iframe を追加 */}
</div>
```

### 連絡先情報の更新

以下のファイルで実際の情報に更新してください：

- `components/sections/Access.tsx` - 住所、電話番号、メールアドレス
- `components/sections/Footer.tsx` - SNS リンク

## 開発の開始

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## カスタマイズ

### 色の変更

`tailwind.config.js` の `colors` セクションで色を変更できます：

```js
colors: {
  primary: '#BB3A2E',      // 朱砂红
  'primary-dark': '#CE3B32', // 赤红
  ink: '#1A1A1A',          // 墨黑
  background: '#F7F3EE',   // 米白
}
```

### フォントの変更

`app/layout.tsx` の Google Fonts リンクを変更することで、別のフォントを使用できます。

