"use client";
import ErrorMessage from "@/app/[locale]/components/ErrorMessage";
import Spinner from "@/app/[locale]/components/Spinner";
import { Level } from "@/app/[locale]/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status, Thesis } from "@prisma/client";
import { Button, Callout, Grid, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

interface Translations {
  selectStatus: string;
  open: string;
  inProgress: string;
  registered: string;
  submitted: string;
  defended: string;
  cancelled: string;
  closed: string;
  selectLevel: string;
  pProject: string;
  bachelor: string;
  master: string;
  title: string;
  description: string;
  startDate: string;
  applicationDate: string;
  submissionDate: string;
  update: string;
  create: string;

  titleMinValidationMessage: string;
  titleMaxValidationMessage: string;
  typeValidationMessage: string;
  descriptionMinValidationMessage: string;
  descriptionMaxValidationMessage: string;
}

interface Props {
  thesis?: Thesis;
  translations: Translations;
}

const ThesisForm = ({ thesis, translations }: Props) => {
  const router = useRouter();
  const {
    descriptionMaxValidationMessage,
    descriptionMinValidationMessage,
    titleMaxValidationMessage,
    titleMinValidationMessage,
    typeValidationMessage,
  } = translations;
  const thesisSchema = z.object({
    title: z
      .string()
      .min(1, titleMinValidationMessage)
      .max(255, titleMaxValidationMessage),
    description: z
      .string()
      .min(1, descriptionMinValidationMessage)
      .max(65535, descriptionMaxValidationMessage),
    level: z.enum(["P_PROJECT", "BACHELOR", "MASTER"], {
      errorMap: (issue, ctx) => {
        return { message: typeValidationMessage };
      },
    }),
    status: z.enum([
      "OPEN",
      "REGISTERED",
      "IN_PROGRESS",
      "SUBMITED",
      "DEFENDED",
      "CANCELLED",
      "CLOSED",
    ]),
    startDate: z.string(),
    applicationDate: z.string(),
    submitionDate: z.string(),
  });

  type ThesisFormData = z.infer<typeof thesisSchema>;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ThesisFormData>({
    resolver: zodResolver(thesisSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    selectStatus,
    open,
    inProgress,
    registered,
    submitted,
    defended,
    cancelled,
    closed,
    selectLevel,
    pProject,
    bachelor,
    master,
    title,
    description,
    startDate,
    applicationDate,
    submissionDate,
    update,
    create,
  } = translations;

  const thesisLevel = [
    { label: `${selectLevel}..`, value: "" },
    { label: pProject, value: `${Level.P_PROJECT}` },
    { label: bachelor, value: `${Level.BACHELOR}` },
    { label: master, value: `${Level.MASTER}` },
  ];

  const thesisStatus = [
    { label: `${selectStatus}..`, value: "" },
    { label: open, value: `${Status.OPEN}` },
    { label: registered, value: `${Status.REGISTERED}` },
    { label: inProgress, value: `${Status.IN_PROGRESS}` },
    { label: submitted, value: `${Status.SUBMITED}` },
    { label: defended, value: `${Status.DEFENDED}` },
    { label: cancelled, value: `${Status.CANCELLED}` },
    { label: closed, value: `${Status.CLOSED}` },
  ];

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            {
              /**
               * alert(JSON.stringify(data));
               * console.log(data);
               */
            }

            if (thesis) {
              await axios.patch("/api/thesis/" + thesis.id, data);
              router.push("/thesis/" + thesis?.id);
            } else {
              await axios.post("/api/thesis", data);
              router.push("/thesis/list");
            }

            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occured.");
          }
        })}
      >
        {/**Tittle */}
        <TextField.Root>
          <TextField.Input
            defaultValue={thesis?.title}
            placeholder={title}
            {...register("title")}
          />
        </TextField.Root>

        {/**Tittle error message*/}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/**Type */}

        <Grid columns={{ initial: "1", sm: "2" }} gap="5" align="center">
        <label htmlFor="level-select" className="sr-only">{selectLevel}</label>

          <select
            id="level-select"
            defaultValue={thesis?.level}
            className="bg-white border border-gray-300 rounded"
            {...register("level")}
          >
            {thesisLevel.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-center mx-auto"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ErrorMessage>{errors.level?.message}</ErrorMessage>

          <label htmlFor="status-select" className="sr-only">{selectStatus}</label>
          <select
            id="status-select"
            defaultValue={thesis?.status}
            className="bg-white border border-gray-300 rounded"
            {...register("status")}
          >
            {thesisStatus.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-center mx-auto"
              >
                {option.label}
              </option>
            ))}
          </select>
        </Grid>

        {/**Description*/}
        <Controller
          name="description"
          control={control}
          defaultValue={thesis?.description}
          render={({ field }) => (
            <SimpleMDE placeholder={description} {...field} />
          )}
        />

        {/**Description error message */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Grid columns={{ initial: "1", sm: "3" }} align="center">
          <Text className="font-semibold">{`${startDate}:`}</Text>
          <TextField.Root>
            <TextField.Input
              type="date"
              defaultValue={thesis?.startDate ? thesis?.startDate : ""}
              {...register("startDate")}
              className="text-center mx-auto"
            />
          </TextField.Root>
        </Grid>

        <Grid columns={{ initial: "1", sm: "3" }} align="center">
          <Text className="font-semibold">{`${applicationDate}:`}</Text>
          <TextField.Root>
            <TextField.Input
              type="date"
              defaultValue={
                thesis?.applicationDate ? thesis?.applicationDate : ""
              }
              {...register("applicationDate")}
              className="text-center mx-auto"
            />
          </TextField.Root>
        </Grid>

        <Grid columns={{ initial: "1", sm: "3" }} align="center">
          <Text className="font-semibold">{`${submissionDate}:`}</Text>
          <TextField.Root>
            <TextField.Input
              type="date"
              defaultValue={thesis?.submitionDate ? thesis?.submitionDate : ""}
              {...register("submitionDate")}
              className="text-center mx-auto"
            />
          </TextField.Root>
        </Grid>

        {/**Submit Button */}
        <Button disabled={isSubmitting}>
          {thesis ? update : create}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ThesisForm;
