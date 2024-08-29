import { useTranslate } from "@/app/Translations";
import { Card, Flex, Grid, Heading, Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingDashboardPage = () => {
  const sumaryCard = [1, 2, 3];
  const sumaryCard2 = [1, 2, 3, 4];
  const chartCard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const tableCard = [1, 2, 3, 4, 5];
  const translations = {
    thesis: useTranslate("dashboard.loading.thesis"),
  };
  const { thesis } = translations;
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5" align="center">
      <Flex direction="column" gap="5">
        <Flex align="center" direction="column" gap="1">
          <Flex>
            {sumaryCard.map((sCard) => (
              <Card className="relative group" key={sCard} mr="2">
                <Flex justify="center">
                  <Skeleton width="1rem" height="1rem" />
                </Flex>
                <Flex align="center" direction="column" gap="1">
                  <Skeleton width="4rem" height="1rem" />
                  <Skeleton width="1rem" height="1rem" />
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
        <Flex align="center" direction="column" gap="1">
          <Flex>
            {sumaryCard2.map((sCard) => (
              <Card className="relative group" key={sCard} mr="2">
                <Flex justify="center">
                  <Skeleton width="1rem" height="1rem" />
                </Flex>
                <Flex align="center" direction="column" gap="1">
                  <Skeleton width="4rem" height="1rem" />
                  <Skeleton width="1rem" height="1rem" />
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
        <Card>
          {chartCard.map((cCard) => (
            <Skeleton key={cCard} />
          ))}
        </Card>
      </Flex>
      <Flex direction="column" gap="5">
        <Card>
          <Heading size="4" mb="5">
            {thesis}
          </Heading>
          <Table.Root>
            <Table.Body>
              {tableCard.map((tCard) => (
                <Table.Row key={tCard}>
                  <Table.Cell>
                    <Flex justify="between">
                      <Flex
                        direction="column"
                        align="start"
                        gap="2"
                        ml="4"
                        mr="2"
                      >
                        <Skeleton width="20rem" />
                        <Flex gap="5">
                          <Skeleton width="4rem" />
                          <Skeleton width="4rem" />
                        </Flex>
                      </Flex>
                      <Flex gap="1">
                        <Skeleton width="2rem" />
                      </Flex>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </Flex>
    </Grid>
  );
};

export default LoadingDashboardPage;
