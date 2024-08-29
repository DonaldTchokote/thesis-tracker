import { Skeleton } from "@/app/[locale]/components";
import { useTranslateAsync } from "@/app/Translations";
import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";

const LoadingThesisDetailPage = async () => {
  const translations = {
    createdAt: await useTranslateAsync("thesis.id.loading.createdAt"),
    startDate: await useTranslateAsync("thesis.id.loading.startDate"),
    applicationDate: await useTranslateAsync(
      "thesis.id.loading.applicationDate"
    ),
    submissionDate: await useTranslateAsync("thesis.id.loading.submissionDate"),
  };

  const { createdAt, startDate, applicationDate, submissionDate } =
    translations;
  return (
    <Box className="max-w-xl">
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Flex className="space-x-3" my="2">
        <Skeleton width="4rem" />
        <Text className="font-semibold">{createdAt}</Text>
        <Skeleton width="12rem" />
      </Flex>
      <Grid columns={{ initial: "1", sm: "3" }} gap="1" align="center">
        <Flex gap="2" align="center">
          <Text className="font-semibold">{`${startDate}:`}</Text>
          <Skeleton />
        </Flex>
        <Flex gap="2" align="center">
          <Text className="font-semibold">{`${applicationDate}:`}</Text>
          <Skeleton />
        </Flex>
        <Flex gap="2" align="center">
          <Text className="font-semibold">{`${submissionDate}:`}</Text>
          <Skeleton />
        </Flex>
      </Grid>
      <Card className="prose max-w-full" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingThesisDetailPage;
