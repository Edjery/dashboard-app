"use server";

import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import UserSchema from "./UserSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = await UserSchema.validate(body)
      .then((valid) => {
        return valid;
      })
      .catch((error) => {
        return error;
      });

    if (validation.errors)
      return NextResponse.json(
        { error: validation.errors },
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    const user = await prisma.user
      .findUniqueOrThrow({
        where: { email: body.email },
      })
      .then(() => {
        return "User already exists!";
      })
      .catch(() => {
        return null;
      });

    if (user) {
      return NextResponse.json(
        { error: user },
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { success: "User successfully created", data: newUser },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
