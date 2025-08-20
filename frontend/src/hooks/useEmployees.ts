import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createEmployee,
  deleteEmployee,
  fetchEmployee,
  fetchEmployees,
  updateEmployee,
} from "@/lib/api/employee";
import { EmployeeFormData } from "@/lib/validations/employee";

/** TanStack Query のクエリキー定数 */
const EMPLOYEE_QUERY_KEY = "employees";

/**
 * 社員一覧を取得するカスタムフック
 * @returns {UseQueryResult} 社員一覧データ、ローディング状態、エラー状態
 */
export const useEmployees = () => {
  return useQuery({
    queryKey: [EMPLOYEE_QUERY_KEY],
    queryFn: fetchEmployees,
    // staleTime: 30000, // TODO: 必要に応じてキャッシュ保持時間を調整
  });
};

/**
 * 特定の社員情報を取得するカスタムフック
 * @param {number} id - 取得対象の社員ID
 * @returns {UseQueryResult} 個別社員データ、ローディング状態、エラー状態
 */
export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: [EMPLOYEE_QUERY_KEY, id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id, // 無効なID（0、null、undefined）の場合は実行しない
  });
};

/**
 * 社員を作成するカスタムフック
 * @returns {UseMutationResult} mutate関数、ローディング状態、エラー状態
 */
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      // 社員一覧のキャッシュを無効化して最新データを取得
      // 新規作成された社員が一覧に反映される
      queryClient.invalidateQueries({ queryKey: [EMPLOYEE_QUERY_KEY] });
    },
  });
};

/**
 * 社員情報を更新するカスタムフック
 * @returns {UseMutationResult} mutate関数、ローディング状態、エラー状態
 */
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: EmployeeFormData }) =>
      updateEmployee(id, data),
    onSuccess: (_, variables) => {
      // 更新された社員の個別キャッシュを無効化
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_QUERY_KEY, variables.id],
      });
      // 社員一覧のキャッシュも無効化（統計情報などが変更される可能性）
      queryClient.invalidateQueries({
        queryKey: [EMPLOYEE_QUERY_KEY],
      });
    },
  });
};

/**
 * 社員を削除するカスタムフック
 * @returns {UseMutationResult} mutate関数、ローディング状態、エラー状態
 */
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      // 社員一覧のキャッシュを無効化
      // 削除された社員が一覧から除外される
      queryClient.invalidateQueries({ queryKey: [EMPLOYEE_QUERY_KEY] });
    },
  });
};
