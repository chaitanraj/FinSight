import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const existingUser = await prisma.user.findUnique({ where: {email:email} });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ 
      data: {name, email, password: hashedPassword}
     });

    return Response.json({ message: "User created successfully", user });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
