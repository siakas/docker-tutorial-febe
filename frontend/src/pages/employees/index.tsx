import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useEmployees } from "@/hooks/useEmployees";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeesPage() {
  // TanStack Query 経由で社員データを取得、自動リフレッシュとキャッシュを活用
  const { data: employees, isLoading, error } = useEmployees();

  // データ取得中は全画面中央にローディングスピナーを表示
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  // API 取得エラー時は赤色のボーダーカードでエラーメッセージを表示
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="border-red-500">
          <CardContent className="p-6">
            <p className="text-red-500">
              エラーが発生しました: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">社員一覧</h1>
        <Link href="/employees/new">
          <Button>新規社員登録</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees?.map((employee) => (
          <Card key={employee.id}>
            <CardHeader>
              <CardTitle>
                {employee.lastName} {employee.firstName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-semibold">社員ID</dt>
                  <dd>{employee.employeeId}</dd>
                </div>
                <div>
                  <dt className="font-semibold">部署</dt>
                  <dd>{employee.department.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold">役職</dt>
                  <dd>{employee.position}</dd>
                </div>
                <div>
                  <dt className="font-semibold">メール</dt>
                  <dd>{employee.email}</dd>
                </div>
              </dl>
              {/* アクションボタン: 詳細表示と編集画面への遷移 */}
              <div className="mt-4 flex gap-2">
                <Link href={`/employees/${employee.id}`}>
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                </Link>
                <Link href={`/employees/${employee.id}/edit`}>
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {employees?.length === 0 && (
          <div className="col-span-full py-8 text-center">
            <p className="text-gray-500">社員データが見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
}
