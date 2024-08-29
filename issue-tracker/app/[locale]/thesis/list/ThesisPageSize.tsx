"use client";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pageSizeOptions } from "../../components/utils";

interface Translations {
  totalNumber: string;
}

interface Props {
  translations: Translations;
}

const ThesisPageSize = ({ translations }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sizePerPage, setSizePerPage] = useState("10"); // Zustand für den aktuellen Status
  const params = new URLSearchParams();

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setSizePerPage(searchParams.get("pageSize") || "10");
  }, [searchParams]);
  const { totalNumber } = translations;
  return (
    <Flex align="center" gap="1" my="2">
      <Text>{`${totalNumber}:`}</Text>
      <Select.Root
        value={searchParams.get("pageSize") || sizePerPage.toString()}
        onValueChange={(pSize) => {
          if (pSize) {
            params.append("pageSize", pSize);
          }
          if (searchParams.get("assignOption")) {
            params.append("assignOption", searchParams.get("assignOption")!);
          }
          if (searchParams.get("title")) {
            params.append("title", searchParams.get("title")!);
          }
          if (searchParams.get("level")) {
            params.append("level", searchParams.get("level")!);
          }
          if (searchParams.get("status")) {
            params.append("status", searchParams.get("status")!);
          }
          if (searchParams.get("orderBy")) {
            params.append("orderBy", searchParams.get("orderBy")!);
          }

          const query = params.size ? "?" + params.toString() : "";
          router.push("/thesis/list/" + query);
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {pageSizeOptions.map((option, index) => (
            <Select.Item key={index} value={option.value?.toString() || "10"}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ThesisPageSize;
