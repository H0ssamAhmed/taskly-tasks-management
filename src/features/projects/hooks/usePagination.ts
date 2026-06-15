import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const [currentpage, setCurrenPage] = useState(searchparams.get("page") || 1);
  const [limit, setLimit] = useState(searchparams.get("limmit") || 10);

  const handleChangeQuery = ({
    page,
    limit = "10",
  }: {
    page: string;
    limit?: string;
  }) => {
    setCurrenPage(page);
    setLimit(limit);
    setSearchParams({ limit, page });
  };

  return {
    currentpage,
    limit,
    handleChangeQuery,
  };
};

export default usePagination;
