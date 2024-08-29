import { useTranslate } from "@/app/Translations";
import { Status } from "@prisma/client";
import {
  CheckIcon,
  Cross1Icon,
  DotsHorizontalIcon,
  LockClosedIcon,
  LockOpen1Icon,
  LockOpen2Icon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  registered: number;
  inProgress: number;
  submitted: number;
  defended: number;
  canceled: number;
  closed: number;
}

const ThesisSummary = ({
  open,
  registered,
  inProgress,
  submitted,
  defended,
  canceled,
  closed,
}: Props) => {
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
  const containers: {
    label: string;
    value: number;
    status: Status;
    fColor: string;
    tColor: string;
    icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >;
  }[] = [
    {
      label: openLabel,
      value: open,
      status: "OPEN",
      fColor: "from-blue-400",
      tColor: "to-blue-500",
      icon: LockOpen2Icon,
    },
    {
      label: registerdLabel,
      value: registered,
      status: "REGISTERED",
      fColor: "from-orange-400",
      tColor: "to-orange-500",
      icon: LockOpen1Icon,
    },
    {
      label: inProgressLabel,
      value: inProgress,
      status: "IN_PROGRESS",
      fColor: "from-yellow-400",
      tColor: "to-yellow-500",
      icon: DotsHorizontalIcon,
    },
  ];
  const containers2: {
    label: string;
    value: number;
    status: Status;
    fColor: string;
    tColor: string;
    icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >;
  }[] = [
    {
      label: submittedLabel,
      value: submitted,
      status: "SUBMITED",
      fColor: "from-violet-400",
      tColor: "to-violet-500",
      icon: PaperPlaneIcon,
    },
    {
      label: defendedLabel,
      value: defended,
      status: "DEFENDED",
      fColor: "from-gray-400",
      tColor: "to-gray-500",
      icon: CheckIcon,
    },
    {
      label: cancelledLabel,
      value: canceled,
      status: "CANCELLED",
      fColor: "from-red-400",
      tColor: "to-red-500",
      icon: Cross1Icon,
    },
    {
      label: closedLabel,
      value: closed,
      status: "CLOSED",
      fColor: "from-green-400",
      tColor: "to-green-500",
      icon: LockClosedIcon,
    },
  ];
  return (
    <Flex align="center" direction="column" gap="2">
      <Flex className="flex flex-wrap" mx="2">
        {containers.map((container) => (
          <Link
            key={container.label}
            className="text-sm font-medium"
            href={`/thesis/list?status=${container.status}`}
          >
            <Card mr="2" className="relative group hover-card">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${container.tColor} ${container.fColor} translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300`}
              />
              <Flex justify="center">
                <container.icon className="mb-2 text-2xl text-blue-600 group-hover:text-white group-hover:rotate-12 transition-colors relative z-10 duration-300" />
              </Flex>
              <Flex align="center" direction="column" gap="1">
                <Text className="font-medium text-sm text-slate-950 group-hover:text-white relative z-10 duration-300">
                  {container.label}
                </Text>
                <Text
                  size="4"
                  className="font-bold group-hover:text-violet-50 relative z-10 duration-300"
                >
                  {container.value}
                </Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
      <Flex className="flex flex-wrap" mx="2">
        {containers2.map((container) => (
          <Link
            key={container.label}
            className="text-sm font-medium"
            href={`/thesis/list?status=${container.status}`}
          >
            <Card mr="2" className="relative group hover-card">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${container.tColor} ${container.fColor} translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300`}
              />
              <Flex justify="center">
                <container.icon className="mb-2 text-2xl text-blue-600 group-hover:text-white group-hover:rotate-12 transition-colors relative z-10 duration-300" />
              </Flex>
              <Flex align="center" direction="column" gap="1">
                <Text className="font-medium text-sm text-slate-950 group-hover:text-white relative z-10 duration-300">
                  {container.label}
                </Text>
                <Text
                  size="4"
                  className="font-bold group-hover:text-violet-200 relative z-10 duration-300"
                >
                  {container.value}
                </Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default ThesisSummary;
