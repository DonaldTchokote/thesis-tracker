"use client";

import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

interface Translations {
  action: string;
  confirmation: string;
}

const SignOut = ({ translations }: { translations: Translations }) => {
  const { action, confirmation } = translations;
  const handleSignout = async () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-white shadow-md rounded-lg p-4 max-w-sm">
        <Flex gap="2" direction="column" align="center">
          <Flex gap="3" direction="column" align="center">
            <Text className="text-3xl font-bold" as="p">
              {action}
            </Text>
            <Text className="text-gray-700" as="p">
              {`${confirmation}?`}
            </Text>
          </Flex>
          <Flex gap="3" align="center">
            <Button color="red" onClick={handleSignout}>
              {action}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default SignOut;
