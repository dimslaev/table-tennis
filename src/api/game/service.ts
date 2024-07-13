import { client } from "@/supabase/client";
import { Game, ExtendedGame, GameCreate, GameUpdate } from "@/api/game/types";

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

export const getExtended = async (): Promise<ExtendedGame[]> => {
  const { data, error } = await client.from("game").select(`
      id,
      datetime,
      id,
      player_1 (id, first_name, last_name, avatar_url),
      player_2 (id, first_name, last_name, avatar_url),
      score_player_1,
      score_player_2
    `);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No games found");
  }

  // @ts-expect-error joined query does not have Player type
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
