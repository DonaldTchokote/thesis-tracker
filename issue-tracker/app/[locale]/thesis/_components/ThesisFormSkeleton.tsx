import { Skeleton } from "@/app/[locale]/components";
import { useTranslate } from "@/app/Translations";
import { Box, Grid, TextField, Text } from "@radix-ui/themes";

const ThesisFormSkeleton = () => {
  const translations = {
    startDate: useTranslate("thesis.components.thesisForm.startDate"),
    applicationDate: useTranslate(
      "thesis.components.thesisForm.applicationDate"
    ),
    submissionDate: useTranslate("thesis.components.thesisForm.submissionDate"),
  };
  const { startDate, applicationDate, submissionDate } = translations;
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Grid columns={{ initial: "1", sm: "2" }} gap="5" align="center">
        <Skeleton height="2rem" />
        <Skeleton height="2rem" />
      </Grid>
      <Skeleton height="27rem" />

      <Grid columns={{ initial: "1", sm: "2" }} align="center">
        <Text className="font-semibold mr-4 ">{`${startDate}:`}</Text>
        <Skeleton height="2rem" />
      </Grid>
      <Grid columns={{ initial: "1", sm: "2" }} align="center">
        <Text className="font-semibold mr-4 ">{`${applicationDate}:`}</Text>
        <Skeleton height="2rem" />
      </Grid>
      <Grid columns={{ initial: "1", sm: "2" }} align="center">
        <Text className="font-semibold mr-4 ">{`${submissionDate}:`}</Text>
        <Skeleton height="2rem" />
      </Grid>
    </Box>
  );
};

export default ThesisFormSkeleton;
