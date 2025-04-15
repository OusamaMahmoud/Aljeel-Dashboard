import { useQuery } from "@tanstack/react-query";
import { Blogs, getBlog } from "../../api/blogsApi";

export const useFetchBlog = (blogId: string) => {
  return useQuery<Blogs>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlog(blogId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!blogId,
  });
};
