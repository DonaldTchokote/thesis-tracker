"use client";
import { Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThesisSearchFilter from "./ThesisSearchFilter";
import ThesisStatusFilter from "./ThesisStatusFilter";
import ThesisTypeFilter from "./ThesisTypeFilter";
import ThesisAssignFilter from "./ThesisAssignFilter";

export interface TranslationsThesisAssignFilter {
  all: string;
  assigned: string;
  unAssigned: string;
  placeholder: string;
}

export interface TranslationsThesisAction {
  filter: string;
  resetFilter: string;
  new: string;
}

export interface TranslationsThesisStatusFilter {
  all: string;
  open: string;
  inProgress: string;
  registered: string;
  submitted: string;
  defended: string;
  cancelled: string;
  closed: string;
  placeholder: string;
}

export interface TranslationsThesisSearchFilter {
  placeholder: string;
}

export interface TranslationsThesisTypeFilter {
  all: string;
  pProject: string;
  bachelor: string;
  master: string;
  placeholder: string;
}

interface Props {
  translations: {
    translationsThesisAction: TranslationsThesisAction;
    translationsThesisAssignFilter: TranslationsThesisAssignFilter;
    translationsThesisSearchFilter: TranslationsThesisSearchFilter;
    translationsThesisStatusFilter: TranslationsThesisStatusFilter;
    translationsThesisTypeFilter: TranslationsThesisTypeFilter;
  };
}

const ThesisActions = ({ translations }: Props) => {
  const [resetKey, setResetKey] = useState(0); // State für den Schlüssel
  const router = useRouter();
  const {
    translationsThesisAction,
    translationsThesisAssignFilter,
    translationsThesisSearchFilter,
    translationsThesisStatusFilter,
    translationsThesisTypeFilter,
  } = translations;

  const { filter, new: newTranslation, resetFilter } = translationsThesisAction;

  const handleResetFilter = () => {
    // Erhöhe den Schlüssel, um die Komponente neu zu laden
    setResetKey((prevKey) => prevKey + 1);

    router.push("/thesis/list");
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
            <ThesisSearchFilter
              key={resetKey}
              translations={translationsThesisSearchFilter}
            />
          </Flex>
          <Flex justify="center" my="3" gap="3" className="flex-wrap">
            <ThesisTypeFilter translations={translationsThesisTypeFilter} />
            <ThesisStatusFilter translations={translationsThesisStatusFilter} />
            <ThesisAssignFilter translations={translationsThesisAssignFilter} />
          </Flex>
          <Flex justify="center">
            <Button
              onClick={handleResetFilter}
              variant="surface"
              color="red"
              className="justify-center"
            >
              {resetFilter}
            </Button>
          </Flex>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href="/thesis/new">{newTranslation}</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default ThesisActions;
