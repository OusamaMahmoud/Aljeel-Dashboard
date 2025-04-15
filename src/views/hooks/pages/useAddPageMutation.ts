import { useMutation, useQueryClient } from "@tanstack/react-query";
import handlingErrorOnStatusCode from "../../services/handlingErrorOnStatusCode";
import { AddProjectResponse } from "../../api/projectsApi";
import { addPageMutation } from "../../api/pagesApi";
import { showToast } from "../../services/ShowToast";

// Custom hook for deleting a project
export const useAddPageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddProjectResponse, Error, any>({
    mutationFn: addPageMutation,
    onSuccess: () => {
      // Invalidate the projects query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["pages"],
      });

      // Show a success message
      showToast("Page has been added successfully!", "success");
    },
    onError: (error: unknown) => {
      // Show a user-friendly error message
      showToast(handlingErrorOnStatusCode(error), "error");
    },
  });
};
