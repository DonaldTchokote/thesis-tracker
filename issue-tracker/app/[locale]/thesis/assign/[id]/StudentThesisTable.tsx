import { ThesisStatusBadge } from "@/app/[locale]/components";
import ThesisLevelBadge from "@/app/[locale]/components/ThesisLevelBadge";
import { Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ThesisWithStudents } from "./page";
import { formatDateToString } from "../../_components/DateFormatter";
import { useTranslate } from "@/app/Translations";

interface Props {
  thesis: ThesisWithStudents;
}

const StudentThesisTable = ({ thesis }: Props) => {
  const translations = {
    thesis: useTranslate("thesis.assign.id.studentThesisTable.thesis"),
    type: useTranslate("thesis.assign.id.studentThesisTable.type"),
    status: useTranslate("thesis.assign.id.studentThesisTable.status"),
    created: useTranslate("thesis.assign.id.studentThesisTable.created"),
    assignedTo: useTranslate("thesis.assign.id.studentThesisTable.assignedTo"),
  };
  const {
    thesis: thesisTranslation,
    type,
    status,
    created,
    assignedTo,
  } = translations;
  return (
    <>
      {" "}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{thesisTranslation}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {type}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {status}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {created}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>{assignedTo}</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key={thesis.id}>
            <Table.Cell>
              <Link href={`/thesis/${thesis.id}`}>{thesis.title}</Link>
              <div className="block md:hidden">
                <ThesisStatusBadge status={thesis.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <ThesisLevelBadge level={thesis.level} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <ThesisStatusBadge status={thesis.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {formatDateToString(new Date(thesis.createdAt).toDateString())}
            </Table.Cell>
            <Table.Cell>
              {thesis.students.map((st) => (
                <Text as="p" key={st.studentId + st.thesisId}>
                  {st.student.firstName} {st.student.lastName}
                </Text>
              ))}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default StudentThesisTable;
