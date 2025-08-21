/**
 * 日付文字列を日本語形式の読みやすい表記に変換
 * @param {string} date - 変換対象の日付文字列
 * @return {string} 日本語形式の日付文字列（例: "2024年1月15日"）
 */
export const formatDate = (date: string) => {
  // toLocaleDateString で日本のロケールと長形式フォーマットを指定
  // month: "long" により「1月」「12月」のような表記になる
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
