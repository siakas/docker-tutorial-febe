import z from "zod";

import { apiClient } from "@/lib/api/client";
import { Department, departmentSchema } from "@/lib/validations/employee";

/**
 * 全部署データを取得
 *
 * @returns {Promise<Department[]>} 部署データ配列
 */
export const fetchDepartments = async (): Promise<Department[]> => {
  const response = await apiClient.get("/api/departments");
  return z.array(departmentSchema).parse(response.data.data);
};
