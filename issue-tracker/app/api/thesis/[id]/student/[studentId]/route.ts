import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; studentId: string } }
) {
  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!thesis) {
    return NextResponse.json({ error: "Invalid thesis" }, { status: 400 });
  }

  const student = await prisma.student.findUnique({
    where: { id: params.studentId },
  });
  if (!student) {
    return NextResponse.json({ error: "Invalid Student" }, { status: 400 });
  }

  const studentThesisExist = await prisma.studentThesis.findUnique({
    where: {
      studentId_thesisId: {
        studentId: params.studentId,
        thesisId: parseInt(params.id),
      },
    },
  });
  if (studentThesisExist) {
    return NextResponse.json(
      { message: "StudentThesis does exists" },
      { status: 400 }
    );
  }

  // Create a new record in StudentThesis
  const createdStudentThesis = await prisma.studentThesis.create({
    data: {
      student: {
        connect: { id: params.studentId },
      },
      thesis: {
        connect: { id: parseInt(params.id) },
      },
    },
  });

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

  return NextResponse.json({
    thesisWithStudents,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; studentId: string } }
) {
  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!thesis) {
    return NextResponse.json({ error: "Invalid thesis" }, { status: 400 });
  }

  const student = await prisma.student.findUnique({
    where: { id: params.studentId },
  });
  if (!student) {
    return NextResponse.json({ error: "Invalid Student" }, { status: 400 });
  }

  const studentThesisExist = await prisma.studentThesis.findUnique({
    where: {
      studentId_thesisId: {
        studentId: params.studentId,
        thesisId: parseInt(params.id),
      },
    },
  });
  if (!studentThesisExist) {
    return NextResponse.json(
      { message: "StudentThesis does not exists" },
      { status: 400 }
    );
  }

  const deletedStudentThesis = await prisma.studentThesis.delete({
    where: {
      studentId_thesisId: {
        studentId: params.studentId,
        thesisId: parseInt(params.id),
      },
    },
  });
  return NextResponse.json({ deletedStudentThesis });
}
