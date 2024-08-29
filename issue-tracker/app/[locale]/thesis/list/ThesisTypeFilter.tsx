"use client";
import { Level } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TranslationsThesisTypeFilter } from "./ThesisActions";

const ThesisTypeFilter = ({
  translations,
}: {
  translations: TranslationsThesisTypeFilter;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [level, setLevel] = useState<string>(""); // Zustand für den aktuellen level

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setLevel(searchParams.get("level") || "");
  }, [searchParams]);
  const { bachelor, master, pProject, placeholder, all } = translations;

  const levels: { label: string; value?: Level }[] = [
    { label: all },
    { label: pProject, value: "P_PROJECT" },
    { label: bachelor, value: "BACHELOR" },
    { label: master, value: "MASTER" },
  ];
  return (
    <Select.Root
      value={searchParams.get("level") || level}
      onValueChange={(level) => {
        const params = new URLSearchParams();
        if (level) {
          params.append("level", level);
        }
        if (searchParams.get("title")) {
          params.append("title", searchParams.get("title")!);
        }
        if (searchParams.get("status")) {
          params.append("status", searchParams.get("status")!);
        }
        if (searchParams.get("assignOption")) {
          params.append("assignOption", searchParams.get("assignOption")!);
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
        {levels.map((level, index) => (
          <Select.Item key={index} value={level.value || " "}>
            {level.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ThesisTypeFilter;
