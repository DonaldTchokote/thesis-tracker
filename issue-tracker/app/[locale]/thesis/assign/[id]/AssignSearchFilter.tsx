"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Translations {
  placeholder: string;
}

interface Props {
  thesisId: number;
  translations: Translations;
}
const AssignSearchFilter = ({ thesisId, translations }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState("");
  const { placeholder } = translations;

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setFilterText(searchParams.get("name") || "");
  }, [searchParams]);
  return (
    <TextField.Root
      defaultValue={searchParams.get("name") || filterText}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = event.target.value;
        setFilterText(filterText);
        const params = new URLSearchParams();
        if (filterText) {
          params.append("name", filterText);
        }
        if (searchParams.get("assignOption"))
          params.append("assignOption", searchParams.get("assignOption")!);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("dir"))
          params.append("dir", searchParams.get("dir")!);
        if (searchParams.get("pageSize"))
          params.append("pageSize", searchParams.get("pageSize")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/thesis/assign/${thesisId.toString()}` + query);
      }}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder={placeholder} defaultValue={filterText} />
    </TextField.Root>
  );
};

export default AssignSearchFilter;
