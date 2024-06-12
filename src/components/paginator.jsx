import { Pagination } from "@nextui-org/react";

export default function Paginator({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-small text-default-500">
      </p>
      <Pagination
        total={totalPages}
        color="warning"
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}
