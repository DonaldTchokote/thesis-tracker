"use client";
import { Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StudentSearchFilter from "./StudentSearchFilter";

interface Translations {
  filter: string;
  resetFilter: string;
  newStudent: string;
}

interface SearchFilterTranslations {
  placeholder: string;
}

interface Props {
  translations: Translations;
  searchFilterTranslations: SearchFilterTranslations;
}

const StudentActions = ({ translations, searchFilterTranslations }: Props) => {
  const { filter, resetFilter, newStudent } = translations;
  const [resetKey, setResetKey] = useState(0); // State für den Schlüssel
  const router = useRouter();
  const handleResetFilter = () => {
    // Erhöhe den Schlüssel, um die Komponente neu zu laden
    setResetKey((prevKey) => prevKey + 1);

    router.push("/students/list");
  };
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Card>
          <Flex justify="center">
            <Text className="font-semibold" mr="3">
              {`${filter}:`}
            </Text>
          </Flex>
          <Flex
            justify="center"
            direction="column"
            my="3"
            style={{ maxWidth: 1000 }}
          >
            <StudentSearchFilter
              translation={searchFilterTranslations}
              key={resetKey}
            />
          </Flex>
          <Flex justify="center">
            <Button
              onClick={handleResetFilter}
              variant="surface"
              color="red"
              className="justify-center"
            >
              {`${resetFilter}`}
            </Button>
          </Flex>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href="/students/new">{newStudent}</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default StudentActions;
