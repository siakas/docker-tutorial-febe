import z from "zod";

// 部署関連のデータバリデーションスキーマを定義
// Zodを使用してAPIリクエストのデータ検証と型安全性を保証

/**
 * 部署作成時の入力データバリデーションスキーマ
 */
export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(1, "部署名は必須です")
    .max(50, "部署名は50文字以内で入力してください"),
  description: z
    .string()
    .max(500, "部署の説明は500文字以内で入力してください")
    .optional(), // 部署の詳細説明（任意項目）
});

/**
 * 部署更新時の入力データバリデーションスキーマ
 * 
 * createDepartmentSchemaのすべてのフィールドを任意にする
 * PATCH APIエンドポイントで部分更新を可能にするため
 * 空のオブジェクトでも有効となるよう設計
 */
export const updateDepartmentSchema = createDepartmentSchema.partial();

/** 部署作成時の型定義 */
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
/** 部署更新時の型定義 */
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;
