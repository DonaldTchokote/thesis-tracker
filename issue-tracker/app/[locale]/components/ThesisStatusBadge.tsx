import { useTranslate } from "@/app/Translations";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const ThesisStatusBadge = ({ status }: { status: Status }) => {
  const openLabel = useTranslate("components.thesisStatusBadge.levels.open");
  const inProgressLabel = useTranslate(
    "components.thesisStatusBadge.levels.inProgress"
  );
  const registerdLabel = useTranslate(
    "components.thesisStatusBadge.levels.registered"
  );
  const submittedLabel = useTranslate(
    "components.thesisStatusBadge.levels.submitted"
  );
  const defendedLabel = useTranslate(
    "components.thesisStatusBadge.levels.defended"
  );
  const cancelledLabel = useTranslate(
    "components.thesisStatusBadge.levels.cancelled"
  );
  const closedLabel = useTranslate(
    "components.thesisStatusBadge.levels.closed"
  );

  const statusMap: Record<
    Status,
    {
      label: string;
      color: "blue" | "yellow" | "green" | "orange" | "violet" | "gray" | "red";
    }
  > = {
    OPEN: { label: openLabel, color: "blue" },
    IN_PROGRESS: { label: inProgressLabel, color: "yellow" },
    REGISTERED: { label: registerdLabel, color: "orange" },
    SUBMITED: { label: submittedLabel, color: "violet" },
    DEFENDED: { label: defendedLabel, color: "gray" },
    CANCELLED: { label: cancelledLabel, color: "red" },
    CLOSED: { label: closedLabel, color: "green" },
  };
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default ThesisStatusBadge;
