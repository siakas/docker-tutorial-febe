import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("ISO 8601形式の日付文字列を日本語形式に変換する", () => {
    const result = formatDate("2024-01-15T10:30:00.000Z");
    expect(result).toBe("2024年1月15日");
  });

  it("短縮形式の日付文字列を日本語形式に変換する", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBe("2024年1月15日");
  });

  it("異なる月の日付文字列を正しく変換する", () => {
    const result = formatDate("2024-12-25");
    expect(result).toBe("2024年12月25日");
  });

  it("2月の日付を正しく変換する", () => {
    const result = formatDate("2024-02-29"); // うるう年
    expect(result).toBe("2024年2月29日");
  });

  it("平年の2月28日を正しく変換する", () => {
    const result = formatDate("2023-02-28");
    expect(result).toBe("2023年2月28日");
  });

  it("一桁の月と日を正しく変換する", () => {
    const result = formatDate("2024-05-03");
    expect(result).toBe("2024年5月3日");
  });

  it("年始の日付を正しく変換する", () => {
    const result = formatDate("2024-01-01");
    expect(result).toBe("2024年1月1日");
  });

  it("年末の日付を正しく変換する", () => {
    const result = formatDate("2024-12-31");
    expect(result).toBe("2024年12月31日");
  });
});
