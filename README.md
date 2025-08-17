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

- **フレームワーク**: Next.js 15.4.6（Pages Router）
- **React**: v19.1.0
- **CSS**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui
- **アイコン**: Lucide React
- **バリデーション**: React Hook Form、Zod
- **静的解析/フォーマット**: ESLint、Prettier
- **パッケージマネージャー**: pnpm

### バックエンド

- **ランタイム**: Node.js 22
- **フレームワーク**: Hono v4.9.1
- **データベース**: SQLite
- **ORM**: Prisma v6.14.0
- **バリデーション**: Zod v4.0.17
- **ロギング**: Pino、hono/logger
- **APIスタイル**: RESTful API
- **パッケージマネージャー**: pnpm

### インフラ・開発環境

- **コンテナ管理**: Docker、docker-compose
- **ベースイメージ**: Node.js 22 Alpine
- **ネットワーク**: Bridge（emp-network）

## 🚀 クイックスタート

### 前提条件

- Docker および Docker Compose がインストールされていること
- Node.js 22 以上がインストールされていること（ローカル開発の場合）
- pnpm がインストールされていること

### 環境構築

1. **リポジトリのクローン**

   ```bash
   git clone <repository-url>
   cd docker-tutorial-febe
   ```

2. **Docker環境での起動**

   ```bash
   # 実行権限を付与
   chmod +x setup.sh

   # セットアップスクリプトを実行
   ./setup.sh

   # Docker Composeでサービスを起動
   docker compose up --build
   ```

3. **アプリケーションへのアクセス**

   ブラウザで以下にアクセスして確認：

   - **フロントエンド**: http://localhost:3000
   - **バックエンド API**: http://localhost:3001
   - **ヘルスチェック**: http://localhost:3001/health

### 開発環境の停止

```bash
docker compose down
```

## 📁 プロジェクト構成

```
docker-tutorial-febe/
├── README.md                    # プロジェクト概要
├── CLAUDE.md                    # 詳細な仕様書
├── docker-compose.yml           # Docker設定
├── setup.sh                     # 初期セットアップスクリプト
├── package.json                 # ルートパッケージ設定
├── frontend/                    # Next.js フロントエンド
│   ├── Dockerfile.dev           # 開発用Docker設定
│   ├── package.json
│   ├── src/
│   │   ├── pages/               # Pages Router
│   │   │   ├── index.tsx        # ダッシュボード（実装済み）
│   │   │   ├── _app.tsx
│   │   │   ├── _document.tsx
│   │   │   └── api/hello.ts
│   │   ├── lib/utils.ts         # ユーティリティ関数
│   │   └── styles/globals.css
│   ├── components.json          # shadcn/ui設定
│   └── next.config.ts           # Next.js設定
├── backend/                     # Hono バックエンド
│   ├── Dockerfile.dev           # 開発用Docker設定
│   ├── package.json             # バックエンドの依存関係
│   ├── tsconfig.json            # TypeScript設定（strict）
│   ├── src/
│   │   ├── index.ts             # アプリケーションエントリーポイント
│   │   ├── lib/                 # 共通ライブラリ
│   │   │   ├── prisma.ts        # Prismaクライアント（シングルトン）
│   │   │   └── error.ts         # エラーハンドリング
│   │   ├── schemas/             # Zodバリデーションスキーマ
│   │   │   ├── department.ts    # 部署スキーマ
│   │   │   └── employee.ts      # 社員スキーマ
│   │   ├── routes/              # APIエンドポイント
│   │   │   ├── department.ts    # 部署管理API（完全実装）
│   │   │   └── employee.ts      # 社員管理API（完全実装）
│   │   └── test-prisma.ts       # Prisma操作テスト
│   └── prisma/
│       ├── schema.prisma        # データベーススキーマ定義
│       ├── seed.ts              # 初期データ投入スクリプト
│       ├── dev.db               # SQLite データベースファイル
│       └── migrations/          # マイグレーション履歴
└── database/                    # データベース関連（空ディレクトリ）
```

## 🔧 実装済み機能

### バックエンド API

#### 部署管理 API (`/api/departments`) - ✅ 完全実装

- **GET /api/departments** - 部署一覧取得（社員数含む）
- **GET /api/departments/:id** - 部署詳細取得（所属社員一覧含む）
- **POST /api/departments** - 部署作成（Zodバリデーション付き）
- **PUT /api/departments/:id** - 部署更新
- **DELETE /api/departments/:id** - 部署削除（参照整合性チェック付き）

#### 社員管理 API (`/api/employees`) - ✅ 完全実装

- **GET /api/employees** - 社員一覧取得（検索・フィルタリング・ページネーション）
  - 部署フィルタリング（`departmentId`パラメータ）
  - 在籍状況フィルタリング（`isActive`パラメータ）
  - 名前・メール・社員IDでの部分一致検索（`search`パラメータ）
  - ページネーション（`page`/`limit`パラメータ）
- **GET /api/employees/:id** - 社員詳細取得（部署情報含む）
- **POST /api/employees** - 社員作成（Zodバリデーション・部署存在チェック付き）
- **PUT /api/employees/:id** - 社員更新（部分更新対応・部署存在チェック付き）
- **DELETE /api/employees/:id** - 社員削除（論理削除・物理削除両対応）
  - デフォルト：論理削除（`isActive=false`）
  - `?hard=true`：物理削除（完全削除）
- **GET /api/employees/stats/summary** - 社員統計情報取得
  - 総社員数、有効社員数、無効社員数
  - 部署別社員数統計

#### 共通機能

- ✅ ヘルスチェックエンドポイント (`/health`)
- ✅ CORS設定（localhost:3000許可）
- ✅ 包括的エラーハンドリング
  - Zodバリデーションエラー
  - Prismaデータベースエラー
  - カスタムAPIエラー
- ✅ 日本語エラーメッセージ
- ✅ 詳細なコードコメント（日本語）

### フロントエンド

- ✅ **ダッシュボード実装**（モックデータ）
  - 統計カード表示
  - 部署別社員数グラフ
  - 最近の活動履歴
  - クイックアクションボタン
- ✅ **レスポンシブデザイン**（Tailwind CSS）
- ✅ **shadcn/ui設定済み**
- ❌ 社員管理ページ
- ❌ 部署管理ページ
- ❌ 実際のAPIとの連携

### データベース

- ✅ **Prismaスキーマ定義**
- ✅ **初期マイグレーション実行済み**
- ✅ **シードデータ**（4部署、10名の社員）
- ✅ **リレーション設定**（部署-社員）

## 📊 データモデル

```prisma
// 部署テーブル
model Department {
  id          Int        @id @default(autoincrement())
  name        String     @unique
  description String?
  employees   Employee[] // 一対多のリレーション
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// 社員テーブル
model Employee {
  id           Int         @id @default(autoincrement())
  employeeId   String      @unique // 社員番号（EMP123456形式）
  firstName    String      // 名
  lastName     String      // 姓
  email        String      @unique
  phoneNumber  String?     // NULL許可
  position     String      // 役職
  salary       Decimal?    // 給与（NULL許可）
  hireDate     DateTime    // 入社日
  departmentId Int         // 外部キー
  department   Department  @relation(fields: [departmentId], references: [id])
  isActive     Boolean     @default(true) // 在籍状況
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}
```

### 制約・インデックス

- 部署名の一意性制約
- 社員ID・メールアドレスの一意性制約
- 部署-社員間の外部キー制約（RESTRICT）

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

### APIテスト

#### 基本動作確認

```bash
# ヘルスチェック
curl http://localhost:3001/health

# 部署一覧取得
curl http://localhost:3001/api/departments

# 社員一覧取得（基本）
curl http://localhost:3001/api/employees

# 社員統計情報取得
curl http://localhost:3001/api/employees/stats/summary
```

#### 社員管理API

```bash
# 社員一覧取得（検索・フィルタリング・ページネーション）
curl "http://localhost:3001/api/employees?departmentId=1&search=田中&page=1&limit=5&isActive=true"

# 社員詳細取得
curl http://localhost:3001/api/employees/1

# 社員作成
curl -X POST http://localhost:3001/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP999999",
    "firstName": "太郎",
    "lastName": "テスト",
    "email": "test@example.com",
    "position": "エンジニア",
    "departmentId": 1,
    "hireDate": "2024-01-15"
  }'

# 社員更新（部分更新）
curl -X PUT http://localhost:3001/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"position": "シニアエンジニア", "departmentId": 2}'

# 社員削除（論理削除）
curl -X DELETE http://localhost:3001/api/employees/1

# 社員削除（物理削除）
curl -X DELETE "http://localhost:3001/api/employees/1?hard=true"
```

#### 部署管理API

```bash
# 部署作成
curl -X POST http://localhost:3001/api/departments \
  -H "Content-Type: application/json" \
  -d '{"name":"新規部署","description":"テスト部署"}'

# 部署更新
curl -X PUT http://localhost:3001/api/departments/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"更新部署","description":"更新されたテスト部署"}'

# 部署削除
curl -X DELETE http://localhost:3001/api/departments/1
```

### ログの確認

```bash
# リアルタイムログ監視
docker compose logs -f

# 特定のサービスのログ
docker compose logs -f backend
docker compose logs -f frontend
```

## 🔄 開発ワークフロー

### 段階的開発ステップ

1. **環境構築** - Docker環境とプロジェクト初期化 ✅
2. **データベース設計** - Prismaスキーマ定義とマイグレーション ✅
3. **バックエンドAPI開発** - Honoを使ったRESTful API実装 ✅
4. **フロントエンド開発** - Next.jsでのUI実装 🔄（次のステップ）
5. **統合テスト** - フロントエンドとバックエンドの連携確認 ❌

### 日常の開発ワークフロー

```bash
# 1. 開発開始
docker compose up -d
docker compose logs -f

# 2. コードの変更（ホットリロード対応済み）
# 何もする必要なし - 自動的に反映される

# 3. 依存関係の追加時
docker compose exec backend pnpm install
docker compose restart backend

# 4. データベーススキーマ変更時
docker compose exec backend pnpm prisma:migrate

# 5. 開発終了時
docker compose down
```

## 🚧 開発の次のステップ

### 優先度：高

1. **フロントエンド-バックエンド連携** - 実際のAPIとの接続
   - TanStack Query導入
   - APIクライアント実装
   - 環境変数設定

2. **社員管理画面実装**
   - 社員一覧ページ（検索・フィルタリング・ページネーション対応）
   - 社員詳細ページ
   - 社員作成・編集フォーム（React Hook Form + Zod）

### 優先度：中

3. **部署管理画面実装**
   - 部署一覧ページ
   - 部署詳細ページ（所属社員一覧含む）
   - 部署作成・編集フォーム

4. **統計ダッシュボード強化**
   - 実際のAPIデータとの連携
   - グラフ・チャートライブラリ導入
   - リアルタイム更新機能

### 優先度：低

5. **テスト実装**
   - バックエンドユニットテスト（Vitest）
   - API統合テスト
   - フロントエンドコンポーネントテスト
   - E2Eテスト（Playwright）

6. **認証機能**（将来拡張）
   - ログイン・セッション管理
   - 権限ベースアクセス制御

## 🔐 セキュリティ

- **入力値検証**（Zodスキーマ活用）
- **SQLインジェクション対策**（Prisma ORM活用）
- **適切なエラーハンドリング**
- **機密情報の保護**（給与情報等のアクセス制御）

## ⚡ パフォーマンス

- **Prismaクライアントのシングルトンパターン**
- **並列クエリ実行**（Promise.all活用）
- **選択的フィールド取得**
- **適切なインデックス設計**
- **ページネーション実装**

### 重要な学習ポイント

- **三層アーキテクチャ**の各層の役割と責任
- **RESTful API**の設計原則
- **データベース正規化**とリレーション設計
- **Docker**によるコンテナ化のメリット
- **型安全性**を活かした開発（TypeScript + Zod + Prisma）

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
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)