import { serve } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
const prisma = new PrismaClient();

// CORS ミドルウェア
app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// GET /api/todos - すべての Todo を取得
app.get("/api/todos", async (c) => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "asc" },
  });
  return c.json(todos);
});

// POST /api/todos - 新しい Todo を作成
app.post("/api/todos", async (c) => {
  try {
    const { text } = await c.req.json<{ text: string }>();
    if (!text) return c.json({ error: "Text is required" }, 400);

    const newTodo = await prisma.todo.create({
      data: { text },
    });
    return c.json(newTodo, 201);
  } catch (err) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

// PUT /api/todos/:id - Todo の完了状態を更新
app.put("/api/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"), 10);
    const { completed } = await c.req.json<{ completed: boolean }>();

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return c.json(updatedTodo);
  } catch (err) {
    return c.json({ error: "Todo not found or failed to update" }, 500);
  }
});

// DELETE /api/todos/:id - Todo を削除
app.delete("/api/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"), 10);
    await prisma.todo.delete({
      where: { id },
    });
    return c.json({ message: "Todo deleted successfully" });
  } catch (err) {
    return c.json({ error: "Todo not found or failed to delete" }, 500);
  }
});

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
