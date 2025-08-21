# フルスタック学習プロジェクト - 社員管理アプリケーション

フロントエンドエンジニア初学者がバックエンドとインフラを学ぶための実践的なフルスタックアプリケーション。
三層アーキテクチャを採用した社員管理システムです。

## 主要機能

- 社員情報のCRUD操作（作成・読み取り・更新・削除）
- 部署管理とリレーション設計
- 検索・フィルタリング・ページネーション
- レスポンシブなUI/UX
- 包括的なテストスイート

**対象ユーザー**: フロントエンド開発者がフルスタック開発を学習したい方

## 技術スタック

- **フロントエンド**: Next.js 15（Pages Router）、React 19、TypeScript、Tailwind CSS、TanStack Query
- **バックエンド**: Node.js 22、Hono、Prisma ORM、SQLite
- **インフラ**: Docker、docker-compose
- **テスト**: Vitest、React Testing Library
- **バリデーション**: Zod

## クイックスタート

### 前提条件

- Docker および Docker Compose
- Node.js 22 以上（ローカル開発の場合）

### セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd docker-tutorial-febe

# 環境構築
chmod +x setup.sh
./setup.sh

# サービス起動
docker compose up --build
```

### アクセス

- **フロントエンド**: http://localhost:3000
- **API**: http://localhost:3001
- **ヘルスチェック**: http://localhost:3001/health

## 基本的な使用方法

```bash
# 開発サーバーの起動/停止
docker compose up -d        # バックグラウンドで起動
docker compose down         # 停止

# ログの確認
docker compose logs -f      # リアルタイムログ監視

# テストの実行
cd frontend && pnpm test    # フロントエンドテスト

# データベース操作
docker compose exec backend pnpm seed  # サンプルデータ投入
```

## プロジェクト構造

```
docker-tutorial-febe/
├── frontend/               # Next.js アプリケーション
│   ├── src/pages/         # ページコンポーネント
│   ├── src/components/    # UIコンポーネント
│   ├── src/hooks/         # カスタムフック
│   └── src/lib/           # APIクライアント・ユーティリティ
├── backend/               # Hono APIサーバー
│   ├── src/routes/        # APIエンドポイント
│   ├── src/schemas/       # データバリデーション
│   └── prisma/            # データベース設定
├── docker-compose.yml     # Docker設定
└── setup.sh              # 初期セットアップスクリプト
```

## 開発・貢献情報

### 開発環境セットアップ

```bash
# ローカル開発の場合
cd frontend && pnpm install
cd backend && pnpm install
pnpm prisma:migrate && pnpm seed
```

### テスト実行

```bash
# フロントエンド（33テスト実装済み）
cd frontend && pnpm test

# データベーステスト
docker compose exec backend tsx src/test-prisma.ts
```


**ライセンス**: MIT

詳細な開発情報については [CLAUDE.md](./CLAUDE.md) を参照してください。