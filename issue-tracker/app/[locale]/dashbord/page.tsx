import { Card, Flex, Grid } from "@radix-ui/themes";
import "../globals.css";
import LatestThesis from "./LatestThesis";
import ThesisChart from "./ThesisChart";
import ThesisSummary from "./ThesisSummary";
import prisma from "@/prisma/client";
import Pagination from "../components/Pagination";
import TranslatedPagination from "@/app/[locale]/components/TranslatedPagination";
import { useTranslateAsync } from "@/app/Translations";

interface Props {
  searchParams: { page: string; orderBy: "submitionDate" | "createdAt" };
}

const DashboardPage = async ({ searchParams }: Props) => {
  const open = await prisma.thesis.count({ where: { status: "OPEN" } });
  const registered = await prisma.thesis.count({
    where: { status: "REGISTERED" },
  });
  const inProgress = await prisma.thesis.count({
    where: { status: "IN_PROGRESS" },
  });
  const submitted = await prisma.thesis.count({
    where: { status: "SUBMITED" },
  });
  const defended = await prisma.thesis.count({ where: { status: "DEFENDED" } });
  const canceled = await prisma.thesis.count({
    where: { status: "CANCELLED" },
  });
  const closed = await prisma.thesis.count({ where: { status: "CLOSED" } });

  const translations = {
    open: await useTranslateAsync("dashboard.thesisChart.chartOptions.open"),
    registered: await useTranslateAsync(
      "dashboard.thesisChart.chartOptions.registered"
    ),
    inProgress: await useTranslateAsync(
      "dashboard.thesisChart.chartOptions.inProgress"
    ),
    submitted: await useTranslateAsync(
      "dashboard.thesisChart.chartOptions.submitted"
    ),
    defended: await useTranslateAsync(
      "dashboard.thesisChart.chartOptions.defended"
    ),
    cancelled: await useTranslateAsync(
      "dashboard.thesisChart.chartOptions.cancelled"
    ),
    closed: await useTranslateAsync(
      "dashboard.thesisChart.chartOptions.closed"
    ),
  };

  const params = new URLSearchParams();

  const page = parseInt(searchParams?.page) || 1;

  const pageSize = 5;

  const thesisCount = await prisma.thesis.count({});

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5" align="center">
      <Flex direction="column" gap="5">
        <ThesisSummary
          open={open}
          registered={registered}
          inProgress={inProgress}
          submitted={submitted}
          defended={defended}
          canceled={canceled}
          closed={closed}
        />
        <ThesisChart
          open={open}
          registered={registered}
          inProgress={inProgress}
          submitted={submitted}
          defended={defended}
          canceled={canceled}
          closed={closed}
          translations={translations}
        />
      </Flex>
      <Card>
        <Flex direction="column" gap="5">
          <LatestThesis
            page={page}
            pageSize={pageSize}
            orderBy={searchParams.orderBy}
          />
          <TranslatedPagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={thesisCount}
          />
        </Flex>
      </Card>
    </Grid>
  );
};

export default DashboardPage;
