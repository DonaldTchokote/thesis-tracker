import prisma from "@/prisma/client";
import { Box, Flex, Grid, Separator } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditThesisButton from "./EditThesisButton";
import ThesisDetail from "./ThesisDetail";
import DeleteThesisButton from "./DeleteThesisButton";
import AssignThesisButton from "./AssignThesisButton";
import { Student } from "@prisma/client";
import ThesisStudentsDetail from "./ThesisStudentsDetail";
import { useTranslateAsync } from "@/app/Translations";

interface Props {
  params: { id: string };
}

const ThesisDetailPage = async ({ params }: Props) => {
  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      students: true, // Laden der zugehörigen Studenten direkt
    },
  });

  if (!thesis) notFound();

  const students: Student[] | null = [];
  for (const studentThesis of thesis.students) {
    const student = await prisma.student.findUnique({
      where: { id: studentThesis.studentId },
    });
    if (student) {
      students.push(student);
    } else {
      // Behandle den Fall, wenn der Student nicht gefunden wurde
      console.error(`Student with ID ${studentThesis.studentId} not found.`);
    }
  }

  const translations = {
    delete: await useTranslateAsync("thesis.id.deleteThesisButton.delete"),
    confirmation: await useTranslateAsync(
      "thesis.id.deleteThesisButton.confirmation"
    ),
    deleteWarning: await useTranslateAsync(
      "thesis.id.deleteThesisButton.deleteWarning"
    ),
    cancel: await useTranslateAsync("thesis.id.deleteThesisButton.cancel"),
    cannotDeleteDialogTitle: await useTranslateAsync(
      "thesis.id.deleteThesisButton.cannotDeleteDialogTitle"
    ),
    cannotDelete: await useTranslateAsync(
      "thesis.id.deleteThesisButton.cannotDelete"
    ),
    ok: await useTranslateAsync("thesis.id.deleteThesisButton.ok"),
  };

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ThesisDetail thesis={thesis} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditThesisButton thesisId={thesis.id} />
          <DeleteThesisButton
            translations={translations}
            thesisId={thesis.id}
            numberOfStudent={students.length}
          />
          <AssignThesisButton thesisId={thesis.id} />
        </Flex>
      </Box>
      <Box className="md:col-span-4">
        <ThesisStudentsDetail students={students} />
      </Box>
    </Grid>
  );
};

export default ThesisDetailPage;
