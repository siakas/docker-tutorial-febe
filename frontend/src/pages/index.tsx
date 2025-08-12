export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            社員管理システム
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            フルスタック学習プロジェクト -
            三層アーキテクチャで構築する現代的なWebアプリケーション
          </p>
        </header>

        <main className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">社員管理</h3>
              <p className="mt-2 text-gray-600">
                社員情報の登録、編集、削除機能。検索・フィルタリングにも対応。
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">部署管理</h3>
              <p className="mt-2 text-gray-600">
                部署情報の管理と社員との関連付け機能。
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                ダッシュボード
              </h3>
              <p className="mt-2 text-gray-600">
                統計情報の表示とデータの可視化機能。
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              技術スタック
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <h4 className="font-medium text-gray-900">フロントエンド</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Next.js, Tailwind CSS
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900">バックエンド</h4>
                <p className="mt-1 text-sm text-gray-600">Node.js, Hono</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900">データベース</h4>
                <p className="mt-1 text-sm text-gray-600">SQLite, Prisma</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900">インフラ</h4>
                <p className="mt-1 text-sm text-gray-600">Docker</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
