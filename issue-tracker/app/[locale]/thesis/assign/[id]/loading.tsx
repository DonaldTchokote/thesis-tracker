import { Skeleton } from "@/app/[locale]/components";
import { useTranslate } from "@/app/Translations";
import { Card, Table } from "@radix-ui/themes";

const LoadingAssignPage = () => {
  const students = [1, 2, 3, 4, 5];
  const translations = {
    thesis: useTranslate("thesis.assign.id.loading.thesis"),
    type: useTranslate("thesis.assign.id.loading.type"),
    status: useTranslate("thesis.assign.id.loading.status"),
    created: useTranslate("thesis.assign.id.loading.created"),
    firstname: useTranslate("thesis.assign.id.loading.firstname"),
    lastname: useTranslate("thesis.assign.id.loading.lastname"),
    matriculation: useTranslate("thesis.assign.id.loading.matriculation"),
  };
  const { thesis, type, status, created, firstname, lastname, matriculation } =
    translations;
  const columns: {
    label: string;
    className?: string;
  }[] = [
    { label: firstname },
    { label: lastname },
    { label: matriculation, className: "hidden md:table-cell" },
  ];
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Thesis</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {type}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {status}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              {created}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Assigned To</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
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
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <Card className="my-5">
        <div className="mb-5 mt-3 text-right">
          <Skeleton width="20rem" />
        </div>
        <Skeleton height="2rem" />

        <Table.Root className="mb-4">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.label}
                  className={column.className}
                >
                  {column.label}
                </Table.ColumnHeaderCell>
              ))}
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Action
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {students.map((student) => (
              <Table.Row key={student}>
                <Table.Cell>
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton height="2rem" />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton height="2rem" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </div>
  );
};

export default LoadingAssignPage;
