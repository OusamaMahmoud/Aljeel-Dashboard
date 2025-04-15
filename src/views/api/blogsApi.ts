import apiClient from "../services/api-client";
import { Meta, Pagination } from "../ui/Pagination";

export interface FetchTeamsResponse {
  data: {
    data: Blogs[];
    links: Pagination;
    meta: Meta;
  };
}

export interface FetchTeamResponse {
  data: Blogs;
}

export interface Blogs {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  text: {
    ar: string;
    en: string;
  };
  background: string;
  status: 0 | 1;
}

const Blogs_API_ENDPOINT = "/api/dashboard/blogs";

// API Functions
export const getBlogs = async (currentPage: string) => {
  const res = await apiClient.get<FetchTeamsResponse>(
    `${Blogs_API_ENDPOINT}?page=${currentPage}`
  );
  console.log("blogs=>", res.data.data.data);
  return res.data.data;
};

export const addBlogMutation = async ({
  formData,
  blogId,
}: {
  formData: FormData;
  blogId?: string;
}) => {
  // Make a POST request to delete the project
  const POST_END_POINT = blogId
    ? `${Blogs_API_ENDPOINT}/${blogId}`
    : Blogs_API_ENDPOINT;

  const res = await apiClient.post(POST_END_POINT, formData);
  console.log(res.data.data);
  return res.data.data;
};

// API Functions
export const getBlog = async (blogId: string) => {
  console.log("any Body Here ?", blogId);
  const res = await apiClient.get<FetchTeamResponse>(
    `${Blogs_API_ENDPOINT}/${blogId}`
  );
  console.log("coming from GET Team by ID: ", res.data.data);
  return res.data.data;
};

export const deleteBlogMutation = async (blogId: any) => {
  // Make a POST request to delete the project
  const res = await apiClient.post(`${Blogs_API_ENDPOINT}/${blogId}`, {
    _method: "delete",
  });
  return res.data.data;
};
