import { Hono } from "hono";

import { ApiError, handleError } from "../lib/error";
import { prisma } from "../lib/prisma";
import {
  createEmployeeSchema,
  employeeQuerySchema,
  updateEmployeeSchema,
} from "../schemas/employee";

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

/**
 * 社員詳細取得
 *
 * @route GET /api/employees/:id
 * @param id 社員 ID
 * @returns 社員詳細情報と部署情報
 */
app.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // URL パラメータを数値に変換

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true, // 部署情報も含めて取得
      },
    });

    if (!employee) {
      throw new ApiError(404, "社員が見つかりません");
    }

    return c.json({ data: employee });
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 社員作成
 *
 * @route POST /api/employees
 * @returns 作成された社員情報と部署情報
 */
app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createEmployeeSchema.parse(body); // 入力値バリデーション

    // 部署の存在確認
    const department = await prisma.department.findUnique({
      where: { id: validatedData.departmentId },
    });

    if (!department) {
      throw new ApiError(400, "指定された部署が存在しません");
    }

    // 社員データ作成（部署情報も含めて返却）
    const employee = await prisma.employee.create({
      data: {
        ...validatedData,
        hireDate: new Date(validatedData.hireDate), // 文字列から Date オブジェクトに変換
      },
      include: {
        department: true,
      },
    });

    return c.json({ data: employee }, 201);
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 社員情報更新
 *
 * @route PUT /api/employees/:id
 * @param id 社員 ID（数値）
 * @returns 更新された社員情報と部署情報
 */
app.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // URL パラメータを数値に変換
    const body = await c.req.json();
    const validatedData = updateEmployeeSchema.parse(body); // 入力値バリデーション

    // 部署 ID が更新される場合、存在確認（外部キー制約違反を事前チェック）
    if (validatedData.departmentId) {
      const department = await prisma.department.findUnique({
        where: { id: validatedData.departmentId },
      });

      if (!department) {
        throw new ApiError(400, "指定された部署が存在しません");
      }
    }

    // 社員データ更新（部分更新対応）
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        ...validatedData,
        ...(validatedData.hireDate && {
          hireDate: new Date(validatedData.hireDate), // 文字列から Date オブジェクトに変換
        }),
      },
      include: {
        department: true, // 更新後の部署情報も含めて返却
      },
    });

    return c.json({ data: employee });
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 社員削除（論理削除・物理削除）
 *
 * @route DELETE /api/employees/:id
 * @param id 社員 ID
 * @query hard 物理削除フラグ（"true"で物理削除、未指定で論理削除）
 * @returns 削除結果メッセージ（論理削除の場合は更新された社員情報も含む）
 */
app.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // URL パラメータを数値に変換
    const hardDelete = c.req.query("hard") === "true"; // クエリパラメータで削除方式を判定

    if (hardDelete) {
      // 物理削除（データベースから完全に削除）
      await prisma.employee.delete({
        where: { id },
      });
      return c.json({ message: "社員データを完全に削除しました" });
    } else {
      // 論理削除（isActive を false に設定してデータは保持）
      const employee = await prisma.employee.update({
        where: { id },
        data: { isActive: false },
      });
      return c.json({
        message: "社員を無効化しました",
        data: employee,
      });
    }
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 社員統計情報取得
 *
 * @route GET /api/employees/stats/summary
 * @returns 社員統計データ（総数、有効数、無効数、部署別社員数）
 */
app.get("/stats/summary", async (c) => {
  try {
    // 複数の統計情報を並列取得（パフォーマンス最適化）
    const [totalEmployees, activeEmployees, departmentStats] =
      await Promise.all([
        prisma.employee.count(), // 全社員数
        prisma.employee.count({ where: { isActive: true } }), // 有効社員数
        prisma.department.findMany({
          select: {
            name: true,
            _count: {
              select: { employees: true }, // 部署別社員数
            },
          },
        }),
      ]);

    return c.json({
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees: totalEmployees - activeEmployees, // 無効社員数を計算
        departmentStats: departmentStats.map((dept) => ({
          name: dept.name,
          employeeCount: dept._count.employees,
        })),
      },
    });
  } catch (err) {
    return handleError(err, c);
  }
});

export default app;
