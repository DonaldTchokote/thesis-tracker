import dynamic from "next/dynamic";
import ThesisFormSkeleton from "./loading";
import { useTranslate } from "@/app/Translations";
const ThesisForm = dynamic(
  () => import("@/app/[locale]/thesis/_components/ThesisForm"),
  {
    ssr: false,
    loading: () => <ThesisFormSkeleton />,
  }
);
const NewThesisPage = () => {
  const translations = {
    selectStatus: useTranslate(
      "thesis.components.thesisForm.thesisStatus.selectStatus"
    ),
    open: useTranslate("thesis.components.thesisForm.thesisStatus.open"),
    inProgress: useTranslate(
      "thesis.components.thesisForm.thesisStatus.inProgress"
    ),
    registered: useTranslate(
      "thesis.components.thesisForm.thesisStatus.registered"
    ),
    submitted: useTranslate(
      "thesis.components.thesisForm.thesisStatus.submitted"
    ),
    defended: useTranslate(
      "thesis.components.thesisForm.thesisStatus.defended"
    ),
    cancelled: useTranslate(
      "thesis.components.thesisForm.thesisStatus.cancelled"
    ),
    closed: useTranslate("thesis.components.thesisForm.thesisStatus.closed"),
    selectLevel: useTranslate(
      "thesis.components.thesisForm.thesisLevel.selectLevel"
    ),
    pProject: useTranslate("thesis.components.thesisForm.thesisLevel.pProject"),
    bachelor: useTranslate("thesis.components.thesisForm.thesisLevel.bachelor"),
    master: useTranslate("thesis.components.thesisForm.thesisLevel.master"),
    title: useTranslate("thesis.components.thesisForm.title"),
    description: useTranslate("thesis.components.thesisForm.description"),
    startDate: useTranslate("thesis.components.thesisForm.startDate"),
    applicationDate: useTranslate(
      "thesis.components.thesisForm.applicationDate"
    ),
    submissionDate: useTranslate("thesis.components.thesisForm.submissionDate"),
    update: useTranslate("thesis.components.thesisForm.update"),
    create: useTranslate("thesis.components.thesisForm.create"),
    titleMinValidationMessage: useTranslate(
      "thesis.validationSchema.titleValidationMessage.min"
    ),
    titleMaxValidationMessage: useTranslate(
      "thesis.validationSchema.titleValidationMessage.max"
    ),
    typeValidationMessage: useTranslate(
      "thesis.validationSchema.typeValidationMessage"
    ),
    descriptionMaxValidationMessage: useTranslate(
      "thesis.validationSchema.descriptionValidationMessage.max"
    ),
    descriptionMinValidationMessage: useTranslate(
      "thesis.validationSchema.descriptionValidationMessage.min"
    ),
  };
  return <ThesisForm translations={translations} />;
};

export default NewThesisPage;
