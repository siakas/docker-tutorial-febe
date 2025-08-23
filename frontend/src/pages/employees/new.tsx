import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createEmployee } from "@/lib/api/employee";
import { EmployeeFormData } from "@/lib/validations/employee";
import { useDepartments } from "@/hooks/useDepartments";

import { EmployeeForm } from "@/components/employee/EmployeeForm";

export default function NewEmployeePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 部署データの取得
  const { data: departments, isLoading: isDepartmentsLoading } =
    useDepartments();

  // 社員作成のミューテーション設定
  const createMutation = useMutation({
    // API 呼び出し関数（データ変換は createEmployee 内で実行）
    mutationFn: createEmployee,
    // 成功時の処理
    onSuccess: () => {
      // キャッシュの無効化（社員一覧を再取得）
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      // 成功通知（toast ライブラリを使用する場合）
      toast.success("社員を登録しました");

      // 一覧ページへ遷移
      router.push("/employees");
    },
    // エラー時の処理
    onError: (error) => {
      console.error("社員登録エラー:", error);
      toast.error(error.message || "社員の登録に失敗しました");
    },
  });

  // 部署データ読み込み中の表示
  if (isDepartmentsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  // 部署データが存在しない場合の処理
  if (!departments || departments.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <p className="text-red-500">
            部署データが存在しません。先に部署を登録してください。
          </p>
          <button
            onClick={() => router.push("/departments/new")}
            className="mt-4 text-blue-600 hover:underline"
          >
            部署を登録する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">新規社員登録</h1>

      <EmployeeForm
        mode="create"
        departments={departments}
        onSubmit={async (data) => {
          await createMutation.mutateAsync(data);
        }}
        onCancel={() => router.push("/employees")}
        isSubmitting={createMutation.isPending}
      />

      {departments && (
        <ul>
          {departments.map((department) => (
            <li key={department.id}>{department.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
