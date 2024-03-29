import { Database } from "@/supabase/types";

export type Game = Database["public"]["Tables"]["game"]["Row"];
export type GameCreate = Omit<Game, "id">;
export type GameUpdate = Omit<Partial<Game>, "id"> & { id: Game["id"] };
