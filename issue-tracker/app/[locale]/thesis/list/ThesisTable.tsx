import { ThesisStatusBadge } from "@/app/[locale]/components";
import ThesisLevelBadge from "@/app/[locale]/components/ThesisLevelBadge";
import { Level, Status, Thesis } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";
import { formatDateToString } from "../_components/DateFormatter";
import { useTranslate } from "@/app/Translations";

export interface ThesisQuery {
  title: string;
  status: Status;
  level: Level;
  orderBy: keyof Thesis;
  dir: "asc" | "desc";
  page: string;
  assignOption: "All" | "Assigned" | "Unassigned";
  pageSize: string;
}

interface Props {
  searchParams: ThesisQuery;
  thesiss: Thesis[];
}

const ThesisTable = ({ searchParams, thesiss }: Props) => {
  const translations = {
    thesis: useTranslate("thesis.list.thesisTable.thesis"),
    type: useTranslate("thesis.list.thesisTable.type"),
    status: useTranslate("thesis.list.thesisTable.status"),
    submissionDate: useTranslate("thesis.list.thesisTable.submissionDate"),
    undefined: useTranslate("thesis.list.thesisTable.undefined"),
  };
  const {
    thesis,
    type,
    status,
    submissionDate,
    undefined: undefinedTranslation,
  } = translations;
  const columns: {
    label: string;
    value: keyof Thesis;
    className?: string;
  }[] = [
    { label: thesis, value: "title" },
    { label: type, value: "level" },
    { label: status, value: "status", className: "hidden md:table-cell" },
    {
      label: submissionDate,
      value: "submitionDate",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <Table.Root variant="ghost">
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
        {thesiss.map((thesis) => (
          <Table.Row key={thesis.id}>
            <Table.Cell>
              <Flex ml="4">
                <Link
                  className="text-blue-600 hover-text"
                  href={`/thesis/${thesis.id}`}
                >
                  {thesis.title}
                </Link>
              </Flex>
              <div className="block md:hidden">
                <ThesisStatusBadge status={thesis.status} />
              </div>
            </Table.Cell>
            <Table.Cell>
              <ThesisLevelBadge level={thesis.level} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <ThesisStatusBadge status={thesis.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {formatDateToString(thesis.submitionDate) === "undefined"
                ? undefinedTranslation
                : formatDateToString(thesis.submitionDate)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ThesisTable;
