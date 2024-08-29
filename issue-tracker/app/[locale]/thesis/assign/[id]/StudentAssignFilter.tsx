"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";

interface Translations {
  all: string;
  assigned: string;
  unAssigned: string;
  placeholder: string;
}

interface Props {
  thesisId: number;
  translations: Translations;
}

const StudentAssignFilter = ({ thesisId, translations }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assignStatus, setAssignStatus] = useState<string>(""); // Zustand für den aktuellen Status
  const params = new URLSearchParams();

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setAssignStatus(searchParams.get("assignOption") || "");
  }, [searchParams]);

  const { all, assigned, placeholder, unAssigned } = translations;

  const filterOptions: {
    label: string;
    value?: "All" | "Assigned" | "Unassigned";
  }[] = [
    { label: all },
    { label: assigned, value: "Assigned" },
    { label: unAssigned, value: "Unassigned" },
  ];
  interface Props {
    thesisId: number;
  }
  return (
    <Select.Root
      value={searchParams.get("assignOption") || assignStatus}
      onValueChange={(assign) => {
        if (assign) {
          params.append("assignOption", assign);
        }
        if (searchParams.get("name"))
          params.append("name", searchParams.get("name")!);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("dir"))
          params.append("dir", searchParams.get("dir")!);
        if (searchParams.get("pageSize"))
          params.append("pageSize", searchParams.get("pageSize")!);
        if (searchParams.get("page"))
          params.append("page", searchParams.get("page")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/thesis/assign/${thesisId}` + query);
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

export default StudentAssignFilter;
