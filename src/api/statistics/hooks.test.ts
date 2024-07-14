import { vi, describe, test, expect } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import * as statisticsService from "@/api/statistics/service";
import * as statisticsHooks from "@/api/statistics/hooks";
import statisticsMock from "@/api/statistics/mocks/get-statistics.json";
import { QueryProvider } from "@/providers/QueryProvider";

describe("statistics", () => {
  test("useGetStatistics", async () => {
    vi.spyOn(statisticsService, "getAll").mockResolvedValue(statisticsMock);
    const { result } = renderHook(() => statisticsHooks.useGetStatistics(), {
      wrapper: QueryProvider,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(statisticsMock);
    });
  });
});
