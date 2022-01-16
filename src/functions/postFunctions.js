const customLabels = {
  totalDocs: "postCount",
  docs: "posts",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

export const generatePaginationOptions = ({ page, limit }) => {
  return {
    page: page || 1,
    limit: limit || 10,
    sort: {
      createdAt: -1,
    },
    populate: "author",
    customLabels: customLabels,
  };
};
