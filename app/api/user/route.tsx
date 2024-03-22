"use server";

import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.user.findMany();

  return NextResponse.json(data);
}
