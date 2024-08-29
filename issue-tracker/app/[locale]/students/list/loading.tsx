import ThesisActions from "@/app/[locale]/thesis/list/ThesisActions";
import { useTranslate } from "@/app/Translations";
import { Card, Table } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingStudentPage = () => {
  const translations = {
    name: useTranslate("students.list.loading.name"),
    matriculation: useTranslate("students.list.loading.matriculation"),
    createdAt: useTranslate("students.list.loading.createdAt"),
  };
  const translationsThesisAction = {
    filter: useTranslate("thesis.list.thesisAction.filter"),
    resetFilter: useTranslate("thesis.list.thesisAction.resetFilter"),
    new: useTranslate("thesis.list.thesisAction.new"),
  };

  const translationsThesisAssignFilter = {
    all: useTranslate("thesis.list.thesisAssignFilter.filterOptions.all"),
    assigned: useTranslate(
      "thesis.list.thesisAssignFilter.filterOptions.assigned"
    ),
    unAssigned: useTranslate(
      "thesis.list.thesisAssignFilter.filterOptions.unAssigned"
    ),
    placeholder: useTranslate("thesis.list.thesisAssignFilter.placeholder"),
  };

  const translationsThesisStatusFilter = {
    all: useTranslate("thesis.list.thesisStatusFilter.filterOptions.all"),
    open: useTranslate("thesis.list.thesisStatusFilter.filterOptions.open"),
    inProgress: useTranslate(
      "thesis.list.thesisStatusFilter.filterOptions.inProgress"
    ),
    registered: useTranslate(
      "thesis.list.thesisStatusFilter.filterOptions.registered"
    ),
    submitted: useTranslate(
      "thesis.list.thesisStatusFilter.filterOptions.submitted"
    ),
    defended: useTranslate(
      "thesis.list.thesisStatusFilter.filterOptions.defended"
    ),
    cancelled: useTranslate(
      "thesis.list.thesisStatusFilter.filterOptions.cancelled"
    ),
    closed: useTranslate("thesis.list.thesisStatusFilter.filterOptions.closed"),
    placeholder: useTranslate("thesis.list.thesisSearchFilter.placeholder"),
  };

  const translationsThesisSearchFilter = {
    placeholder: useTranslate("thesis.list.thesisSearchFilter.placeholder"),
  };

  const translationsThesisTypeFilter = {
    all: useTranslate("thesis.list.thesisTypeFilter.filterOptions.all"),
    pProject: useTranslate(
      "thesis.list.thesisTypeFilter.filterOptions.pProject"
    ),
    bachelor: useTranslate(
      "thesis.list.thesisTypeFilter.filterOptions.bachelor"
    ),
    master: useTranslate("thesis.list.thesisTypeFilter.filterOptions.master"),
    placeholder: useTranslate("thesis.list.thesisTypeFilter.placeholder"),
  };
  const translationAllThesisActions = {
    translationsThesisAction,
    translationsThesisAssignFilter,
    translationsThesisSearchFilter,
    translationsThesisStatusFilter,
    translationsThesisTypeFilter,
  };

  const { name, matriculation, createdAt } = translations;
  const student = [1, 2, 3, 4, 5];
  return (
    <div>
      <ThesisActions translations={translationAllThesisActions} />

      <Table.Root variant="surface" className="my-3">
        <div className="text-right">
          <Skeleton width="15rem" />
        </div>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{name}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {matriculation}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {createdAt}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {student.map((student) => (
            <Table.Row key={student}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingStudentPage;
