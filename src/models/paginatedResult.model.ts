export interface PaginatedResult<T> {
    data: T[];
    total: number;
    pageNumber: number;
    totalPages: number;
}
