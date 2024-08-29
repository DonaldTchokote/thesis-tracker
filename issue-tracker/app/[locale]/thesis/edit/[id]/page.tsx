import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ThesisFormSkeleton from "./loading";
import { useTranslateAsync } from "@/app/Translations";

const ThesisForm = dynamic(
  () => import("@/app/[locale]/thesis/_components/ThesisForm"),
  {
    ssr: false,
    loading: () => <ThesisFormSkeleton />,
  }
);

interface Props {
  params: { id: string };
}

const EditThesisPage = async ({ params }: Props) => {
  const thesis = await prisma.thesis.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!thesis) notFound();

  const translations = {
    selectStatus: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.selectStatus"
    ),
    open: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.open"
    ),
    inProgress: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.inProgress"
    ),
    registered: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.registered"
    ),
    submitted: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.submitted"
    ),
    defended: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.defended"
    ),
    cancelled: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.cancelled"
    ),
    closed: await useTranslateAsync(
      "thesis.components.thesisForm.thesisStatus.closed"
    ),
    selectLevel: await useTranslateAsync(
      "thesis.components.thesisForm.thesisLevel.selectLevel"
    ),
    pProject: await useTranslateAsync(
      "thesis.components.thesisForm.thesisLevel.pProject"
    ),
    bachelor: await useTranslateAsync(
      "thesis.components.thesisForm.thesisLevel.bachelor"
    ),
    master: await useTranslateAsync(
      "thesis.components.thesisForm.thesisLevel.master"
    ),
    title: await useTranslateAsync("thesis.components.thesisForm.title"),
    description: await useTranslateAsync(
      "thesis.components.thesisForm.description"
    ),
    startDate: await useTranslateAsync(
      "thesis.components.thesisForm.startDate"
    ),
    applicationDate: await useTranslateAsync(
      "thesis.components.thesisForm.applicationDate"
    ),
    submissionDate: await useTranslateAsync(
      "thesis.components.thesisForm.submissionDate"
    ),
    update: await useTranslateAsync("thesis.components.thesisForm.update"),
    create: await useTranslateAsync("thesis.components.thesisForm.create"),

    titleMinValidationMessage: await useTranslateAsync(
      "thesis.validationSchema.titleValidationMessage.min"
    ),
    titleMaxValidationMessage: await useTranslateAsync(
      "thesis.validationSchema.titleValidationMessage.max"
    ),
    typeValidationMessage: await useTranslateAsync(
      "thesis.validationSchema.typeValidationMessage"
    ),
    descriptionMaxValidationMessage: await useTranslateAsync(
      "thesis.validationSchema.descriptionValidationMessage.max"
    ),
    descriptionMinValidationMessage: await useTranslateAsync(
      "thesis.validationSchema.descriptionValidationMessage.min"
    ),
  };

  return <ThesisForm translations={translations} thesis={thesis} />;
};

export default EditThesisPage;
