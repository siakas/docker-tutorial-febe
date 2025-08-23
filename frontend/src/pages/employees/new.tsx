import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

import { useDepartments } from "@/hooks/useDepartments";

import { EmployeeForm } from "@/components/employee/EmployeeForm";

export default function NewEmployeePage() {
  const router = useRouter();

  const { data: departments, isLoading: isDepartmentsLoading } =
    useDepartments();

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

      <EmployeeForm departments={departments} />

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
