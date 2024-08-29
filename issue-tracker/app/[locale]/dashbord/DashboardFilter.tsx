"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";

interface Translations {
  translations: {
    filterOptions: {
      label: string;
      value: "submitionDate" | "createdAt";
    }[];
    placeholder: string;
  };
}

const DashboardFilter = ({ translations }: Translations) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<string>(""); // Zustand für den aktuellen Status
  const params = new URLSearchParams();
  const { filterOptions, placeholder } = translations;

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setFilter(searchParams.get("orderBy") || "");
  }, [searchParams]);

  return (
    <>
      {" "}
      <Select.Root
        value={searchParams.get("orderBy") || filter}
        onValueChange={(filter) => {
          if (filter) {
            params.append("orderBy", filter);
          }
          if (searchParams.get("page")) {
            params.append("page", searchParams.get("page")!);
          }
          const query = params.size ? "?" + params.toString() : "";
          router.push("/dashbord/" + query);
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
    </>
  );
};

export default DashboardFilter;
