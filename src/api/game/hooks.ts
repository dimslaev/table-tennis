import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { Game, GameCreate, GameUpdate } from "@/api/game/types";
import * as gameService from "@/api/game/service";
import { QUERY_KEYS } from "@/api/constants";

export const useGetGames = (
  options?: Omit<UseQueryOptions<Game[]>, "queryKey" | "queryFn">
) => {
  return useQuery<Game[]>({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: gameService.getAll,
    ...options,
  });
};

export const useGetGame = (
  id: Game["id"],
  options?: Omit<UseQueryOptions<Game>, "queryKey" | "queryFn">
) => {
  return useQuery<Game>({
    queryKey: [QUERY_KEYS.GAMES, id],
    queryFn: () => gameService.get(id),
    ...options,
  });
};

export const useCreateGame = (
  options?: Omit<UseMutationOptions<Game, unknown, GameCreate>, "mutationFn">
) => {
  return useMutation({
    mutationFn: gameService.create,
    ...options,
  });
};

export const useUpdateGame = (
  options?: Omit<UseMutationOptions<Game, unknown, GameUpdate>, "mutationFn">
) => {
  return useMutation({
    mutationFn: gameService.update,
    ...options,
  });
};

export const useRemoveGame = (
  options?: Omit<UseMutationOptions<void, unknown, Game["id"]>, "mutationFn">
) => {
  return useMutation({
    mutationFn: gameService.remove,
    ...options,
  });
};
