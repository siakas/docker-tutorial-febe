import { useQuery } from "@tanstack/react-query";

import { fetchDepartments } from "@/lib/api/department";

/**
 * 部署一覧データを管理するカスタムフック
 *
 * @returns {UseQueryResult<Department[], Error>}
 */
export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    // 5分間はデータが新鮮とみなし、再取得をスキップ（UX向上とAPI負荷軽減）
    staleTime: 5 * 60 * 1000,
  });
};
