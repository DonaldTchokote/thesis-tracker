import { Skeleton } from "@/app/[locale]/components";
import { Box, Separator, Text } from "@radix-ui/themes";
import React from "react";

const StudentFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Text>First Name</Text>
      <Skeleton height="2rem" />

      <Separator my="3" size="4" />

      <Text>Last Name</Text>
      <Skeleton height="2rem" />

      <Separator my="3" size="4" />

      <Text>Matrikel</Text>
      <Skeleton height="2rem" />

      <Separator my="3" size="4" />

      <Text>Email</Text>
      <Skeleton height="2rem" />

      <Skeleton height="2rem" width="10rem" />
    </Box>
  );
};

export default StudentFormSkeleton;
