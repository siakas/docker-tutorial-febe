import z from "zod";

// 部署のスキーマ
export const departmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// 社員のスキーマ
export const employeeSchema = z.object({
  id: z.number(),
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phoneNumber: z.string().nullable(),
  position: z.string(),
  salary: z.string().nullable(), // Decimalは文字列として扱う
  hireDate: z.string(),
  departmentId: z.number(),
  department: departmentSchema,
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 社員作成/更新用のスキーマ
export const employeeFormSchema = z.object({
  employeeId: z
    .string()
    .min(1, "社員IDは必須です")
    .regex(/^EMP\d{6}$/, "社員IDは'EMP'で始まり6桁の数字である必要があります"),
  firstName: z.string().min(1, "名は必須です").max(50),
  lastName: z.string().min(1, "姓は必須です").max(50),
  email: z.email("有効なメールアドレスを入力してください"),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10,11}$/.test(val), {
      message: "電話番号は10桁または11桁の数字で入力してください",
    }),
  position: z.string().min(1, "役職は必須です"),
  salary: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "給与は数値で入力してください",
    }),
  hireDate: z.string().min(1, "入社日は必須です"),
  departmentId: z.number().min(1, "部署は必須です"),
  isActive: z.boolean(),
});

// 型をエクスポート
export type Department = z.infer<typeof departmentSchema>;
export type Employee = z.infer<typeof employeeSchema>;
export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
