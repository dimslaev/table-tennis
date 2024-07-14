import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Statistics } from "@/api/statistics/types";
import * as statisticsService from "@/api/statistics/service";
import { QUERY_KEYS } from "@/api/constants";

export const useGetStatistics = (
  options?: Omit<UseQueryOptions<Statistics[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Statistics[]>({
    queryKey: [QUERY_KEYS.PLAYERS],
    queryFn: statisticsService.getAll,
    ...options,
  });
};
