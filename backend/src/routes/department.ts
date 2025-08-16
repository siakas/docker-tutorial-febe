import { Hono } from "hono";

import { handleError } from "../lib/error";
import { prisma } from "../lib/prisma";

const app = new Hono();

// 部署一覧取得
app.get("/", async (c) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: { employees: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return c.json({
      data: departments,
      total: departments.length,
    });
  } catch (err) {
    return handleError(err, c);
  }
});

export default app;
