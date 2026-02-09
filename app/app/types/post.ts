export interface Post {
  id: number;
  title: string;
  subTitle?: string;
   slug?: string;
  content: string;
  image?: string | null;
  createdAt: string;
  updatedAt?: string;
  category?: {
    id: number;
    name: string;
  } | null;

  author?: {
    id: number;
    name: string;
  } | null;
  feature?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface PostsResponse {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export interface PostResponse {
  post: Post;
}