"use client";
import { Spinner } from "@/app/[locale]/components";
import { Student } from "@prisma/client";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import { default as Link, default as NextLink } from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ThesisWithStudents } from "./page";

export interface StudentQuery {
  firstName: string;
  lastName: string;
  name: string;
  orderBy: keyof Student;
  dir: "asc" | "desc";
  page: string;
  assignOption: "All" | "Assigned" | "Unassigned";
  pageSize: string;
  rst: string;
}

interface Translations {
  columns: {
    label: string;
    value: keyof Student;
    className?: string;
  }[];
  action: string;
  assign: string;
  unAssign: string;
}

interface Props {
  searchParams: StudentQuery;
  students: Student[];
  thesis: ThesisWithStudents;
  translations: Translations;
}

const AssignStudentTable = ({
  searchParams,
  students,
  thesis,
  translations,
}: Props) => {
  const router = useRouter();
  const param = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [isAssignedStudent, setAssignedStudent] = useState<string>();
  const { columns, action, assign, unAssign } = translations;

  const handleClick = (studentId: string) => {
    if (thesis.students.find((st) => st.studentId === studentId)) {
      handleDelete(studentId);
    } else {
      handleAssign(studentId);
    }
  };

  const params = new URLSearchParams();
  const handleAssign = async (studentId: string) => {
    setLoading(true);
    try {
      setAssignedStudent(studentId);
      await axios.post(`/api/thesis/${thesis.id}/student/${studentId}`);
      reloadPage();
    } catch (error) {
      console.error("Error assigning student:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (studentId: string) => {
    setLoading(true);
    try {
      setAssignedStudent(studentId);
      await axios.delete(`/api/thesis/${thesis.id}/student/${studentId}`);
      reloadPage();
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadPage = () => {
    // Construct query params
    const params = new URLSearchParams();
    if (param.get("name")) params.append("name", param.get("name")!);
    if (param.get("assignOption"))
      params.append("assignOption", param.get("assignOption")!);
    if (param.get("orderBy")) params.append("orderBy", param.get("orderBy")!);
    if (param.get("dir")) params.append("dir", param.get("dir")!);
    if (param.get("pageSize"))
      params.append("pageSize", param.get("pageSize")!);
    if (param.get("page")) params.append("page", param.get("page")!);
    const query = params.toString() ? `?${params.toString()}` : "";

    // Reload page
    router.replace(`/thesis/assign/${thesis.id}${query}`);
    router.refresh();
  };

  return (
    <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      {students.length > 0 && (
        <Table.Root className="mb-4">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        dir:
                          column.value === searchParams?.orderBy
                            ? searchParams.dir === "asc"
                              ? "desc"
                              : "asc"
                            : "asc",
                      },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams?.orderBy &&
                    (searchParams.dir === "asc" ? (
                      <ArrowUpIcon className="inline" />
                    ) : (
                      <ArrowDownIcon className="inline" />
                    ))}
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                {action}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {students.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell>
                  <Link className="hover-text" href={`/students/${student.id}`}>
                    {student.firstName}
                  </Link>
                  <div className="block md:hidden">{student.matrikel}</div>
                </Table.Cell>
                <Table.Cell>
                  <Link className="hover-text" href={`/students/${student.id}`}>
                    {student.lastName}
                  </Link>
                  <div className="block md:hidden">
                    <Button
                      variant="surface"
                      color={
                        thesis.students.find(
                          (st) => st.studentId === student.id
                        )
                          ? "red"
                          : "blue"
                      }
                      disabled={isLoading}
                      onClick={() => handleClick(student.id)}
                    >
                      {thesis.students.find((st) => st.studentId === student.id)
                        ? "unassign"
                        : "assign"}
                      {isLoading && student.id === isAssignedStudent && (
                        <Spinner />
                      )}
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {student.matrikel}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Button
                    variant="surface"
                    color={
                      thesis.students.find((st) => st.studentId === student.id)
                        ? "red"
                        : "blue"
                    }
                    disabled={isLoading}
                    onClick={() => handleClick(student.id)}
                  >
                    {thesis.students.find((st) => st.studentId === student.id)
                      ? unAssign
                      : assign}
                    {isLoading && student.id === isAssignedStudent && (
                      <Spinner />
                    )}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

interface StudentWithThesis {
  student: {
    student: Student;
  } & {
    studentId: string;
    thesisId: number;
  };
}

export default AssignStudentTable;
