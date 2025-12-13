import { prisma } from "@/lib/prisma";

export async function getExpenses(userId) {
  return prisma.expense.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: 1000,
  });
}
