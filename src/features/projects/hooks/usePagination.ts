import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
interface Props {
  data?: string;
}
export const usePagination = ({ data = "0-0/*" }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentpage, setCurrenPage] = useState(searchParams.get("page") || 1);
  const [limit, setLimit] = useState(searchParams.get("limmit") || 10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState("");

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(Number(data?.split("/")[1]) / Number(limit)));
      setTotalCount(data?.split("/")[1]);
    }
  }, []);
  const handleChangeQuery = ({
    page,
    limit: newLimit = "10",
  }: {
    page: string;
    limit?: string;
  }) => {
    setCurrenPage(page);
    setLimit(newLimit);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    newSearchParams.set("limit", newLimit);
    setSearchParams(newSearchParams);
  };
  return {
    currentpage,
    limit: limit > totalCount ? totalCount : limit,
    handleChangeQuery,
    totalPages,
  };
};

export default usePagination;
