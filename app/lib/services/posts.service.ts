import { PostResponse, PostsResponse } from "@/app/types/post";
import { httpGet, httpPost, httpPut, httpDelete } from "../http/client";

const BASE_URL = "/api/posts";

export const postsService = {

  getBySlug(slug: string): Promise<PostResponse> {
    return httpGet(`${BASE_URL}/${slug}`);
  },

  getById(id: number): Promise<PostResponse> {
    return httpGet(`${BASE_URL}/edit/${id}`);
  },

  getFeatured(): Promise<PostsResponse> {
    return httpGet(`${BASE_URL}/feature`);
  },

  getPopular(): Promise<PostsResponse> {
    return httpGet(`${BASE_URL}/popular`);
  },

  getAll(
    page: number = 1,
    limit: number = 6,
    search: string = ""
  ): Promise<PostsResponse> {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
    }).toString();

    return httpGet(`${BASE_URL}?${query}`);
  },


  create(data: unknown) {
    return httpPost(BASE_URL, data);
  },


  update(id: number, data: unknown) {
    return httpPut(`${BASE_URL}/${id}`, data);
  },


  delete(id: number) {
    return httpDelete(`${BASE_URL}/${id}`);
  },
};
