export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      game: {
        Row: {
          end_time: string;
          id: string;
          player_1: string;
          player_2: string;
          score_player_1: number;
          score_player_2: number;
          start_time: string;
        };
        Insert: {
          end_time?: string;
          id?: string;
          player_1: string;
          player_2: string;
          score_player_1: number;
          score_player_2: number;
          start_time?: string;
        };
        Update: {
          end_time?: string;
          id?: string;
          player_1?: string;
          player_2?: string;
          score_player_1?: number;
          score_player_2?: number;
          start_time?: string;
        };
        Relationships: [
          {
            foreignKeyName: "game_player_1_fkey";
            columns: ["player_1"];
            isOneToOne: false;
            referencedRelation: "player";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "game_player_1_fkey";
            columns: ["player_1"];
            isOneToOne: false;
            referencedRelation: "statistics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "game_player_2_fkey";
            columns: ["player_2"];
            isOneToOne: false;
            referencedRelation: "player";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "game_player_2_fkey";
            columns: ["player_2"];
            isOneToOne: false;
            referencedRelation: "statistics";
            referencedColumns: ["id"];
          }
        ];
      };
      player: {
        Row: {
          avatar_url: string;
          first_name: string;
          id: string;
          last_name: string;
        };
        Insert: {
          avatar_url: string;
          first_name: string;
          id?: string;
          last_name: string;
        };
        Update: {
          avatar_url?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      statistics: {
        Row: {
          first_name: string | null;
          games_lost: number | null;
          games_played: number | null;
          games_won: number | null;
          id: string | null;
          last_name: string | null;
          ranking: number | null;
          score: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
