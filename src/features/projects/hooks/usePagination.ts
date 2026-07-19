import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
interface Props {
  data?: string;
}
export const usePagination = ({ data = "0-0/*" }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentpage = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(Number(data?.split("/")[1]) / Number(limit)));
      setTotalCount(Number(data?.split("/")[1]));
    }
  }, [data, limit]);
  const handleChangeQuery = ({
    page,
    limit: newLimit = "10",
  }: {
    page: string;
    limit?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);
    params.set("limit", newLimit);

    setSearchParams(params);
  };
  return {
    currentpage,
    limit: Math.min(limit, Number(totalCount || 0)),
    handleChangeQuery,
    totalPages,
  };
};

export default usePagination;
