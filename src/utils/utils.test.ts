import { describe, test, expect } from "vitest";
import { getDatetimeInputValue, formatDate } from "@/utils/utils";

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

  test.only("should handle UTC date strings correctly", () => {
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
