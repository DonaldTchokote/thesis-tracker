"use client";
import { Spinner } from "@/app/[locale]/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Translations {
  delete: string;
  confirmation: string;
  deleteWarning: string;
  cancel: string;
  cannotDeleteDialogTitle: string;
  cannotDelete: string;
  ok: string;
}
interface Props {
  studentId: string;
  numberOfThesiss: number;
  translations: Translations;
}
const DeleteStudentButton = ({
  studentId,
  numberOfThesiss,
  translations,
}: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const {
    delete: deleteTranslation,
    confirmation,
    deleteWarning,
    cancel,
    cannotDeleteDialogTitle,
    cannotDelete,
    ok,
  } = translations;
  const deleteStudent = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/students/" + studentId);
      router.push("/students/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button
            className={`flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm py-1 font-medium px-4 rounded ${
              isDeleting || numberOfThesiss > 0
                ? "disabled:bg-white disabled:text-gray-300"
                : ""
            }`}
            disabled={isDeleting || numberOfThesiss > 0}
          >
            <TrashIcon className="mr-1 text-lg" />
            <Text className="pr-3">{deleteTranslation}</Text>
            {isDeleting && <Spinner />}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>{confirmation}</AlertDialog.Title>
          <AlertDialog.Description>{deleteWarning}</AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                {cancel}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action color="red">
              <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm py-1 font-medium px-4 rounded"
                onClick={deleteStudent}
              >
                {deleteTranslation}
              </button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>{cannotDeleteDialogTitle}</AlertDialog.Title>
          <AlertDialog.Description>{cannotDelete}</AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            {ok}
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteStudentButton;
