import { patchThesisSchema } from "@/app/[locale]/ValidationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchThesisSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const {
    assignedToStudentId,
    title,
    description,
    level,
    status,
    startDate,
    applicationDate,
    submitionDate,
  } = body;
  if (assignedToStudentId) {
    const student = await prisma.student.findUnique({
      where: { id: assignedToStudentId },
    });
    if (!student)
      return NextResponse.json({ error: "Ivalid student." }, { status: 400 });
  }

  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!thesis)
    return NextResponse.json({ error: "Invalid thesis" }, { status: 404 });

  const updatedthesis = await prisma.thesis.update({
    where: { id: thesis.id },
    data: {
      title,
      level,
      description,
      status,
      startDate,
      applicationDate,
      submitionDate,
    },
  });

  return NextResponse.json(updatedthesis);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!thesis)
    return NextResponse.json({ error: "Invalid thesis" }, { status: 404 });

  await prisma.thesis.delete({
    where: { id: thesis.id },
  });

  return NextResponse.json({});
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!thesis) {
    return NextResponse.json({ error: "Invalid thesis" }, { status: 400 });
  }

  // Fetch a thesis with associated students
  const thesisWithStudents = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      students: {
        include: {
          thesis: true,
        },
      },
    },
  });

  return NextResponse.json(
    {
      thesisWithStudents,
    },
    { status: 200 }
  );
}
