#!/bin/bash

echo "🔧 初期セットアップを開始します..."

# バックエンドの依存関係インストール
echo "📦 バックエンドのセットアップ..."
cd backend
pnpm install
cd ..

# フロントエンドの依存関係インストール
echo "📦 フロントエンドのセットアップ..."
cd frontend
pnpm install
cd ..

echo "✅ セットアップが完了しました！"
