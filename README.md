# 雅 MIYABI - 居酒屋向け静的サイト

本格和食と厳選酒の居酒屋「雅」のウェブサイトです。和風でモダンなデザインを採用し、SEO・アクセシビリティ・パフォーマンスを重視した高品質な静的サイトとして制作されています。

## 🌟 特徴

- **和風モダンデザイン**: 落ち着いた色調と美しいタイポグラフィ
- **完全レスポンシブ**: スマホ・タブレット・PCに対応
- **SEO最適化**: 構造化データ、メタタグ、サイトマップ完備
- **アクセシビリティ対応**: WCAG準拠、キーボードナビゲーション対応
- **パフォーマンス最適化**: 軽量、高速読み込み
- **多言語対応準備**: 日本語コンテンツ、国際化対応の構造

## 📁 ファイル構成

```
/
├── index.html              # トップページ
├── menu.html               # メニュー・料金ページ
├── about.html              # 店舗情報・コンセプト
├── gallery.html            # 料理・店内ギャラリー
├── access.html             # アクセス・地図
├── contact.html            # お問い合わせ・予約フォーム
├── css/
│   └── styles.css          # メインスタイルシート
├── js/
│   └── main.js             # メインJavaScript
├── assets/
│   └── images/             # 画像ファイル（プレースホルダ）
├── sitemap.xml             # サイトマップ
├── robots.txt              # 検索エンジン向け設定
└── README.md               # このファイル
```

## 🚀 デプロイ方法

### 1. ローカル環境での確認

```bash
# ローカルサーバーの起動（Python使用例）
python -m http.server 8000

# ブラウザで確認
open http://localhost:8000
```

### 2. 本番環境へのデプロイ

#### Netlify（推奨）
1. GitHubリポジトリを作成
2. ファイルをアップロード
3. Netlifyでリポジトリを連携
4. 自動デプロイ設定完了

#### Vercel
1. vercel.com にアクセス
2. GitHubアカウントでログイン
3. リポジトリをインポート
4. 自動デプロイ開始

#### FTP（従来サーバー）
1. FTPクライアントでサーバーに接続
2. 全ファイルをpublic_html/にアップロード
3. パーミッション設定：644（ファイル）、755（ディレクトリ）

## 🔧 カスタマイズ

### 必須の置換箇所

以下のプレースホルダを実際の情報に置換してください：

#### 基本情報
- `[STORE_NAME]` → 実際の店舗名
- `[ADDRESS]` → 実際の住所
- `[PHONE]` → 実際の電話番号
- `[EMAIL]` → 実際のメールアドレス
- `[OPENING_HOURS]` → 実際の営業時間

#### ドメイン・URL
- `https://example-izakaya.com/` → 実際のドメイン
- `info@example-izakaya.com` → 実際のメールアドレス

#### 地図・位置情報
- Google Maps埋め込みコード（access.html内）
- 緯度経度情報（構造化データ内）

### 画像の準備

`assets/images/` ディレクトリに以下の画像を配置してください：

#### 必須画像（推奨サイズ）
- `hero-background.jpg` (1920x1080px) - トップページヒーロー画像
- `menu-hero.jpg` (1920x1080px) - メニューページヒーロー画像
- `about-hero.jpg` (1920x1080px) - 店舗情報ページヒーロー画像
- `gallery-hero.jpg` (1920x1080px) - ギャラリーページヒーロー画像
- `access-hero.jpg` (1920x1080px) - アクセスページヒーロー画像
- `contact-hero.jpg` (1920x1080px) - お問い合わせページヒーロー画像

#### 料理写真（400x300px 推奨）
- `sashimi.jpg` - 刺身盛り合わせ
- `tempura.jpg` - 天ぷら
- `sake.jpg` - 日本酒
- その他メニュー写真

#### 店舗写真（600x400px 推奨）
- `interior-main.jpg` - 店内メイン
- `counter-seats.jpg` - カウンター席
- `private-room-1.jpg` - 個室
- `exterior-front.jpg` - 外観

### 色・デザインのカスタマイズ

`css/styles.css` の CSS Variables を変更することで、色調を簡単に変更できます：

```css
:root {
    --primary-color: #1a365d;        /* メインカラー */
    --secondary-color: #c53030;       /* アクセントカラー */
    --accent-color: #d69e2e;          /* 金色アクセント */
    /* 他の色も変更可能 */
}
```

## 📱 レスポンシブブレイクポイント

- **モバイル**: ～640px
- **タブレット**: 641px～1024px
- **デスクトップ**: 1025px～

## 🔍 SEO設定

### 構造化データ
- LocalBusiness / Restaurant スキーマを実装
- 営業時間、住所、電話番号、価格帯を設定済み

### メタタグ
- 各ページ固有のtitle、description設定済み
- Open Graph（Facebook/Twitter用）設定済み
- Canonical URL設定済み

### サイトマップ
- `sitemap.xml` を検索エンジンに送信
- Google Search Console での登録推奨

## 🌐 SSL証明書

**重要**: 本番環境では必ずHTTPS接続を使用してください。

### Let's Encrypt（無料）
```bash
# Certbotを使用した例
sudo certbot --nginx -d yourdomain.com
```

### Cloudflare（推奨）
1. Cloudflareアカウント作成
2. ドメインのネームサーバーを変更
3. 自動SSL有効化

## 📊 アナリティクス設定

### Google Analytics 4
`</head>` の直前に以下を追加：

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ メンテナンス

### 定期更新項目
- [ ] メニュー・価格の更新（月1回）
- [ ] 営業時間・定休日の確認（月1回）
- [ ] 季節限定メニューの追加/削除（季節ごと）
- [ ] 写真の更新（3ヶ月ごと）
- [ ] SEOキーワードの見直し（6ヶ月ごと）

### パフォーマンス監視
- Google PageSpeed Insights でのスコア確認
- Core Web Vitals の監視
- 画像最適化の実施

## 🎯 コンバージョン最適化

### 電話予約の促進
- ヘッダーに常時電話番号表示
- モバイルでのワンタップ通話対応
- 複数箇所にCTAボタン配置

### 予約フォーム最適化
- 入力項目の最小化
- リアルタイムバリデーション実装
- 確認画面での離脱防止

## 🚨 セキュリティ

### 基本設定
- `.htaccess` でのセキュリティヘッダー設定
- 不要なファイルの除外
- 定期的なファイル確認

### フォームセキュリティ
- CSRFトークンの実装（バックエンド連携時）
- サニタイゼーション処理
- レート制限の設定

## 💡 今後の拡張予定

### CMS連携
- WordPress化の準備完了
- Headless CMS（Strapi/Contentful）対応可能

### 機能追加候補
- オンライン予約システム連携
- 多言語対応（英語・中国語）
- 会員システム
- ポイントカード機能
- オンライン決済

### SNS連携
- Instagram API連携でリアルタイム写真更新
- Twitter埋め込み
- Google ビジネスプロフィール連携

## 📞 サポート

### 技術的な質問
このサイトに関する技術的な質問がございましたら、以下の内容をお知らせください：

1. 使用ブラウザとバージョン
2. デバイス情報（PC/スマホ/タブレット）
3. エラーメッセージの詳細
4. 再現手順

### カスタマイズ依頼
追加のカスタマイズや機能追加をご希望の場合は、詳細な要件をお聞かせください。

## 📄 ライセンス

このサイトテンプレートは商用利用可能です。ただし、以下の点にご注意ください：

- 画像素材は適切なライセンスのものに差し替えてください
- フォントライセンスを確認してください
- 第三者のコンテンツを使用する場合は適切な許可を得てください

---

**制作日**: 2024年1月
**対応ブラウザ**: Chrome, Firefox, Safari, Edge（各最新版および1つ前のバージョン）
**技術スタック**: HTML5, CSS3, Vanilla JavaScript
**制作方針**: プログレッシブエンハンスメント、アクセシビリティファースト