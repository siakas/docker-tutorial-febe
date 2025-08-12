# フルスタック学習プロジェクト - 社員管理アプリケーション

## プロジェクト概要

フロントエンドエンジニア初学者がバックエンドとインフラを学ぶための実践的なフルスタックアプリケーション開発プロジェクト。三層アーキテクチャを採用した社員管理システムを構築します。

## 学習目標

- **三層アーキテクチャ**の理解と実装
- **バックエンド・インフラの基礎知識**習得
- **Docker**を活用したコンテナ開発環境の構築
- **API設計・開発**の実践
- **データベース設計・操作**の基礎

## 技術スタック

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

- **コンテナ管理**: Docker、docker-compose

## アプリケーション機能要件

### 主要機能

1. **社員管理**
   - 社員一覧表示
   - 社員情報の検索・フィルタリング
   - 社員情報のCRUD操作（作成・読み取り・更新・削除）

2. **部署管理**
   - 部署一覧表示
   - 部署情報のCRUD操作

3. **ダッシュボード**
   - 社員数・部署数などの統計情報表示
   - グラフやチャートによる可視化

### データモデル例

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

## 学習アプローチ

### 段階的開発ステップ

1. **環境構築** - Docker環境とプロジェクト初期化
2. **データベース設計** - Prismaスキーマ定義とマイグレーション
3. **バックエンドAPI開発** - Honoを使ったRESTful API実装
4. **フロントエンド開発** - Next.jsでのUI実装
5. **統合テスト** - フロントエンドとバックエンドの連携確認

### 重要な学習ポイント

- **三層アーキテクチャ**の各層の役割と責任
- **RESTful API**の設計原則
- **データベース正規化**とリレーション設計
- **Docker**によるコンテナ化のメリット
- **型安全性**を活かした開発（TypeScript + Zod + Prisma）

## 開発時の指針

### コード品質

- TypeScriptの型安全性を最大限活用
- ESLintとPrettierによるコード統一
- Vitestによる単体テスト実装

### セキュリティ考慮事項

- 入力値検証（Zodスキーマ活用）
- SQLインジェクション対策（Prisma ORM活用）
- 適切なエラーハンドリング

### パフォーマンス

- TanStack Queryによる効率的なデータフェッチ
- 適切なデータベースインデックス設計

## 質問時のお願い

このプロジェクトに関する質問や実装で困った際は、以下の情報を含めてください：

- 現在取り組んでいる機能・層（フロントエンド/バックエンド/インフラ）
- 具体的なエラーメッセージやコード
- 期待する動作と実際の動作
- 学習目標に関連する疑問点

初学者向けの説明を心がけ、なぜそのような実装が必要なのかの理由も含めて回答します。
