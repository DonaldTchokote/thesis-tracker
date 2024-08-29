import { Skeleton } from "@/app/[locale]/components";
import "react-loading-skeleton/dist/skeleton.css";

import { Card, Table } from "@radix-ui/themes";
import ThesisActions from "./ThesisActions";
import { useTranslate } from "@/app/Translations";

const LoadingThesisPage = () => {
  const translations = {
    thesis: useTranslate("thesis.list.loading.thesis"),
    type: useTranslate("thesis.list.loading.type"),
    status: useTranslate("thesis.list.loading.status"),
    created: useTranslate("thesis.list.loading.created"),
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
  const { thesis, type, status, created } = translations;
  const thesiss = [1, 2, 3, 4, 5];
  return (
    <div>
      <ThesisActions translations={translationAllThesisActions} />
      <Table.Root variant="surface" className="my-3">
        <div className="text-right">
          <Skeleton width="20rem" />
        </div>

        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{thesis}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{type}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {status}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {created}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {thesiss.map((thesis) => (
            <Table.Row key={thesis}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
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

export default LoadingThesisPage;
