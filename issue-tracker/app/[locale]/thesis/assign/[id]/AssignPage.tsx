import Pagination from "@/app/[locale]/components/Pagination";
import prisma from "@/prisma/client";
import { Student } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssignSearchFilter from "./AssignSearchFilter";
import AssignStudentTable, { StudentQuery } from "./AssignStudentTable";
import StudentThesisTable from "./StudentThesisTable";
import { ThesisWithStudents } from "./page";
import { useTranslateAsync } from "@/app/Translations";
import TranslatedPagination from "@/app/[locale]/components/TranslatedPagination";
import StudentAssignFilter from "./StudentAssignFilter";
import AssignPageSize from "./AssignPageSize";
import AssignResetButton from "./AssignResetButton";

const AssignPage = async ({
  thesisId,
  searchParams,
}: {
  thesisId: string;
  searchParams: StudentQuery;
}) => {
  const translationsAssignPage = {
    firstname: await useTranslateAsync("thesis.assign.id.assignPage.firstname"),
    lastname: await useTranslateAsync("thesis.assign.id.assignPage.lastname"),
    matriculation: await useTranslateAsync(
      "thesis.assign.id.assignPage.matriculation"
    ),
    totalNumber: await useTranslateAsync(
      "thesis.assign.id.assignPage.totalNumber"
    ),
  };
  const translationsAssignStudentTable = {
    action: await useTranslateAsync(
      "thesis.assign.id.assignStudentTable.action"
    ),
    assign: await useTranslateAsync(
      "thesis.assign.id.assignStudentTable.assign"
    ),
    unAssign: await useTranslateAsync(
      "thesis.assign.id.assignStudentTable.unAssign"
    ),
  };
  const translationsAssignSearchFilter = {
    placeholder: await useTranslateAsync(
      "thesis.assign.id.assignSearchFilter.placeholder"
    ),
  };
  const { firstname, lastname, matriculation, totalNumber } =
    translationsAssignPage;
  const { action, assign, unAssign } = translationsAssignStudentTable;

  const columns: {
    label: string;
    value: keyof Student;
    className?: string;
  }[] = [
    { label: firstname, value: "firstName" },
    { label: lastname, value: "lastName" },
    {
      label: matriculation,
      value: "matrikel",
      className: "hidden md:table-cell",
    },
  ];
  const translationsStudentTable = { columns, action, assign, unAssign };
  const columnNames = columns.map((column) => column.value);

  const translationsAssignPageSize = {
    totalNumber: await useTranslateAsync(
      "thesis.assign.id.assignPageSize.totalNumber"
    ),
  };

  const translationsAssignResetButton = {
    reset: await useTranslateAsync("thesis.assign.id.assignResetButton.reset"),
  };

  const translationsThesisAssignFilter = {
    all: await useTranslateAsync(
      "thesis.list.thesisAssignFilter.filterOptions.all"
    ),
    assigned: await useTranslateAsync(
      "thesis.list.thesisAssignFilter.filterOptions.assigned"
    ),
    unAssigned: await useTranslateAsync(
      "thesis.list.thesisAssignFilter.filterOptions.unAssigned"
    ),
    placeholder: await useTranslateAsync(
      "thesis.list.thesisAssignFilter.placeholder"
    ),
  };

  const translationsStudentAssignFilter = {
    all: await useTranslateAsync(
      "thesis.assign.id.studentAssignFilter.filterOptions.all"
    ),
    assigned: await useTranslateAsync(
      "thesis.assign.id.studentAssignFilter.filterOptions.assigned"
    ),
    unAssigned: await useTranslateAsync(
      "thesis.assign.id.studentAssignFilter.filterOptions.unAssigned"
    ),
    placeholder: await useTranslateAsync(
      "thesis.assign.id.studentAssignFilter.placeholder"
    ),
  };

  //--------------------------------------
  const thesis: ThesisWithStudents | null = await prisma.thesis.findUnique({
    where: { id: parseInt(thesisId) },
    include: {
      students: {
        include: {
          student: true, // This fetches the associated Student records
        },
      },
    },
  });
  const name =
    typeof searchParams.name === "string" && searchParams.name.trim().length > 0
      ? searchParams.name.trim()
      : undefined;

  const assignOptions =
    searchParams.assignOption === "Assigned"
      ? {
          some: {
            studentId: {
              in: thesis?.students.map((student) => student.studentId),
            },
          },
        }
      : searchParams.assignOption === "Unassigned"
      ? { none: {} }
      : { every: {} };

  const where = {
    OR: [
      {
        firstName: {
          startsWith: name ? name : "",
        },
      },
      {
        lastName: {
          startsWith: name ? name : "",
        },
      },
    ],
    thesis: assignOptions,
  };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.dir }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pSize = parseInt(searchParams.pageSize) || 10;
  const resetKey = parseInt(searchParams.rst) || 0;

  if (!thesis) notFound();

  const students = await prisma.student.findMany({
    where,
    orderBy,
    skip: (page - 1) * pSize,
    take: pSize,
  });

  const studentCount = await prisma.student.count({
    where,
  });

  return (
    <>
      <StudentThesisTable thesis={thesis} />
      <Card className="my-5">
        <div className="mb-5 mt-3 text-right">
          <Text className="font-medium">
            {`${totalNumber}:`}
            <span className={studentCount === 0 ? "text-red-500" : ""}>
              {" " + studentCount}
            </span>
          </Text>
        </div>
        <Flex align="center" gap="5">
          <StudentAssignFilter
            thesisId={thesis.id}
            translations={translationsStudentAssignFilter}
          />
          <AssignPageSize
            thesisId={thesis.id}
            translations={{
              totalNumber: translationsAssignPageSize.totalNumber,
            }}
          />
        </Flex>

        <AssignSearchFilter
          thesisId={thesis.id}
          translations={translationsAssignSearchFilter}
          key={resetKey}
        />
        <AssignResetButton
          thesisId={thesis.id}
          translations={{ reset: translationsAssignResetButton.reset }}
        />
        <AssignStudentTable
          thesis={thesis}
          searchParams={searchParams}
          students={students}
          translations={translationsStudentTable}
        />
        <TranslatedPagination
          pageSize={pSize}
          currentPage={page}
          itemCount={studentCount}
        />
      </Card>
    </>
  );
};

export const revalidate = 1;

export default AssignPage;
