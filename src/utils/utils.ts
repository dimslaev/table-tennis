import { GameCreate } from "@/api/game/types";
import { Player } from "@/api/player/types";

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
