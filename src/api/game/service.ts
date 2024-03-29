import { client } from "@/supabase/client";
import { Game, GameCreate, GameUpdate } from "@/api/game/types";

export const getAll = async (): Promise<Game[]> => {
  const { data, error } = await client.from("game").select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No games found");
  }

  return data;
};

export const get = async (id: Game["id"]): Promise<Game> => {
  const { data, error } = await client
    .from("game")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Game not found");
  }

  return data;
};

export const create = async (payload: GameCreate): Promise<Game> => {
  const { data, error } = await client
    .from("game")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  return data;
};

export const update = async ({ id, ...payload }: GameUpdate): Promise<Game> => {
  const { data, error } = await client
    .from("game")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No data returned");
  }

  return data;
};

export const remove = async (id: Game["id"]): Promise<void> => {
  const { error } = await client.from("game").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
