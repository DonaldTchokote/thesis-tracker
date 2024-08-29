import Pagination from "@/app/[locale]/components/Pagination";
import prisma from "@/prisma/client";
import { Level, Status, Thesis } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import ThesisActions from "./ThesisActions";
import ThesisTable, { ThesisQuery } from "./ThesisTable";
import { useTranslateAsync } from "@/app/Translations";
import TranslatedPagination from "@/app/[locale]/components/TranslatedPagination";
import ThesisPageSize from "./ThesisPageSize";

interface Props {
  searchParams: ThesisQuery;
}

const ThesisPage = async ({ searchParams }: Props) => {
  const translationsPage = {
    totalNumber: await useTranslateAsync("thesis.list.page.totalNumber"),
  };
  const { totalNumber } = translationsPage;

  const translationsThesisAction = {
    filter: await useTranslateAsync("thesis.list.thesisAction.filter"),
    resetFilter: await useTranslateAsync(
      "thesis.list.thesisAction.resetFilter"
    ),
    new: await useTranslateAsync("thesis.list.thesisAction.new"),
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

  const translationsThesisStatusFilter = {
    all: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.all"
    ),
    open: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.open"
    ),
    inProgress: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.inProgress"
    ),
    registered: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.registered"
    ),
    submitted: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.submitted"
    ),
    defended: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.defended"
    ),
    cancelled: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.cancelled"
    ),
    closed: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.filterOptions.closed"
    ),
    placeholder: await useTranslateAsync(
      "thesis.list.thesisStatusFilter.placeholder"
    ),
  };

  const translationsThesisSearchFilter = {
    placeholder: await useTranslateAsync(
      "thesis.list.thesisSearchFilter.placeholder"
    ),
  };

  const translationsThesisTypeFilter = {
    all: await useTranslateAsync(
      "thesis.list.thesisTypeFilter.filterOptions.all"
    ),
    pProject: await useTranslateAsync(
      "thesis.list.thesisTypeFilter.filterOptions.pProject"
    ),
    bachelor: await useTranslateAsync(
      "thesis.list.thesisTypeFilter.filterOptions.bachelor"
    ),
    master: await useTranslateAsync(
      "thesis.list.thesisTypeFilter.filterOptions.master"
    ),
    placeholder: await useTranslateAsync(
      "thesis.list.thesisTypeFilter.placeholder"
    ),
  };

  const translationsThesisTableColumns = {
    thesis: await useTranslateAsync("thesis.list.thesisTable.thesis"),
    type: await useTranslateAsync("thesis.list.thesisTable.type"),
    status: await useTranslateAsync("thesis.list.thesisTable.status"),
    submissionDate: await useTranslateAsync(
      "thesis.list.thesisTable.submissionDate"
    ),
  };
  const {
    thesis,
    type,
    status: statusTranslation,
    submissionDate,
  } = translationsThesisTableColumns;
  const columns: {
    label: string;
    value: keyof Thesis;
    className?: string;
  }[] = [
    { label: thesis, value: "title" },
    { label: type, value: "level" },
    {
      label: statusTranslation,
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: submissionDate,
      value: "submitionDate",
      className: "hidden md:table-cell",
    },
  ];

  const translationsThesisPageSize = {
    totalNumber: await useTranslateAsync(
      "thesis.list.thesisPageSize.totalNumber"
    ),
  };

  const columnNames = columns.map((column) => column.value);

  const translationAllThesisActions = {
    translationsThesisAction,
    translationsThesisAssignFilter,
    translationsThesisSearchFilter,
    translationsThesisStatusFilter,
    translationsThesisTypeFilter,
  };

  const title =
    typeof searchParams.title === "string" &&
    searchParams.title.trim().length > 0
      ? searchParams.title.trim()
      : undefined;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const levels = Object.values(Level);
  const level = levels.includes(searchParams.level)
    ? searchParams.level
    : undefined;
  const assignOptions =
    searchParams.assignOption === "Assigned"
      ? { some: {} }
      : searchParams.assignOption === "Unassigned"
      ? { none: {} }
      : { every: {} };

  const where = {
    title: {
      startsWith: title,
    },
    status,
    level,
    students: assignOptions,
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.dir }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pSize = parseInt(searchParams.pageSize) || 10;

  const thesiss = await prisma.thesis.findMany({
    where,
    orderBy,
    skip: (page - 1) * pSize,
    take: pSize,
  });

  const thesisCount = await prisma.thesis.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <ThesisActions translations={translationAllThesisActions} />
      <Card>
        <div className="text-right">
          <Text className="mb-5 mt-3 text-right font-medium">
            {`${totalNumber}:`}
            <span className={thesisCount === 0 ? "text-red-500" : ""}>
              {" " + thesisCount}
            </span>
          </Text>
        </div>
        <ThesisPageSize
          translations={{ totalNumber: translationsThesisPageSize.totalNumber }}
        />
        <Flex direction="column" gap="5">
          <ThesisTable searchParams={searchParams} thesiss={thesiss} />
          <TranslatedPagination
            pageSize={pSize}
            currentPage={page}
            itemCount={thesisCount}
          />
        </Flex>
      </Card>
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export default ThesisPage;
