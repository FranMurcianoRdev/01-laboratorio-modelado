export const paginate = (data: any[], page: number, limit: number) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page > totalPages ? totalPages : page;
  const paginatedData = data.slice((currentPage - 1) * limit, currentPage * limit);

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    totalItems,
  };
};
