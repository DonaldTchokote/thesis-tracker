"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TranslationsThesisSearchFilter } from "./ThesisActions";

const ThesisSearchFilter = ({
  translations,
}: {
  translations: TranslationsThesisSearchFilter;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState("");
  const { placeholder } = translations;

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setFilterText(searchParams.get("title") || "");
  }, [searchParams]);
  return (
    <TextField.Root
      defaultValue={searchParams.get("title") || filterText}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = event.target.value;
        setFilterText(filterText);
        const params = new URLSearchParams();
        if (filterText) {
          params.append("title", filterText);
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
        if (searchParams.get("assignOption")) {
          params.append("assignOption", searchParams.get("assignOption")!);
        }
        if (searchParams.get("pageSize")) {
          params.append("pageSize", searchParams.get("pageSize")!);
        }
        const query = params.size ? "?" + params.toString() : "";
        router.push("/thesis/list" + query);
      }}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input
        placeholder={`${placeholder}...`}
        defaultValue={filterText}
      />
    </TextField.Root>
  );
};

export default ThesisSearchFilter;
