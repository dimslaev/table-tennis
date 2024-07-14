import { client } from "@/supabase/client";
import { Statistics } from "@/api/statistics/types";

export const getAll = async (): Promise<Statistics[]> => {
  const { data, error } = await client.from("statistics").select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No statistics found");
  }

  return data;
};
