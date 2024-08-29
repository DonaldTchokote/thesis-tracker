import prisma from "@/prisma/client";
import { Badge, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { ThesisStatusBadge } from "../components";
import ThesisLevelBadge from "../components/ThesisLevelBadge";
import StudentAvatarCard from "./_component/StudentAvatar";
import DashboardFilter from "./DashboardFilter";
import { useTranslateAsync } from "@/app/Translations";
import { formatDateToString } from "../thesis/_components/DateFormatter";

interface Translations {
  filterOptions: {
    label: string;
    value: "submitionDate" | "createdAt";
  }[];
  placeholder: string;
}

interface Props {
  page: number;
  pageSize: number;
  orderBy: "submitionDate" | "createdAt";
}
const LatestThesis = async ({ page, pageSize, orderBy }: Props) => {
  const translationsLatestThesis = {
    thesis: await useTranslateAsync("dashboard.latestThesis.thesis"),
    undefined: await useTranslateAsync("dashboard.latestThesis.undefined"),
  };
  const { thesis, undefined } = translationsLatestThesis;

  const translationsDashboardFilter = {
    createdDate: await useTranslateAsync(
      "dashboard.dashboardFilter.createdDate"
    ),
    submissionDate: await useTranslateAsync(
      "dashboard.dashboardFilter.submissionDate"
    ),
    placeholder: await useTranslateAsync(
      "dashboard.dashboardFilter.placeholder"
    ),
  };

  const { createdDate, submissionDate, placeholder } =
    translationsDashboardFilter;
  const filterOptions: {
    label: string;
    value: "submitionDate" | "createdAt";
  }[] = [
    { label: submissionDate, value: "submitionDate" },
    { label: createdDate, value: "createdAt" },
  ];

  const translations = {
    filterOptions,
    placeholder,
  };

  const formatOrderBy = ["submitionDate", "createdAt"].includes(orderBy)
    ? orderBy
    : "submitionDate";
  const dir: "asc" | "desc" = orderBy === "createdAt" ? "desc" : "asc";
  const thesisWithStudents = await prisma.thesis.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: formatOrderBy ? { [formatOrderBy]: dir } : { submitionDate: dir },
    include: {
      students: {
        include: {
          student: true, // This fetches the associated Student records
        },
      },
    },
  });

  const whereDateIsDefined = thesisWithStudents.filter(
    (thesis) => thesis[formatOrderBy]
  );

  const sortedthesisWithStudent: typeof thesisWithStudents = [
    ...whereDateIsDefined,
  ];

  return (
    <>
      <Flex justify="between">
        <Heading size="4" mb="5">
          {thesis}
        </Heading>
        <DashboardFilter translations={translations} />
      </Flex>

      <Table.Root>
        <Table.Body>
          {sortedthesisWithStudent.map((thesis) => (
            <Table.Row key={thesis.id}>
              <Table.Cell>
                <Flex justify="between">
                  {" "}
                  <Flex direction="column" align="start" gap="2" ml="4" mr="2">
                    <Link href={`/thesis/${thesis.id}`} className="hover-text">
                      {thesis.title}
                    </Link>
                    <Flex gap="5">
                      <ThesisStatusBadge status={thesis.status} />
                      <ThesisLevelBadge level={thesis.level} />
                      {thesis[formatOrderBy] ? (
                        <Badge>
                          {formatOrderBy === "submitionDate"
                            ? formatDateToString(thesis.submitionDate)
                            : formatDateToString(
                                thesis.createdAt.toDateString()
                              )}
                        </Badge>
                      ) : (
                        <Badge color="red">{undefined}</Badge>
                      )}
                    </Flex>
                  </Flex>
                  <Flex gap="1">
                    {thesis.students &&
                      thesis.students.map((student) => (
                        <Link
                          key={student.studentId}
                          href={`/students/${student.studentId}`}
                        >
                          <StudentAvatarCard student={student.student} />
                        </Link>
                      ))}
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LatestThesis;
