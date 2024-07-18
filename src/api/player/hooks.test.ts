import { vi, describe, test, expect } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import * as playerService from "@/api/player/service";
import * as playerHooks from "@/api/player/hooks";
import playerMock from "@/api/player/mocks/get-player.json";
import playersMock from "@/api/player/mocks/get-players.json";
import { QueryProvider } from "@/providers/QueryProvider";

describe("player", () => {
  test("useGetPlayers", async () => {
    vi.spyOn(playerService, "getAll").mockResolvedValue(playersMock);
    const { result } = renderHook(() => playerHooks.useGetPlayers(), {
      wrapper: QueryProvider,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(playersMock);
    });
  });

  test("useGetPlayer", async () => {
    vi.spyOn(playerService, "get").mockResolvedValue(playerMock);
    const { result } = renderHook(
      () => playerHooks.useGetPlayer(playerMock.id),
      {
        wrapper: QueryProvider,
      }
    );
    await waitFor(() => {
      expect(result.current.data).toEqual(playerMock);
    });
  });

  test("useCreatePlayer", async () => {
    vi.spyOn(playerService, "create").mockResolvedValue(playerMock);
    const { result } = renderHook(() => playerHooks.useCreatePlayer(), {
      wrapper: QueryProvider,
    });
    result.current.mutate(playerMock);
    await waitFor(() => {
      expect(result.current.data).toEqual(playerMock);
    });
  });

  test("useUpdatePlayer", async () => {
    vi.spyOn(playerService, "update").mockResolvedValue(playerMock);
    const { result } = renderHook(() => playerHooks.useUpdatePlayer(), {
      wrapper: QueryProvider,
    });
    result.current.mutate(playerMock);
    await waitFor(() => {
      expect(result.current.data).toBe(playerMock);
    });
  });

  test("useRemovePlayer", async () => {
    vi.spyOn(playerService, "remove").mockResolvedValue(undefined);
    const { result } = renderHook(() => playerHooks.useRemovePlayer(), {
      wrapper: QueryProvider,
    });
    result.current.mutate(playerMock.id);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
