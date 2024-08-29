import ThesisDetail from "@/app/[locale]/thesis/[id]/ThesisDetail";
import { useTranslate } from "@/app/Translations";
import { Thesis } from "@prisma/client";
import { Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";

const StudentThesisDetail = ({ thesis }: { thesis: Thesis[] }) => {
  const translations = {
    assignedThesis: useTranslate(
      "students.id.studentThesisDetails.assignedThesis"
    ),
  };
  const { assignedThesis } = translations;
  return (
    <>
      <Separator my="3" size="4" />
      <Grid>
        <Heading size="2" mt="4" align="center">
          {`${assignedThesis}:`}
          <Text className={thesis.length === 0 ? "text-red-500" : ""}>
            {" "}
            {thesis.length}{" "}
          </Text>
        </Heading>
        <Separator my="3" size="4" />
        {thesis.map((these) => (
          <Flex key={these.id} direction="column">
            <ThesisDetail thesis={these} />
            <Separator my="3" size="4" />
          </Flex>
        ))}
      </Grid>
    </>
  );
};

export default StudentThesisDetail;
