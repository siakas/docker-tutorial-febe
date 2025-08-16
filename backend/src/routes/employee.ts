import { Hono } from "hono";

import { handleError } from "../lib/error";
import { prisma } from "../lib/prisma";
import { employeeQuerySchema } from "../schemas/employee";

const app = new Hono();

/**
 * 社員一覧取得（検索・フィルタリング機能付き）
 *
 * @route GET /api/employees
 * @returns ページネーション付き社員一覧と部署情報
 */
app.get("/", async (c) => {
  try {
    const query = employeeQuerySchema.parse(c.req.query());

    // 動的な WHERE 条件の構築（指定されたフィルターのみ適用）
    const where = {
      ...(query.departmentId && { departmentId: query.departmentId }),
      ...(query.isActive !== undefined && { isActive: query.isActive }),
      ...(query.search && {
        OR: [
          { firstName: { contains: query.search } }, // 名前で部分一致検索
          { lastName: { contains: query.search } }, // 姓で部分一致検索
          { email: { contains: query.search } }, // メールアドレスで部分一致検索
          { employeeId: { contains: query.search } }, // 社員 ID で部分一致検索
        ],
      }),
    };

    // データ取得と件数カウントを並列実行（パフォーマンス最適化）
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        include: {
          department: {
            select: { id: true, name: true }, // 部署名のみ取得（パフォーマンス配慮）
          },
        },
        skip: (query.page - 1) * query.limit, // オフセット計算（ページネーション）
        take: query.limit, // 取得件数制限
        orderBy: { createdAt: "desc" }, // 新しい社員から順に表示
      }),
      prisma.employee.count({ where }), // フィルター条件に一致する総件数
    ]);

    return c.json({
      data: employees,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit), // 総ページ数計算
      },
    });
  } catch (err) {
    return handleError(err, c);
  }
});
