export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                社員管理システム
              </h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <a href="#" className="font-medium text-gray-900">
                ダッシュボード
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                社員管理
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                部署管理
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">ダッシュボード</h2>
          <p className="mt-1 text-sm text-gray-600">社員と部署の概要情報</p>
        </div>

        {/* 統計カード */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500">
                  <span className="text-sm font-medium text-white">👥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    総社員数
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">127</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
                  <span className="text-sm font-medium text-white">🏢</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    部署数
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">8</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500">
                  <span className="text-sm font-medium text-white">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    平均年齢
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    32.5歳
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500">
                  <span className="text-sm font-medium text-white">📈</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    今月の新規採用
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">5名</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 部署別社員数グラフ（モック） */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              部署別社員数
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">開発部</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-gray-900">
                    45
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">営業部</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-gray-900">
                    36
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">人事部</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-gray-900">
                    15
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">総務部</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-gray-900">
                    21
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">その他</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-gray-500"
                      style={{ width: "17%" }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-gray-900">
                    10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 最近の活動 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              最近の活動
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <span className="text-xs text-green-600">✓</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    田中太郎さんが開発部に配属されました
                  </p>
                  <p className="text-xs text-gray-500">2時間前</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-xs text-blue-600">+</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    新しい部署「マーケティング部」が作成されました
                  </p>
                  <p className="text-xs text-gray-500">5時間前</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100">
                    <span className="text-xs text-yellow-600">!</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    佐藤花子さんの情報が更新されました
                  </p>
                  <p className="text-xs text-gray-500">1日前</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                    <span className="text-xs text-red-600">-</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    山田次郎さんが退職処理されました
                  </p>
                  <p className="text-xs text-gray-500">3日前</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* クイックアクション */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            クイックアクション
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              新規社員登録
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              部署作成
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              レポート出力
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              設定
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
