import Pagination from "@/app/[locale]/components/Pagination";
import prisma from "@/prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import StudentActions from "./StudentActions";
import StudentTable, { StudentQuery } from "./StudentTable";
import { useTranslateAsync } from "@/app/Translations";
import { Student } from "@prisma/client";
import TranslatedPagination from "@/app/[locale]/components/TranslatedPagination";
import StudentPageSize from "./StudentPageSize";

interface Props {
  searchParams: StudentQuery;
}

const StudentsPage = async ({ searchParams }: Props) => {
  const translationsPage = {
    totalNumber: await useTranslateAsync("students.list.page.totalNumber"),
  };
  const translationsStudentAction = {
    filter: await useTranslateAsync("students.list.studentActions.filter"),
    resetFilter: await useTranslateAsync(
      "students.list.studentActions.resetFilter"
    ),
    newStudent: await useTranslateAsync(
      "students.list.studentActions.newStudent"
    ),
  };
  const searchFilterTranslations = {
    placeholder: await useTranslateAsync(
      "students.list.studentSearchFilter.placeholder"
    ),
  };

  const studentTableTranslations: {
    label: string;
    value: keyof Student;
    className?: string;
  }[] = [
    {
      label: await useTranslateAsync("students.list.studentTable.firstname"),
      value: "firstName",
    },
    {
      label: await useTranslateAsync("students.list.studentTable.lastname"),
      value: "lastName",
    },
    {
      label: await useTranslateAsync("students.list.studentTable.email"),
      value: "email",
      className: "hidden md:table-cell",
    },
  ];

  const translationsStudentPageSize = {
    totalNumber: await useTranslateAsync(
      "students.list.studentPageSize.totalNumber"
    ),
  };

  const columnNames = studentTableTranslations.map((column) => column.value);

  const { totalNumber } = translationsPage;
  const name =
    typeof searchParams.name === "string" && searchParams.name.trim().length > 0
      ? searchParams.name.trim()
      : undefined;

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
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.dir }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pSize = parseInt(searchParams.pageSize) || 10;

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
    <Flex direction="column" gap="3">
      <StudentActions
        translations={translationsStudentAction}
        searchFilterTranslations={searchFilterTranslations}
      />

      <Card>
        <div className="text-right">
          <Text className="mb-5 mt-3 text-right font-medium">
            {`${totalNumber}:`}
            <span className={studentCount === 0 ? "text-red-500" : ""}>
              {" " + studentCount}
            </span>
          </Text>
        </div>
        <StudentPageSize
          translations={{
            totalNumber: translationsStudentPageSize.totalNumber,
          }}
        />

        <Flex direction="column" gap="5">
          <StudentTable searchParams={searchParams} students={students} />
          <TranslatedPagination
            pageSize={pSize}
            currentPage={page}
            itemCount={studentCount}
          />
        </Flex>
      </Card>
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default StudentsPage;
