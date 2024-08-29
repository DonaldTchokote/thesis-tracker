import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { thesisSchema } from "@/app/[locale]/ValidationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = thesisSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newThesis = await prisma.thesis.create({
    data: {
      title: body.title,
      description: body.description,
      level: body.level,
      status: body.status,
      startDate: body.startDate,
      applicationDate: body.applicationDate,
      submitionDate: body.submitionDate,
    },
  });

  return NextResponse.json(newThesis, { status: 201 });
}
