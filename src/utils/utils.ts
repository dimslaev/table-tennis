import { GameCreate } from "@/api/game/types";
import { Player } from "@/api/player/types";

export const formatDate = (isoString: string) => {
  const parsed = new Date(isoString);
  const date = parsed.toLocaleDateString("en-US", { dateStyle: "medium" });
  const time = parsed.toLocaleTimeString("en-US", { timeStyle: "short" });
  return `${date} ${time}`;
};

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
