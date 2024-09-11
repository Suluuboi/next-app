import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
export async function POST(requset: NextRequest) {
  const body = await requset.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { email, password } = validation.data;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user)
    return NextResponse.json(
      { error: "User already exists." },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}
