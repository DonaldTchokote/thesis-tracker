"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TranslationsThesisStatusFilter } from "./ThesisActions";

const ThesisStatusFilter = ({
  translations,
}: {
  translations: TranslationsThesisStatusFilter;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>(""); // Zustand für den aktuellen Status
  const params = new URLSearchParams();

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setStatus(searchParams.get("status") || "");
  }, [searchParams]);
  const {
    all,
    cancelled,
    closed,
    defended,
    inProgress,
    open,
    placeholder,
    registered,
    submitted,
  } = translations;

  const statuses: { label: string; value?: Status }[] = [
    { label: all },
    { label: open, value: "OPEN" },
    { label: registered, value: "REGISTERED" },
    { label: inProgress, value: "IN_PROGRESS" },
    { label: submitted, value: "SUBMITED" },
    { label: defended, value: "DEFENDED" },
    { label: cancelled, value: "CANCELLED" },
    { label: closed, value: "CLOSED" },
  ];
  return (
    <Select.Root
      value={searchParams.get("status") || status}
      onValueChange={(status) => {
        if (status) params.append("status", status);
        if (searchParams.get("title")) {
          params.append("title", searchParams.get("title")!);
        }
        if (searchParams.get("level")) {
          params.append("level", searchParams.get("level")!);
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
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ThesisStatusFilter;
