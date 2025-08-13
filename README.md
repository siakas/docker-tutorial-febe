# フルスタック学習プロジェクト - 社員管理アプリケーション

## 📋 プロジェクト概要

フロントエンドエンジニア初学者がバックエンドとインフラを学ぶための実践的なフルスタックアプリケーション開発プロジェクト。三層アーキテクチャを採用した社員管理システムを構築します。

## 🎯 学習目標

- **三層アーキテクチャ**の理解と実装
- **バックエンド・インフラの基礎知識**習得
- **Docker**を活用したコンテナ開発環境の構築
- **API設計・開発**の実践
- **データベース設計・操作**の基礎

## 🛠️ 技術スタック

### フロントエンド

- **フレームワーク**: Next.js（Pages Router）
- **CSS**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **データフェッチ/状態管理**: TanStack Query、Axios
- **バリデーション**: React Hook Form、Zod
- **単体テスト**: Vitest
- **静的解析/フォーマット**: ESLint、Prettier
- **パッケージマネージャー**: pnpm

### バックエンド

- **ランタイム**: Node.js
- **フレームワーク**: Hono
- **データベース**: SQLite
- **ORM**: Prisma
- **ロギング**: hono/logger、pino
- **APIスタイル**: RESTful API
- **パッケージマネージャー**: pnpm

### インフラ・開発環境

- **コンテナ管理**: Docker、docker compose

## 🚀 クイックスタート

### 前提条件

- Docker および Docker Compose がインストールされていること
- Node.js 22 以上がインストールされていること（ローカル開発の場合）

### 環境構築

1. **リポジトリのクローン**

   ```bash
   git clone <repository-url>
   cd docker-tutorial-febe
   ```

2. **Docker環境での起動（初回のみ）**

   ```bash
   # 実行権限を付与
   chmod +x setup.sh

   # セットアップスクリプトを実行
   ./setup.sh

   # Docker Composeでサービスを起動
   docker compose up --build
   ```

ブラウザで以下にアクセスして確認：

1. バックエンド: http://localhost:3001/health
   - JSONレスポンスが表示されれば成功
2. フロントエンド: http://localhost:3000
   - Next.jsのデフォルトページが表示されれば成功

3. **アプリケーションへのアクセス**
   - フロントエンド: http://localhost:3000
   - バックエンド API: http://localhost:3001
   - ヘルスチェック: http://localhost:3001/health

### 開発環境の停止

```bash
docker compose down
```

## 🗄️ データベース操作

### Prismaコマンド（コンテナ内実行）

```bash
# Prismaクライアントの生成
docker compose exec backend pnpm prisma:generate

# データベースマイグレーション
docker compose exec backend pnpm prisma:migrate

# Prisma Studioの起動（データベースGUI）
docker compose exec backend pnpm prisma:studio

# シードデータの投入
docker compose exec backend pnpm seed

# データベーステスト
docker compose exec backend tsx src/test-prisma.ts
```

### ローカルでの開発時

```bash
cd backend

# Prismaクライアントの生成
pnpm prisma:generate

# マイグレーションの実行
pnpm prisma:migrate

# シードデータの投入
pnpm seed

# データベーステスト実行
pnpm tsx src/test-prisma.ts
```

## 🐳 Docker Compose 開発コマンド

### 基本的なコマンド

```bash
# サービスをバックグラウンドで起動
docker compose up -d

# サービスをフォアグラウンドで起動（ログ表示）
docker compose up

# 特定のサービスのみ起動
docker compose up -d backend
docker compose up -d frontend

# サービスの停止
docker compose down

# サービスの停止（ボリュームも削除）
docker compose down -v

# サービスの再起動
docker compose restart

# 特定のサービスのみ再起動
docker compose restart backend
```

### ログとデバッグ

```bash
# 全サービスのログを表示
docker compose logs

# 特定のサービスのログを表示
docker compose logs backend
docker compose logs frontend

# リアルタイムでログを追跡
docker compose logs -f

# 特定のサービスのリアルタイムログ
docker compose logs -f backend
```

### コンテナ管理

```bash
# 実行中のサービス一覧
docker compose ps

# サービスの状態確認
docker compose top

# コンテナ内でコマンド実行
docker compose exec backend sh
docker compose exec frontend sh

# 新しいコンテナでコマンド実行
docker compose run backend pnpm install
docker compose run frontend pnpm build
```

### ビルドとクリーンアップ

```bash
# イメージを再ビルド
docker compose build

# 特定のサービスのみ再ビルド
docker compose build backend

# キャッシュを使わずに再ビルド
docker compose build --no-cache

# サービスを停止してイメージを再ビルドしてから起動
docker compose up -d --build

# 未使用のイメージ、コンテナ、ネットワークを削除
docker system prune -f

# 全てのボリュームを削除（注意：データが失われます）
docker compose down -v
docker volume prune -f
```

### 開発時によく使うワークフロー

```bash
# 1. 初回セットアップ
chmod +x setup.sh
./setup.sh
docker compose up -d

# 2. 日常の開発開始
docker compose up -d
docker compose logs -f

# 3. コードの変更後（ホットリロード対応済み）
# 何もする必要なし - 自動的に反映される

# 4. 依存関係の追加時
docker compose exec backend pnpm install
docker compose restart backend

# 5. 初期データの投入
docker compose exec backend pnpm seed

# 6. トラブルシューティング時
docker compose down
docker compose build --no-cache
docker compose up -d

# 7. 開発終了時
docker compose down
```

## 📁 プロジェクト構成

```
docker-tutorial-febe/
├── README.md                    # プロジェクト概要
├── CLAUDE.md                    # 詳細な仕様書
├── docker compose.yml           # Docker設定
├── setup.sh                     # 初期セットアップスクリプト
├── frontend/                    # Next.js フロントエンド
│   ├── Dockerfile.dev
│   ├── package.json
│   ├── pages/
│   ├── styles/
│   └── ...
├── backend/                     # Hono バックエンド
│   ├── Dockerfile.dev           # 開発用Docker設定
│   ├── package.json            # バックエンドの依存関係
│   ├── tsconfig.json           # TypeScript設定
│   ├── src/
│   │   ├── index.ts            # エントリーポイント
│   │   └── test-prisma.ts      # Prisma操作テスト
│   └── prisma/
│       ├── schema.prisma       # データベーススキーマ定義
│       ├── seed.ts            # 初期データ投入スクリプト
│       ├── dev.db             # SQLite データベースファイル
│       └── migrations/        # マイグレーション履歴
└── database/                    # SQLite データベース（Docker用）
    └── dev.db
```

## 🔧 主要機能

### 社員管理

- 社員一覧表示
- 社員情報の検索・フィルタリング
- 社員情報のCRUD操作（作成・読み取り・更新・削除）

### 部署管理

- 部署一覧表示
- 部署情報のCRUD操作

### ダッシュボード

- 社員数・部署数などの統計情報表示
- グラフやチャートによる可視化

## 📊 データモデル

```prisma
// 部署テーブル
model Department {
  id          Int        @id @default(autoincrement())
  name        String     @unique
  description String?
  employees   Employee[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// 社員テーブル
model Employee {
  id           Int         @id @default(autoincrement())
  employeeId   String      @unique
  firstName    String
  lastName     String
  email        String      @unique
  phoneNumber  String?
  position     String
  salary       Decimal?
  hireDate     DateTime
  departmentId Int
  department   Department  @relation(fields: [departmentId], references: [id])
  isActive     Boolean     @default(true)
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}
```

## 🔄 開発ワークフロー

### 段階的開発ステップ

1. **環境構築** - Docker環境とプロジェクト初期化 ✅
2. **データベース設計** - Prismaスキーマ定義とマイグレーション ✅
3. **バックエンドAPI開発** - Honoを使ったRESTful API実装 🔄
4. **フロントエンド開発** - Next.jsでのUI実装
5. **統合テスト** - フロントエンドとバックエンドの連携確認

### 重要な学習ポイント

- **三層アーキテクチャ**の各層の役割と責任
- **RESTful API**の設計原則
- **データベース正規化**とリレーション設計
- **Docker**によるコンテナ化のメリット
- **型安全性**を活かした開発（TypeScript + Zod + Prisma）

## 🔐 セキュリティ

- 入力値検証（Zodスキーマ活用）
- SQLインジェクション対策（Prisma ORM活用）
- 適切なエラーハンドリング

## ⚡ パフォーマンス

- TanStack Queryによる効率的なデータフェッチ
- 適切なデータベースインデックス設計

## 🧪 テストとデバッグ

### データベースのテスト実行

Prismaの基本操作をテストできるスクリプトが用意されています：

```bash
# コンテナ内でテスト実行
docker compose exec backend tsx src/test-prisma.ts

# ローカルでテスト実行
cd backend && pnpm tsx src/test-prisma.ts
```

テスト内容：
- 全社員取得（リレーション込み）
- 部署別検索
- 集計クエリ（部署別統計）
- 名前検索
- ページネーション
- トランザクション

### ログの確認

```bash
# リアルタイムログ監視
docker compose logs -f

# 特定のサービスのログ
docker compose logs -f backend
docker compose logs -f frontend
```

## 🤝 コントリビューション

このプロジェクトは学習目的で作成されています。質問や改善提案がある場合は、以下の情報を含めてIssueを作成してください：

- 現在取り組んでいる機能・層（フロントエンド/バックエンド/インフラ）
- 具体的なエラーメッセージやコード
- 期待する動作と実際の動作
- 学習目標に関連する疑問点

## 📝 ライセンス

このプロジェクトは学習目的で作成されており、MITライセンスの下で公開されています。

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
