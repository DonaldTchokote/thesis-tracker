import { Student } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useTranslate } from "@/app/Translations";

export interface StudentQuery {
  firstName: string;
  lastName: string;
  name: string;
  orderBy: keyof Student;
  dir: "asc" | "desc";
  page: string;
  pageSize: string;
}

interface Props {
  searchParams: StudentQuery;
  students: Student[];
}
const StudentTable = ({ searchParams, students }: Props) => {
  const translations: {
    label: string;
    value: keyof Student;
    className?: string;
  }[] = [
    {
      label: useTranslate("students.list.studentTable.firstname"),
      value: "firstName",
    },
    {
      label: useTranslate("students.list.studentTable.lastname"),
      value: "lastName",
    },
    {
      label: useTranslate("students.list.studentTable.email"),
      value: "email",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <Table.Root variant="ghost">
      <Table.Header>
        <Table.Row>
          {translations.map((column) => (
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
                      column.value === searchParams.orderBy
                        ? searchParams.dir === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                (searchParams.dir === "asc" ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {students.map((students) => (
          <Table.Row key={students.id}>
            <Table.Cell>
              <Link
                className="text-blue-600 hover-text"
                href={`/students/${students.id}`}
              >
                {students.firstName}
              </Link>
              <div className="block md:hidden">{students.email}</div>
            </Table.Cell>
            <Table.Cell>
              <Link
                className="text-blue-600 hover-text"
                href={`/students/${students.id}`}
              >
                {students.lastName}
              </Link>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {students.email}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default StudentTable;
