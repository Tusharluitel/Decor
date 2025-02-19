import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  meta: Record<string, number>;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const [buttonsArray, setButtonsArray] = useState<(number | string)[]>([]);

  const updateVisiblePages = (page: number) => {
    let pages: (number | string)[] = [];

    if (meta.last_page <= 6) {
      pages = Array.from({ length: meta.last_page }, (_, index) => index + 1);
    } else {
      // Reset the pages array
      pages = [];

      pages.push(1);

      if (page > 4) {
        pages.push("start-ellipsis");
      }

      const startPage = Math.max(Math.min(page - 2, meta.last_page - 5), 2);
      const endPage = Math.min(startPage + 4, meta.last_page - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < meta.last_page - 1) {
        pages.push("end-ellipsis");
      }

      pages.push(meta.last_page);
    }

    setButtonsArray(pages);
  };

  const renderPageNumbers = () => {
    return buttonsArray.map((button, index) => {
      if (button === "start-ellipsis" || button === "end-ellipsis") {
        return (
          <span
            key={`${button}-${index}`}
            // onClick={() => handleEllipsisClick(button as string)}
            className="px-1 md:px-2 py-1"
          >
            ...
          </span>
        );
      } else {
        return (
          <button
            key={`page-${button}`}
            onClick={() => onPageChange(button as number)}
            className={`px-1 md:px-2 py-1 border border-transparent transition-all min-w-6 hover:bg-gray-200 p-2 rounded-sm ${
              button === meta.current_page
                ? "bg-primary text-white "
                : "hover:border-primary"
            }`}
          >
            {button}
          </button>
        );
      }
    });
  };

  useEffect(() => {
    updateVisiblePages(meta.current_page);
  }, [meta.current_page, meta.last_page]);
  return (
    <>
      {meta.current_page === 1 && meta.last_page === 1 ? (
        ""
      ) : (
        <div className="mt-8 flex md:flex-row flex-col gap-4 justify-center  items-center">
          {/* <span className="text-sm text-gray-400">
            Showing {meta.from} to {meta.to} of {meta.total} entries.
          </span> */}

          <div className="flex items-center">
            <button
              disabled={meta.current_page - 1 <= 0}
              onClick={() => onPageChange(meta.current_page - 1)}
              className="text-sm hover:bg-gray-200 p-2 rounded-sm"
            >
              <ChevronLeft className="h-3 cursor-pointer inline " />

              <span className="md:inline hidden">Previous</span>
            </button>
            <div className="flex items-center justify-center gap-1 md:gap-2 text-sm md:mx-2">
              {renderPageNumbers()}
            </div>
            <button
              disabled={meta.current_page >= meta.last_page}
              onClick={() => onPageChange(meta.current_page + 1)}
              className="text-sm hover:bg-gray-200 p-2 rounded-sm"
            >
              <span className="md:inline hidden">Next</span>
              <ChevronRight className="h-3 cursor-pointer inline " />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
