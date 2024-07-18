import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { Player, PlayerCreate, PlayerUpdate } from "@/api/player/types";
import * as playerService from "@/api/player/service";
import { QUERY_KEYS } from "@/api/constants";

export const useGetPlayers = (
  options?: Omit<UseQueryOptions<Player[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Player[]>({
    queryKey: [QUERY_KEYS.PLAYERS],
    queryFn: playerService.getAll,
    ...options,
  });
};

export const useGetPlayer = (
  id: Player["id"],
  options?: Omit<UseQueryOptions<Player>, "queryKey" | "queryFn">
) => {
  return useQuery<Player>({
    queryKey: [QUERY_KEYS.PLAYERS, id],
    queryFn: () => playerService.get(id),
    ...options,
  });
};

export const useCreatePlayer = (
  options?: Omit<
    UseMutationOptions<Player, unknown, PlayerCreate>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: playerService.create,
    ...options,
  });
};

export const useUpdatePlayer = (
  options?: Omit<
    UseMutationOptions<Player, unknown, PlayerUpdate>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: playerService.update,
    ...options,
  });
};

export const useRemovePlayer = (
  options?: Omit<UseMutationOptions<void, unknown, Player["id"]>, "mutationFn">
) => {
  return useMutation({
    mutationFn: playerService.remove,
    ...options,
  });
};
