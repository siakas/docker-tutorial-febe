import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Department,
  Employee,
  EmployeeFormData,
  employeeFormSchema,
} from "@/lib/validations/employee";

import { EmployeeFormInput } from "@/components/employee/EmployeeFormInput";
import { EmployeeFormLabel } from "@/components/employee/EmployeeFormLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  /** フォームのモード（作成 or 編集） */
  mode: "create" | "edit";
  /** 編集時の初期データ */
  initialData?: Employee;
  /** 部署リスト */
  departments: Department[];
  /** フォーム送信時の処理 */
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  /** キャンセル時の処理 */
  onCancel: () => void;
  /** 送信中フラグ */
  isSubmitting?: boolean;
};

export const EmployeeForm = ({
  mode,
  initialData,
  departments,
  onSubmit,
  onCancel,
  isSubmitting,
}: Props) => {
  // React Hook Form の初期化
  const {
    register, // 入力フォームフィールドの登録
    handleSubmit, // フォーム送信ハンドラ
    formState: { errors }, // バリデーションエラー
    setValue, // 値の手動設定
    reset, // フォームリセット
  } = useForm<EmployeeFormData>({
    // Zod スキーマによるバリデーション設定
    resolver: zodResolver(employeeFormSchema),
    // デフォルト値の設定
    defaultValues: {
      isActive: true,
      departmentId: departments[0]?.id || 0,
    },
  });

  // 編集モード時の初期データ設定
  useEffect(() => {
    if (mode === "edit" && initialData) {
      // 既存データをフォームに反映
      reset({
        employeeId: initialData.employeeId,
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber || "",
        position: initialData.position,
        salary: initialData.salary || "",
        hireDate: initialData.hireDate.split("T")[0], // 日付形式の変換
        departmentId: initialData.departmentId,
        isActive: initialData.isActive,
      });
    }
  }, [mode, initialData, reset]);

  // フォーム送信処理
  const handleFormSubmit = async (data: EmployeeFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("フォーム送信エラー:", error);
      // エラー処理は親コンポーネントでおこなうため、ここでは何もしない
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "新規社員登録" : "社員情報編集"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* 社員 ID */}
          <div>
            <EmployeeFormLabel label="社員ID" required />
            <EmployeeFormInput
              {...register("employeeId")}
              placeholder="EMP000001"
              disabled={mode === "edit"} // 編集時は変更不可
            />
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          {/* 姓名入力（横並び） */}
          <div className="grid grid-cols-2 gap-4">
            {/* 姓 */}
            <div>
              <EmployeeFormLabel label="姓" required />
              <EmployeeFormInput {...register("lastName")} placeholder="山田" />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            {/* 名 */}
            <div>
              <EmployeeFormLabel label="名" required />
              <EmployeeFormInput
                {...register("firstName")}
                placeholder="太郎"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          {/* メールアドレス */}
          <div>
            <EmployeeFormLabel label="メールアドレス" required />
            <EmployeeFormInput
              {...register("email")}
              type="email"
              placeholder="yamada@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 電話番号 */}
          <div>
            <EmployeeFormLabel label="電話番号" />
            <EmployeeFormInput
              {...register("phoneNumber")}
              type="tel"
              placeholder="09012345678"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* 部署選択 */}
          <div>
            <EmployeeFormLabel label="部署" required />
            <select
              {...register("departmentId", { valueAsNumber: true })}
              className="w-full cursor-pointer rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">部署を選択してください</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.departmentId.message}
              </p>
            )}
          </div>

          {/* 役職 */}
          <div>
            <EmployeeFormLabel label="役職" required />
            <EmployeeFormInput
              {...register("position")}
              placeholder="エンジニア"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-500">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* 給与 */}
          <div>
            <EmployeeFormLabel label="給与（年収）" />
            <EmployeeFormInput {...register("salary")} placeholder="5000000" />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-500">
                {errors.salary.message}
              </p>
            )}
          </div>

          {/* 入社日 */}
          <div>
            <EmployeeFormLabel label="入社日" required />
            <EmployeeFormInput {...register("hireDate")} type="date" />
            {errors.hireDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.hireDate.message}
              </p>
            )}
          </div>

          {/* 在籍状況 */}
          <div className="flex items-center space-x-2">
            <input
              {...register("isActive")}
              type="checkbox"
              id="isActive"
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="cursor-pointer font-medium">
              在籍中
            </label>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {mode === "create" ? "登録" : "更新"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
