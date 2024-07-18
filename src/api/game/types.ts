import { Database } from "@/supabase/types";
import { type Player } from "@/api/player/types";

export type Game = Database["public"]["Tables"]["game"]["Row"];
export type GameCreate = Omit<Game, "id">;
export type GameUpdate = Omit<Partial<Game>, "id"> & { id: Game["id"] };
export type ExtendedGame = Omit<Game, "player_1" | "player_2"> & {
  player_1: Player;
  player_2: Player;
};
