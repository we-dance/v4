import { env } from "./env";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient({
  // log: ["query", "error", "warn"]
  log: ["error"],
}).$extends(withAccelerate());

const prismaGlobal = global as typeof global & {
  prisma?: typeof prisma;
};

if (env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}
