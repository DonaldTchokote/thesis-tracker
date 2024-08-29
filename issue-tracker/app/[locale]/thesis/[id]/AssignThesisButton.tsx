import { useTranslate } from "@/app/Translations";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const AssignThesisButton = ({ thesisId }: { thesisId: number }) => {
  const translations = {
    assign: useTranslate("thesis.id.assignThesisButton.assign"),
  };
  const { assign } = translations;
  return (
    <>
      {" "}
      <Button variant="surface">
        <PersonIcon />
        <Link href={`/thesis/assign/${thesisId}`}>{assign}</Link>
      </Button>
    </>
  );
};

export default AssignThesisButton;
