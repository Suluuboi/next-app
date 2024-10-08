import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string; name: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({ where: { id: id } });
  const validation = schema.safeParse(user);

  if (!user)
    return NextResponse.json({ error: validation.error?.errors, status: 404 });

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  //validate the request body
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user)
    return NextResponse.json(
      { error: "No user exists with that ID" },
      { status: 400 }
    );

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: validation.data,
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  //validate the request body
  //const body = await request.json();

  //const validation = schema.safeParse(body);

  // if (!validation.success)
  //   return NextResponse.json(
  //     { error: validation.error.errors },
  //     { status: 400 }
  //   );

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user)
    return NextResponse.json(
      { error: "No user exists with that ID" },
      { status: 400 }
    );

  const deletedUser = await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json(deletedUser);
}
