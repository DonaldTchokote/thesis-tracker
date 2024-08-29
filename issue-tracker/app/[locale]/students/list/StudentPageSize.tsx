"use client";
import { pageSizeOptions } from "@/app/[locale]/components/utils";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Translations {
  totalNumber: string;
}

interface Props {
  translations: Translations;
}

const StudentPageSize = ({ translations }: Props) => {
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
          if (searchParams.get("name"))
            params.append("name", searchParams.get("name")!);

          const query = params.size ? "?" + params.toString() : "";
          router.push("/students/list" + query);
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

export default StudentPageSize;
