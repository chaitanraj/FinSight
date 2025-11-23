// app/api/add-expense/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.merchant || !body.amount) {
      return NextResponse.json(
        { error: "merchant and amount required" },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        userId: body.userId ? Number(body.userId) : null,
        merchant: body.merchant,
        amount: Number(body.amount),
        category: body.category || null,
        date: body.date ? new Date(body.date) : new Date(),
        metadata: body.metadata || {}
      }
    });

    return NextResponse.json(expense);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
