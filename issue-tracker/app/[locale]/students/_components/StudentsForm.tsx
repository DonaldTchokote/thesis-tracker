"use client";

import ErrorMessage from "@/app/[locale]/components/ErrorMessage";
import Spinner from "@/app/[locale]/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "@prisma/client";
import {
  Button,
  Callout,
  Card,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Translations {
  firstname: string;
  lastname: string;
  matriculation: string;
  email: string;
  update: string;
  create: string;

  firstnameMinValidationMessage: string;
  firstnameMaxValidationMessage: string;
  lastnameMinValidationMessage: string;
  lastnameMaxValidationMessage: string;
  matriculationMinValidationMessage: string;
  matriculationMaxValidationMessage: string;
  matriculationRefineValidationMessage: string;
  emailValidationMessage: string;
}
interface Props {
  student?: Student;
  translations: Translations;
}

const StudentsForm = ({ student, translations }: Props) => {
  const router = useRouter();
  const {
    firstnameMaxValidationMessage,
    firstnameMinValidationMessage,
    lastnameMaxValidationMessage,
    lastnameMinValidationMessage,
    matriculationMaxValidationMessage,
    matriculationMinValidationMessage,
    matriculationRefineValidationMessage,
    emailValidationMessage,
  } = translations;

  const studentSchema = z.object({
    firstName: z
      .string()
      .min(1, firstnameMinValidationMessage)
      .max(50, firstnameMaxValidationMessage),
    lastName: z
      .string()
      .min(1, lastnameMinValidationMessage)
      .max(50, lastnameMaxValidationMessage),
    matrikel: z
      .string()
      .min(8, matriculationMinValidationMessage)
      .max(10, matriculationMaxValidationMessage)
      .refine((data) => /^\d+$/.test(data), {
        message: matriculationRefineValidationMessage,
      }),
    email: z
      .string()
      .optional()
      .refine(
        (value) =>
          value === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        {
          message: emailValidationMessage,
        }
      ),
  });

  type StudentsFormData = z.infer<typeof studentSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentsFormData>({
    resolver: zodResolver(studentSchema),
  });

  const [error, setError] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);
  const { firstname, lastname, matriculation, email, update, create } =
    translations;
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Card style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <form
          className="space-y-3"
          onSubmit={handleSubmit(async (data) => {
            try {
              console.log(data);
              setSubmitting(true);
              if (student) {
                await axios.patch("/api/students/" + student.id, data);
                router.push("/students/" + student?.id);
              } else {
                await axios.post("/api/students", data);
                router.push("/students/list");
              }

              router.refresh();
            } catch (error) {
              setSubmitting(false);
              setError("An unexepted error occured.");
            }
          })}
        >
          {/**First Name*/}
          <div>
            <Text>{firstname}</Text>
            <TextField.Root>
              <TextField.Input
                defaultValue={student?.firstName}
                placeholder={firstname}
                {...register("firstName")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
          </div>

          <Separator my="3" size="4" />
          <div>
            <Text>{lastname}</Text>
            <TextField.Root>
              <TextField.Input
                defaultValue={student?.lastName}
                placeholder={lastname}
                {...register("lastName")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
          </div>

          <Separator my="3" size="4" />
          <div>
            <Text>{matriculation}</Text>
            <TextField.Root>
              <TextField.Input
                defaultValue={student?.matrikel}
                placeholder={matriculation}
                {...register("matrikel")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.matrikel?.message}</ErrorMessage>
          </div>

          <Separator my="3" size="4" />
          <div>
            <Text>{email}</Text>
            <TextField.Root>
              <TextField.Input
                defaultValue={student?.email ?? ""}
                placeholder={email}
                {...register("email")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>

          {/**Submit Button */}
          <Button disabled={isSubmitting}>
            {student ? `${update}` : `${create}`}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StudentsForm;
