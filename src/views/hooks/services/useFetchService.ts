import { useQuery } from "@tanstack/react-query";
import { getService, Services } from "../../api/servicesApi";

export const useFetchService = (serviceId: string) => {
  return useQuery<Services>({
    queryKey: ["service", serviceId],
    queryFn: () => getService(serviceId),
    staleTime: 0, // Data will be considered fresh for 5 minutes
    retry: 3, // Retry the request up to 3 times on failure
    refetchOnWindowFocus: false, // Disable refetch when the window regains focus
    enabled: !!serviceId,
  });
};
