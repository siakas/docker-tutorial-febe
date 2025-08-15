import z from "zod";

/**
 * 社員作成時の入力データバリデーションスキーマ
 * 社員情報のすべての必須フィールドを定義
 */
export const createEmployeeSchema = z.object({
  employeeId: z
    .string()
    .regex(/^EMP\d{6}$/, "社員IDは'EMP'で始まり6桁の数字である必要があります"),
  firstName: z.string().min(1, "名は必須です").max(50),
  lastName: z.string().min(1, "姓は必須です").max(50),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, "電話番号は10桁または11桁の数字で入力してください"),
  position: z.string().min(1, "役職は必須です"),
  salary: z.number().positive("給与は正の数である必要があります").optional(),
  hireDate: z.iso.datetime("有効な日時形式で入力してください"),
  departmentId: z.number().positive("有効な部署IDを指定してください"),
  isActive: z.boolean().default(true),
});

/**
 * 社員更新時の入力データバリデーションスキーマ
 * createEmployeeSchemaのすべてのフィールドを省略可能にしたもの
 */
export const updateEmployeeSchema = createEmployeeSchema.partial();

/**
 * 社員検索・フィルタリング用のクエリパラメータバリデーションスキーマ
 * URL クエリパラメータを適切な型に変換
 */
export const employeeQuerySchema = z.object({
  departmentId: z.string().transform(Number).optional(),
  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  search: z.string().optional(),
  page: z.string().transform(Number).default(1),
  limit: z.string().transform(Number).default(10),
});

/** 社員作成時の入力データ型 */
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
/** 社員更新時の入力データ型 */
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
/** 社員検索クエリの型 */
export type EmployeeQuery = z.infer<typeof employeeQuerySchema>;
