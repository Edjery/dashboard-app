"use server";

import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import UserSchema from "./UserSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    try {
      await UserSchema.validate(body);
    } catch (error) {
      return new Response(JSON.stringify({ error: error }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ email: newUser.email }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
