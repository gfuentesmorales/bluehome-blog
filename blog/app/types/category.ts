export interface Category {
  id?: number;
  name: string;
  _count?: any;
}

export interface CategoryTableProps {
  categories: Category[];
  initialTotalPages: number;
  initialPage: number;
}

export interface CategoriesResponse {
  categories: Category[];
  totalPages: number;
  currentPage: number
}
