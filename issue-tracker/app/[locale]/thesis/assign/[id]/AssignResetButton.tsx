"use client";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Translations {
  reset: string;
}

interface Props {
  thesisId: number;
  translations: Translations;
}

const AssignResetButton = ({ thesisId, translations }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rst, setRst] = useState("0"); // Zustand für den aktuellen Status
  const params = new URLSearchParams();

  useEffect(() => {
    // Effekt zum Aktualisieren des Dropdown-Werts beim Ändern der URL-Parameter
    setRst(searchParams.get("rst") || "0");
  }, [searchParams]);
  const { reset } = translations;

  const handleResetFilter = () => {
    params.append("rst", (parseInt(rst) + 1).toString());
    const query = params.size ? "?" + params.toString() : "";
    router.push(`/thesis/assign/${thesisId}` + query);
  };
  return (
    <Button
      onClick={handleResetFilter}
      variant="surface"
      color="red"
      className="justify-center"
      mt="2"
    >
      {reset}
    </Button>
  );
};

export default AssignResetButton;
