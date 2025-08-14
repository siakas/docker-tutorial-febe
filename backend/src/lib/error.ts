import { Context } from "hono";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleError = (err: unknown, c: Context) => {
  // Zod バリデーションエラー
  if (err instanceof ZodError) {
    return c.json(
      {
        error: "Validation failed",
        details: err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      },
      400 as const,
    );
  }

  // カスタム API エラー
  if (err instanceof ApiError) {
    return c.json(
      {
        error: err.message,
        details: err.details,
      },
      err.statusCode as any,
    );
  }

  // Prisma エラー
  if (err && typeof err === "object" && "code" in err) {
    const prismaError = err as any;

    // ユニーク制約違反
    if (prismaError.code === "P2002") {
      return c.json(
        {
          error: "既に登録されています",
          details: prismaError.meta,
        },
        409 as const,
      );
    }

    // 外部キー制約違反
    if (prismaError.code === "P2003") {
      return c.json(
        {
          error: "関連するデータが見つかりません",
          details: prismaError.meta,
        },
        400 as const,
      );
    }
  }

  // 予期しないエラー
  console.error("Unexpected error:", err);
  return c.json(
    {
      error: "Internal server error",
    },
    500 as const,
  );
};
