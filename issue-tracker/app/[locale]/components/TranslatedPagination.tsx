import { useTranslate } from "@/app/Translations";
import Pagination from "./Pagination";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const TranslatedPagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const translations = {
    page: useTranslate("components.pagination.page"),
    of: useTranslate("components.pagination.of"),
  };

  return (
    <div>
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={currentPage}
        translations={translations}
      />
    </div>
  );
};

export default TranslatedPagination;
