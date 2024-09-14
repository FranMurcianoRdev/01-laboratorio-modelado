export interface PaginationResult {
  data: any[];
  currentPage: number;
  totalPages: number;
  totalItems: number;  
}

export const paginate = (
  items: any[],
  page: number = 1,
  pageSize: number = 10
): PaginationResult => {
  const offset = (page - 1) * pageSize;
  const paginatedItems = items.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(items.length / pageSize);

  return {
    data: paginatedItems,
    currentPage: page,
    totalPages: totalPages,
    totalItems: items.length,
  };
};
