import { describe, test, expect } from "vitest";
import {
  getDatetimeInputValue,
  formatDate,
  validateScore,
  validateStartEndTimes,
  sortByRanking,
} from "@/utils/utils";

describe("getDatetimeInputValue", () => {
  test("should convert a valid date string to ISO string with timezone correction", () => {
    const input = "2024-07-21T15:30:00";
    const expectedOutput = "2024-07-21T15:30";
    expect(getDatetimeInputValue(input)).toBe(expectedOutput);
  });

  test("should handle date strings with different time zones correctly", () => {
    const input = "2024-07-21T15:30:00-05:00";
    const expectedOutput = "2024-07-21T22:30";
    expect(getDatetimeInputValue(input)).toBe(expectedOutput);
  });

  test("should use current date if no date provided", () => {
    expect(() => getDatetimeInputValue(undefined)).toHaveLength(16);
  });

  test("should handle UTC date strings correctly", () => {
    const input = "2024-07-21T15:30:00Z";
    const expectedOutput = "2024-07-21T17:30";
    expect(getDatetimeInputValue(input)).toBe(expectedOutput);
  });

  test("should handle date strings with milliseconds correctly", () => {
    const input = "2024-07-21T15:30:00.123";
    const expectedOutput = "2024-07-21T15:30";
    expect(getDatetimeInputValue(input)).toBe(expectedOutput);
  });

  test("should handle date strings with only date part correctly", () => {
    const input = "2024-07-21";
    const expectedOutput = "2024-07-21T00:00";
    expect(getDatetimeInputValue(input)).toBe(expectedOutput);
  });
});

describe("formatDate", () => {
  test("should format a valid ISO string correctly", () => {
    const input = "2024-07-21T15:30:00Z";
    const expectedOutput = "Jul 21, 2024 3:30 PM";
    expect(formatDate(input)).toBe(expectedOutput);
  });

  test("should format a valid ISO string with timezone offset correctly", () => {
    const input = "2024-07-21T15:30:00-05:00";
    const expectedOutput = "Jul 21, 2024 8:30 PM"; // Assuming the system timezone is UTC
    expect(formatDate(input)).toBe(expectedOutput);
  });
});

describe("validateScore", () => {
  test("should return false when the difference between scores is less than 2", () => {
    expect(validateScore(10, 9)).toBe(false);
    expect(validateScore(15, 14)).toBe(false);
    expect(validateScore(5, 4)).toBe(false);
  });

  test("should return false when both scores are less than 11", () => {
    expect(validateScore(5, 7)).toBe(false);
    expect(validateScore(10, 9)).toBe(false);
    expect(validateScore(8, 8)).toBe(false);
  });

  test("should return false when either score exceeds 11 but the difference is greater than 2", () => {
    expect(validateScore(14, 11)).toBe(false);
    expect(validateScore(20, 17)).toBe(false);
    expect(validateScore(25, 22)).toBe(false);
  });

  test("should return true for valid scores", () => {
    expect(validateScore(11, 9)).toBe(true);
    expect(validateScore(12, 10)).toBe(true);
    expect(validateScore(15, 13)).toBe(true);
  });
});

describe("sortByRanking", () => {
  test("should rank a player with a higher win/loss ratio above one with a lower ratio", () => {
    const playerA = { games_played: 10, games_won: 8, games_lost: 2 }; // 8/2 = 4
    const playerB = { games_played: 10, games_won: 6, games_lost: 4 }; // 6/4 = 1.5

    // @ts-expect-error missing properties
    expect(sortByRanking(playerA, playerB)).toBeLessThan(0); // playerA should rank higher
    // @ts-expect-error missing properties
    expect(sortByRanking(playerB, playerA)).toBeGreaterThan(0); // playerB should rank lower
  });

  test("should rank a player with more games played above one with fewer games if win/loss ratios are equal", () => {
    const playerA = { games_played: 10, games_won: 8, games_lost: 2 }; // Ratio 4, 10 games
    const playerB = { games_played: 8, games_won: 4, games_lost: 1 }; // Ratio 4, 5 games

    // @ts-expect-error missing properties
    expect(sortByRanking(playerA, playerB)).toBeLessThan(0); // playerA should rank higher
    // @ts-expect-error missing properties
    expect(sortByRanking(playerB, playerA)).toBeGreaterThan(0); // playerB should rank lower
  });

  test("should rank players with no games played as equal when both have no games", () => {
    const playerA = { games_played: 0, games_won: 0, games_lost: 0 };
    const playerB = { games_played: 0, games_won: 0, games_lost: 0 };

    // @ts-expect-error missing properties
    expect(sortByRanking(playerA, playerB)).toBe(0); // Both should rank equally
  });

  test("should rank a player with games played above a player with no games", () => {
    const playerA = { games_played: 0, games_won: 0, games_lost: 0 }; // No games
    const playerB = { games_played: 10, games_won: 5, games_lost: 5 }; // Ratio 1, 10 games

    // @ts-expect-error missing properties
    expect(sortByRanking(playerA, playerB)).toBeGreaterThan(0); // playerA should rank lower
    // @ts-expect-error missing properties
    expect(sortByRanking(playerB, playerA)).toBeLessThan(0); // playerB should rank higher
  });
});

describe("validateStartEndTimes", () => {
  test("should return false if end time is before start time", () => {
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-29T09:00:00Z")
    ).toBe(false);
  });

  test("should return false if end time is the same as start time", () => {
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-29T10:00:00Z")
    ).toBe(false);
  });

  test("should return true if end time is within 24 hours of start time", () => {
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-30T09:00:00Z")
    ).toBe(true);
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-29T15:00:00Z")
    ).toBe(true);
  });

  test("should return false if end time is exactly 24 hours after start time", () => {
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-30T10:00:00Z")
    ).toBe(false);
  });

  test("should return false if end time is more than 24 hours after start time", () => {
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-30T11:00:00Z")
    ).toBe(false);
    expect(
      validateStartEndTimes("2024-08-29T10:00:00Z", "2024-08-31T10:00:00Z")
    ).toBe(false);
  });
});
