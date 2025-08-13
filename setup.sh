#!/bin/bash

echo "🔧 初期セットアップを開始します..."

# バックエンドのセットアップ
echo "📦 バックエンドの依存関係をインストール中..."
cd backend
if [ ! -f "pnpm-lock.yaml" ]; then
  pnpm install
else
  pnpm install --frozen-lockfile
fi

cd ..

# フロントエンドのセットアップ
echo "📦 フロントエンドの依存関係をインストール中..."
cd frontend
if [ ! -f "pnpm-lock.yaml" ]; then
  pnpm install
else
  pnpm install --frozen-lockfile
fi

cd ..

echo "✅ セットアップが完了しました！"
echo ""
echo "🚀 次のステップ:"
echo "1. Docker環境を起動: docker compose up --build"
echo "2. フロントエンド確認: http://localhost:3000"
echo "3. バックエンド確認: http://localhost:3001/health"
