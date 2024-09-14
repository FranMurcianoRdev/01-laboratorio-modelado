// src/helpers/paginationHelper.test.ts

import { paginate } from '../helpers/paginationHelper';

describe('paginationHelper', () => {
  it('should return paginated data with correct currentPage, totalPages, and totalItems', () => {
    const items = Array.from({ length: 50 }, (_, i) => i + 1); // Array con 50 elementos
    const page = 2;
    const pageSize = 10;

    const result = paginate(items, page, pageSize);

    expect(result.data.length).toBe(pageSize);  // Debería tener 10 elementos en la página 2
    expect(result.currentPage).toBe(page);  // Debería ser la página 2
    expect(result.totalPages).toBe(5);  // 50 elementos en total, 10 por página => 5 páginas
    expect(result.totalItems).toBe(50);  // Debería tener 50 elementos en total
  });

  it('should return correct pagination when page is the last one', () => {
    const items = Array.from({ length: 45 }, (_, i) => i + 1); // Array con 45 elementos
    const page = 5;
    const pageSize = 10;

    const result = paginate(items, page, pageSize);

    expect(result.data.length).toBe(5);  // La última página tiene solo 5 elementos
    expect(result.currentPage).toBe(page);  // Página 5
    expect(result.totalPages).toBe(5);  // Debería haber 5 páginas en total
    expect(result.totalItems).toBe(45);  // 45 elementos en total
  });

  it('should return empty array if page is out of range', () => {
    const items = Array.from({ length: 20 }, (_, i) => i + 1); // Array con 20 elementos
    const page = 3;  // No hay página 3
    const pageSize = 10;

    const result = paginate(items, page, pageSize);

    expect(result.data.length).toBe(0); 
    expect(result.currentPage).toBe(page); 
    expect(result.totalPages).toBe(2);  
    expect(result.totalItems).toBe(20);  
  });
});
