import { GameCreate } from "@/api/game/types";
import { Player } from "@/api/player/types";
import { Statistics } from "@/api/statistics/types";

export const getPlayerOptions = (
  name: "player_1" | "player_2",
  players: Player[],
  values: GameCreate
) => {
  return players
    .filter(
      (player) =>
        player.id !== values[name === "player_1" ? "player_2" : "player_1"]
    )
    .map(({ id, first_name, last_name }) => ({
      value: id,
      label: `${first_name} ${last_name}`,
    }));
};

export const formatDate = (isoString?: string): string => {
  const parsed = isoString ? new Date(isoString) : new Date();
  const date = parsed.toLocaleDateString("en-US", { dateStyle: "medium" });
  const time = parsed.toLocaleTimeString("en-US", { timeStyle: "short" });
  return `${date} ${time}`;
};

export const getDatetimeInputValue = (isoString?: string): string => {
  const date = isoString ? new Date(isoString) : new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  // Adjust the date time to UTC by subtracting the timezone offset
  const utcTime = date.getTime() - timezoneOffset;
  const adjustedDate = new Date(utcTime).toISOString();
  // Return the ISO string up to minutes precision for input[type=datetime-local]
  return adjustedDate.slice(0, 16);
};

export const validateScore = (score1: number, score2: number): boolean => {
  const diff = Math.abs(score1 - score2);

  if (diff < 2) {
    return false;
  }

  if (score1 < 11 && score2 < 11) {
    return false;
  }

  if ((score1 > 11 || score2 > 11) && diff > 2) {
    return false;
  }

  return true;
};

export const validateStartEndTimes = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diff = endTime.getTime() - startTime.getTime();
  return diff >= 60 * 1000 && diff < 24 * 60 * 60 * 1000;
};

export const sortByRanking = (a: Statistics, b: Statistics) => {
  const aWinLossRatio = a.games_won || 0 / (a.games_lost || 1); // Avoid division by zero
  const bWinLossRatio = b.games_won || 0 / (b.games_lost || 1);
  if (bWinLossRatio !== aWinLossRatio) {
    return bWinLossRatio - aWinLossRatio; // Higher ratio comes first
  } else {
    return (b.games_played || 0) - (a.games_played || 0); // More games played comes first
  }
};
