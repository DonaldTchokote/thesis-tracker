import { useTranslate } from "@/app/Translations";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditThesisButton = ({ thesisId }: { thesisId: number }) => {
  const translations = {
    edit: useTranslate("thesis.id.editThesisButton.edit"),
  };
  const { edit } = translations;
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/thesis/edit/${thesisId}`}>{edit}</Link>
    </Button>
  );
};

export default EditThesisButton;
