import { PrismaClient } from "@prisma/client";

/**
 * グローバルオブジェクトに Prisma インスタンスを型安全に格納するための型定義
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma クライアントのシングルトンインスタンス
 * 開発環境では HMR による再初期化を防ぐため、グローバルオブジェクトから取得
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

/**
 * 開発環境でのみ Prisma インスタンスをグローバルに保存
 * 本番環境では新しいインスタンスを都度作成してメモリ使用量を最適化
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
