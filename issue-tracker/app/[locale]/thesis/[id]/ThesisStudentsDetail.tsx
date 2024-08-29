import StudentDetails from "@/app/[locale]/students/[id]/StudentDetails";
import { useTranslate } from "@/app/Translations";
import { Student } from "@prisma/client";
import { Grid, Heading, Separator, Text } from "@radix-ui/themes";
import React from "react";

const ThesisStudentsDetail = ({ students }: { students: Student[] }) => {
  const translations = {
    assignedStudents: useTranslate(
      "thesis.id.thesisStudentsDetails.assignedStudents"
    ),
  };
  const { assignedStudents } = translations;
  return (
    <>
      <Separator my="3" size="4" />
      <Grid gap="4">
        <Heading size="2" mt="4" align="center">
          {`${assignedStudents}:`}
          <Text className={students.length === 0 ? "text-red-500" : ""}>
            {" "}
            {students.length}{" "}
          </Text>
        </Heading>
        <Separator my="3" size="4" />
        {students.map((student) => (
          <StudentDetails key={student.id} student={student} />
        ))}
      </Grid>
    </>
  );
};

export default ThesisStudentsDetail;
