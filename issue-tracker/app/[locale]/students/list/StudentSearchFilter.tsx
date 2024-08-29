"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Translation {
  placeholder: string;
}

const StudentSearchFilter = ({ translation }: { translation: Translation }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState("");
  const { placeholder } = translation;

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
        if (searchParams.get("pageSize"))
          params.append("pageSize", searchParams.get("pageSize")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/students/list" + query);
      }}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder={placeholder} defaultValue={filterText} />
    </TextField.Root>
  );
};

export default StudentSearchFilter;
