import { Post } from "./post";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  password?: string;
  posts: Post[];
};

export type PaginatedUsers = {
  users: User[];
  currentPage: number;
  totalPages: number;
  total: number;
};


export type ErrorUser = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}