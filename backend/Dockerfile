# ----------------- ステージ1: ビルド環境 -----------------
  FROM node:22-alpine AS builder

  # 作業ディレクトリを設定
  WORKDIR /app

  # 最初にpackage.jsonとprismaスキーマをコピー
  COPY package*.json ./
  COPY prisma ./prisma/

  # 依存関係をインストール
  RUN npm install

  # Prisma Clientを生成
  RUN npx prisma generate

  # 残りのソースコードをコピー
  COPY . .

# ----------------- ステージ2: 本番環境 -----------------
FROM node:22-alpine

WORKDIR /app

# ビルドステージから必要なファイルをコピー
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/src ./src

# アプリケーションがリッスンするポートを公開
EXPOSE 8787

# コンテナ起動時に実行するコマンド (マイグレーション -> サーバー起動)
CMD ["npm", "run", "start"]
