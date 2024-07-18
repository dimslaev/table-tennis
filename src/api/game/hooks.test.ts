import { vi, describe, test, expect } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import * as gameService from "@/api/game/service";
import * as gameHooks from "@/api/game/hooks";
import gameMock from "@/api/game/mocks/get-game.json";
import gamesMock from "@/api/game/mocks/get-games.json";
import { QueryProvider } from "@/providers/QueryProvider";

describe("game", () => {
  test("useGetGames", async () => {
    vi.spyOn(gameService, "getAll").mockResolvedValue(gamesMock);
    const { result } = renderHook(() => gameHooks.useGetGames(), {
      wrapper: QueryProvider,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(gamesMock);
    });
  });

  test("useGetGame", async () => {
    vi.spyOn(gameService, "get").mockResolvedValue(gameMock);
    const { result } = renderHook(() => gameHooks.useGetGame(gameMock.id), {
      wrapper: QueryProvider,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(gameMock);
    });
  });

  test("useCreateGame", async () => {
    vi.spyOn(gameService, "create").mockResolvedValue(gameMock);
    const { result } = renderHook(() => gameHooks.useCreateGame(), {
      wrapper: QueryProvider,
    });
    result.current.mutate(gameMock);
    await waitFor(() => {
      expect(result.current.data).toEqual(gameMock);
    });
  });

  test("useUpdateGame", async () => {
    vi.spyOn(gameService, "update").mockResolvedValue(gameMock);
    const { result } = renderHook(() => gameHooks.useUpdateGame(), {
      wrapper: QueryProvider,
    });
    result.current.mutate(gameMock);
    await waitFor(() => {
      expect(result.current.data).toBe(gameMock);
    });
  });

  test("useRemoveGame", async () => {
    vi.spyOn(gameService, "remove").mockResolvedValue(undefined);
    const { result } = renderHook(() => gameHooks.useRemoveGame(), {
      wrapper: QueryProvider,
    });
    result.current.mutate(gameMock.id);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
