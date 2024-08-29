import { ThesisStatusBadge } from "@/app/[locale]/components";
import ThesisLevelBadge from "@/app/[locale]/components/ThesisLevelBadge";
import { Thesis } from "@prisma/client";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import {
  formatDateString,
  formatDateToString,
} from "@/app/[locale]/thesis/_components/DateFormatter";
import { useTranslate } from "@/app/Translations";

const ThesisDetail = ({ thesis }: { thesis: Thesis }) => {
  const translations = {
    createdAt: useTranslate("thesis.id.thesisDetails.createdAt"),
    startDate: useTranslate("thesis.id.thesisDetails.startDate"),
    applicationDate: useTranslate("thesis.id.thesisDetails.applicationDate"),
    submissionDate: useTranslate("thesis.id.thesisDetails.submissionDate"),
  };
  const { createdAt, startDate, applicationDate, submissionDate } =
    translations;
  return (
    <>
      <Flex className="space-x-3" my="2">
        <Heading>{thesis.title}</Heading>
        <ThesisLevelBadge level={thesis.level} />
      </Flex>
      <Flex className="space-x-3" my="2">
        <ThesisStatusBadge status={thesis.status} />
        <Text className="font-semibold">{createdAt}</Text>
        <Text>{formatDateToString(thesis.createdAt.toDateString())}</Text>
      </Flex>
      <Grid columns={{ initial: "1", sm: "3" }} gap="1" align="center">
        <Flex gap="2" align="center">
          <Text className="font-semibold">{`${startDate}:`}</Text>
          <Text>{formatDateToString(thesis.startDate)}</Text>
        </Flex>
        <Flex gap="2" align="center">
          <Text className="font-semibold">{`${applicationDate}:`}</Text>
          <Text>{formatDateToString(thesis.applicationDate)}</Text>
        </Flex>
        <Flex gap="2" align="center">
          <Text className="font-semibold">{`${submissionDate}:`}</Text>
          <Text>{formatDateToString(thesis.submitionDate)}</Text>
        </Flex>
      </Grid>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{thesis.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default ThesisDetail;
