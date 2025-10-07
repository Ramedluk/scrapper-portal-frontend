import React from "react";

export const usePagination = (limit = 5) => {
  const [page, setPage] = React.useState(1);

  return {
    limit,
    page,
    setPage,
  };
};
