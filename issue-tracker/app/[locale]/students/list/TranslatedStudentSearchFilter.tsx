import { useTranslate } from "@/app/Translations";
import StudentSearchFilter from "./StudentSearchFilter";

const TranslatedStudentSearchFilter = () => {
  const translation = {
    placeholder: useTranslate("students.list.studentSearchFilter.placeholder"),
  };

  return (
    <>
      <StudentSearchFilter translation={translation} />
    </>
  );
};

export default TranslatedStudentSearchFilter;
