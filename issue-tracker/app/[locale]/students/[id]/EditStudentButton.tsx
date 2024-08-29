import { useTranslate } from "@/app/Translations";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditStudentButton = ({ id }: { id: string }) => {
  const translations = {
    edit: useTranslate("students.id.editStudentButton.edit"),
  };
  const { edit } = translations;

  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/students/edit/${id}`}>{edit}</Link>
    </Button>
  );
};

export default EditStudentButton;
