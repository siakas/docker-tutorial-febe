import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// ルートのインポート
import departmentRoute from "./routes/department";
import employeeRoutes from "./routes/employee";

const app = new Hono();

// ミドルウェアの設定
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// ヘルスチェックエンドポイント
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    message: "Backend server is running",
    timestamp: new Date().toISOString(),
  });
});

// API ルートの登録
app.route("/api/departments", departmentRoute);
app.route("/api/employees", employeeRoutes);

// 404 ハンドリング
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

// グローバルエラーハンドリング
app.onError((err, c) => {
  console.error("Global error:", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

const port = 3001;
console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
