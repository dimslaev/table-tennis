import { Database } from "@/supabase/types";

export type Statistics = Database["public"]["Views"]["statistics"]["Row"];
