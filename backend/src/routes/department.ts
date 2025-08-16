import { Hono } from "hono";

import { ApiError, handleError } from "../lib/error";
import { prisma } from "../lib/prisma";
import { createDepartmentSchema } from "../schemas/department";

const app = new Hono();

/**
 * 部署一覧取得
 *
 * @route GET /api/departments
 * @returns 部署一覧（社員数を含む）を作成日時の降順で返却
 */
app.get("/", async (c) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: { employees: true }, // 各部署の社員数を取得
        },
      },
      orderBy: { createdAt: "desc" }, // 新しい部署から順に表示
    });

    return c.json({
      data: departments,
      total: departments.length,
    });
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 部署詳細取得
 *
 * @route GET /api/departments/:id
 * @param id - 部署 ID
 * @returns 部署詳細情報と所属する在籍中の社員一覧
 */
app.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));

    const department = await prisma.department.findUnique({
      where: { id },
      include: {
        employees: {
          where: { isActive: true }, // 在籍中の社員のみ表示
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
            position: true,
          },
        },
      },
    });

    if (!department) {
      throw new ApiError(404, "部署が見つかりません");
    }

    return c.json({ data: department });
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 部署作成
 *
 * @route POST /api/departments
 * @body { name: string, description?: string }
 * @returns 作成された部署情報
 */
app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createDepartmentSchema.parse(body); // Zod による入力値検証

    const department = await prisma.department.create({
      data: validatedData,
    });

    return c.json({ data: department }, 201);
  } catch (err) {
    return handleError(err, c);
  }
});

/**
 * 部署更新
 *
 * @route PUT /api/departments/:id
 * @param id - 部署 ID
 * @body { name: string, description?: string }
 * @returns 更新された部署情報
 */
app.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const validatedData = createDepartmentSchema.parse(body); // Zod による入力値検証

    const department = await prisma.department.update({
      where: { id },
      data: validatedData,
    });

    return c.json({ data: department });
  } catch (error) {
    return handleError(error, c);
  }
});

/**
 * 部署削除
 *
 * @route DELETE /api/departments/:id
 * @param id - 部署 ID
 * @returns 削除完了メッセージ
 */
app.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));

    // 社員が存在するかチェック
    const employeeCount = await prisma.employee.count({
      where: { departmentId: id },
    });

    if (employeeCount > 0) {
      throw new ApiError(
        400,
        "この部署には社員が所属しているため削除できません",
      );
    }

    await prisma.department.delete({
      where: { id },
    });

    return c.json({ message: "部署を削除しました" });
  } catch (err) {
    return handleError(err, c);
  }
});

export default app;
