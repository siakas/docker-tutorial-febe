/**
 * 給与データを日本円の通貨形式で表示用にフォーマット
 * @param {number | null} salary - フォーマット対象の給与額（円単位）
 * @return {string} 通貨形式の文字列（例: "￥5,000,000"）または「非公開」
 */
export const formatSalary = (salary: number | null) => {
  if (!salary) return "非公開";

  // Intl.NumberFormat を使用して国際化対応の通貨フォーマットを適用
  // 日本円（JPY）の標準的な表記規則（￥記号、3桁区切り）に従う
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(salary);
};
