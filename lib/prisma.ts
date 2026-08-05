import { PrismaClient } from "@prisma/client";

// Tránh việc khởi tạo quá nhiều Prisma Client trong quá trình Hot-Reload (Dev)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
