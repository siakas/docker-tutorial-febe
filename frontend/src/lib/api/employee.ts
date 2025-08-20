import z from "zod";

import { apiClient } from "@/lib/api/client";
import {
  Employee,
  EmployeeFormData,
  employeeSchema,
} from "@/lib/validations/employee";

/**
 * 社員一覧を取得
 *
 * @returns 全社員データの配列（部署情報含む）
 */
export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get("/api/employees");
  // レスポンスデータの実行時型チェック
  return z.array(employeeSchema).parse(response.data);
};

/**
 * 指定 ID の社員詳細を取得
 *
 * @param id - 社員 ID（数値）
 * @returns 社員詳細データ（部署情報含む）
 */
export const fetchEmployee = async (id: number): Promise<Employee> => {
  const response = await apiClient.get(`/api/employees/${id}`);
  return employeeSchema.parse(response.data);
};

/**
 * 新規社員を作成
 *
 * @param data - 社員登録用フォームデータ（ID は自動生成されるため含まない）
 * @returns 作成された社員データ（自動生成された ID 含む）
 */
export const createEmployee = async (
  data: EmployeeFormData,
): Promise<Employee> => {
  const response = await apiClient.post("/api/employees", data);
  return employeeSchema.parse(response.data);
};

/**
 * 既存社員の情報を更新
 *
 * @param id - 更新対象の社員 ID
 * @param data - 更新用フォームデータ（部分更新ではなく全項目必須）
 * @returns 更新後の社員データ
 */
export const updateEmployee = async (
  id: number,
  data: EmployeeFormData,
): Promise<Employee> => {
  const response = await apiClient.put(`/api/employees/${id}`, data);
  return employeeSchema.parse(response.data);
};

/**
 * 指定 ID の社員を削除
 *
 * 物理削除を実行（論理削除ではない）
 * 関連する部署データには影響しない
 *
 * @param id - 削除対象の社員 ID
 */
export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/employees/${id}`);
};
