import { formatSalary } from "../formatSalary";

describe("formatSalary", () => {
  it("数値の給与を日本円の通貨形式にフォーマットする", () => {
    const result = formatSalary(5000000);
    expect(result).toBe("￥5,000,000");
  });

  it("小さな給与額を正しくフォーマットする", () => {
    const result = formatSalary(300000);
    expect(result).toBe("￥300,000");
  });

  it("大きな給与額を正しくフォーマットする", () => {
    const result = formatSalary(15000000);
    expect(result).toBe("￥15,000,000");
  });

  it("0円の場合は通貨形式でフォーマットする", () => {
    const result = formatSalary(0);
    expect(result).toBe("非公開");
  });

  it("null の場合は「非公開」を返す", () => {
    const result = formatSalary(null);
    expect(result).toBe("非公開");
  });

  it("1円の場合は通貨形式でフォーマットする", () => {
    const result = formatSalary(1);
    expect(result).toBe("￥1");
  });

  it("3桁区切りが正しく適用される", () => {
    const result = formatSalary(1234567);
    expect(result).toBe("￥1,234,567");
  });

  it("100万円台の給与を正しくフォーマットする", () => {
    const result = formatSalary(1000000);
    expect(result).toBe("￥1,000,000");
  });

  it("端数のある給与額を正しくフォーマットする", () => {
    const result = formatSalary(4567890);
    expect(result).toBe("￥4,567,890");
  });

  it("一桁の給与額を正しくフォーマットする", () => {
    const result = formatSalary(5);
    expect(result).toBe("￥5");
  });
});
