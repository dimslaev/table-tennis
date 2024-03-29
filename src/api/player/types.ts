import { Database } from "@/supabase/types";

export type Player = Database["public"]["Tables"]["player"]["Row"];
export type PlayerCreate = Omit<Player, "id">;
export type PlayerUpdate = Omit<Partial<Player>, "id"> & { id: Player["id"] };
