// app/api/get-expenses/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  const expenses = await prisma.expense.findMany({
    where: userId ? { userId: Number(userId) } : {},
    orderBy: { date: "desc" },
    take: 1000
  });

  return NextResponse.json(expenses);
}
