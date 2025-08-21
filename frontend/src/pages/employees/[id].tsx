import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Hash,
  Loader2,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useEmployee } from "@/hooks/useEmployees";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { formatSalary } from "@/utils/formatSalary";

export default function EmployeeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: employee,
    isLoading,
    error,
  } = useEmployee(id ? parseInt(id as string, 10) : 0);

  if (isLoading) {
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">データの読み込みに失敗しました</p>
          <Link
            href="/employees"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            社員一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">社員詳細</h1>
            <Link
              href="/employees"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              一覧に戻る
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          {/* ステータスバー */}
          <div
            className={cn(
              "h-2",
              employee.isActive ? "bg-green-500" : "bg-gray-400",
            )}
          ></div>

          {/* 基本情報 */}
          <div className="border-b border-gray-200 px-6 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {employee.lastName} {employee.firstName}
                </h2>
                <p className="mt-1 text-gray-600">{employee.position}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      employee.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {employee.isActive ? "在籍中" : "退職済み"}
                  </span>
                  <span className="text-sm text-gray-500">
                    部署: {employee.department.name}
                  </span>
                </div>
              </div>
              <Button>編集</Button>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="px-6 py-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">詳細情報</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* 社員番号 */}
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">社員番号</p>
                  <p className="font-medium text-gray-900">
                    {employee.employeeId}
                  </p>
                </div>
              </div>

              {/* メールアドレス */}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">メールアドレス</p>
                  <a
                    href={`mailto:${employee.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {employee.email}
                  </a>
                </div>
              </div>

              {/* 電話番号 */}
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">電話番号</p>
                  <p className="font-medium text-gray-900">
                    {employee.phoneNumber || "未登録"}
                  </p>
                </div>
              </div>

              {/* 入社日 */}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">入社日</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(employee.hireDate)}
                  </p>
                </div>
              </div>

              {/* 部署 */}
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">所属部署</p>
                  <p className="font-medium text-gray-900">
                    {employee.department.name}
                  </p>
                  {employee.department.description && (
                    <p className="text-sm text-gray-600">
                      {employee.department.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 役職 */}
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">役職</p>
                  <p className="font-medium text-gray-900">
                    {employee.position}
                  </p>
                </div>
              </div>

              {/* 給与情報（オプション） */}
              {employee.salary && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">年収</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {formatSalary(Number(employee.salary))}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* タイムスタンプ */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span>作成日時: </span>
                    <span className="text-gray-700">
                      {formatDate(employee.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span>更新日時: </span>
                    <span className="text-gray-700">
                      {formatDate(employee.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex gap-3">
              <Button>編集する</Button>
              <Button variant="outline">複製する</Button>
              <Button variant="destructive" className="ml-auto">
                削除する
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
