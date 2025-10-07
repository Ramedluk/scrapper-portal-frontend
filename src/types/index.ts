export interface IGridDataProps<T> {
  items: T[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}
