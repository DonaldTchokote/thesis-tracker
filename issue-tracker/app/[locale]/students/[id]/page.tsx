import prisma from "@/prisma/client";
import { Thesis } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteStudentButton from "./DeleteStudentButton";
import EditStudentButton from "./EditStudentButton";
import StudentDetails from "./StudentDetails";
import StudentThesisDetail from "./StudentThesisDetail";
import TranslatedDeleteStudentButton from "./TranslatedDeleteStudentButton";

interface Props {
  params: { id: string };
}

const StudentDetailPage = async ({ params }: Props) => {
  const student = await prisma?.student.findUnique({
    where: { id: params.id },
    include: {
      thesis: true, // Laden der zugehörigen Thesis direkt
    },
  });

  if (!student) {
    notFound();
  }

  const thesiss: Thesis[] | null = [];
  for (const studentThesis of student.thesis) {
    const thesis = await prisma.thesis.findUnique({
      where: { id: studentThesis.thesisId },
    });
    if (thesis) {
      thesiss.push(thesis);
    } else {
      // Behandle den Fall, wenn der Student nicht gefunden wurde
      console.error(`Thesis with ID ${studentThesis.thesisId} not found.`);
    }
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <StudentDetails student={student} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditStudentButton id={student.id} />
          <TranslatedDeleteStudentButton
            studentId={student.id}
            numberOfThesiss={thesiss.length}
          />
        </Flex>
      </Box>
      <Box className="md:col-span-4">
        <StudentThesisDetail thesis={thesiss} />
      </Box>
    </Grid>
  );
};

export default StudentDetailPage;
