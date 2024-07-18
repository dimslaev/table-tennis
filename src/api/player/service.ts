import { client } from "@/supabase/client";
import { Player, PlayerCreate, PlayerUpdate } from "@/api/player/types";

export const getAll = async (): Promise<Player[]> => {
  const { data, error } = await client.from("player").select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No players found");
  }

  return data;
};

export const get = async (id: Player["id"]): Promise<Player> => {
  const { data, error } = await client
    .from("player")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Player not found");
  }

  return data;
};

export const create = async (payload: PlayerCreate): Promise<Player> => {
  const { data, error } = await client
    .from("player")
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

export const update = async ({
  id,
  ...payload
}: PlayerUpdate): Promise<Player> => {
  const { data, error } = await client
    .from("player")
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

export const remove = async (id: Player["id"]): Promise<void> => {
  const { error } = await client.from("player").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
