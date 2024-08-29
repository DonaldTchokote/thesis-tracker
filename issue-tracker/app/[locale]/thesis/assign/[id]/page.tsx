import { Student, Thesis } from "@prisma/client";
import AssignPage from "./AssignPage";
import { StudentQuery } from "./AssignStudentTable";

interface Props {
  params: { id: string };
  searchParams: StudentQuery;
}

export interface ThesisWithStudents extends Thesis {
  students: ({
    student: Student;
  } & {
    studentId: string;
    thesisId: number;
  })[];
}

const AssignToStudentPage = async ({ params, searchParams }: Props) => {
  return <AssignPage thesisId={params.id} searchParams={searchParams} />;
};

export default AssignToStudentPage;
