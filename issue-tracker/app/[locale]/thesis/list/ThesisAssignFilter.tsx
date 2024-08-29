"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TranslationsThesisAssignFilter } from "./ThesisActions";

const ThesisAssignFilter = ({
  translations,
}: {
  translations: TranslationsThesisAssignFilter;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assignStatus, setAssignStatus] = useState<string>(""); // Zustand für den aktuellen Status
  const params = new URLSearchParams();

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setAssignStatus(searchParams.get("assignOption") || "");
  }, [searchParams]);
  const { all, assigned, unAssigned, placeholder } = translations;

  const filterOptions: {
    label: string;
    value?: "All" | "Assigned" | "Unassigned";
  }[] = [
    { label: all },
    { label: assigned, value: "Assigned" },
    { label: unAssigned, value: "Unassigned" },
  ];
  return (
    <Select.Root
      value={searchParams.get("assignOption") || assignStatus}
      onValueChange={(assign) => {
        if (assign) {
          params.append("assignOption", assign);
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
        if (searchParams.get("pageSize")) {
          params.append("pageSize", searchParams.get("pageSize")!);
        }

        const query = params.size ? "?" + params.toString() : "";
        router.push("/thesis/list" + query);
      }}
    >
      <Select.Trigger placeholder={`${placeholder}...`} />
      <Select.Content>
        {filterOptions.map((option, index) => (
          <Select.Item key={index} value={option.value || " "}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ThesisAssignFilter;
