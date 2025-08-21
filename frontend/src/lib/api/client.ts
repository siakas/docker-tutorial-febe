import axios from "axios";

/**
 * API ベース URL の設定
 *
 * 開発環境: http://localhost:3001
 * 本番環境: 環境変数 NEXT_PUBLIC_API_BASE_URL で指定
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// 共通設定を持つ Axios インスタンスを作成
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // タイムアウト設定（10秒）- ネットワーク不安定時のユーザビリティ向上
  timeout: 10000,
});

/**
 * リクエストインターセプター
 *
 * 全ての API リクエスト送信前に実行される前処理
 * 現在は認証機能をコメントアウトしているが、将来の JWT 認証実装に備えて準備済み
 */
apiClient.interceptors.request.use(
  (config) => {
    // 例: 認証トークンがあれば追加
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * レスポンスインターセプター
 *
 * 全ての API レスポンス受信後に実行される後処理
 * 共通エラーハンドリング（認証エラー、サーバーエラーなど）を実装
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラー時の処理 - 将来的にはログイン画面へのリダイレクトを実装予定
      console.error("認証エラー");
      // TODO: 認証失敗時のリダイレクト処理を追加
      // 例: router.push('/login'); または store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);
