import { useState, ChangeEvent, FormEvent } from "react";
import { Flex, Grid, Button } from "@radix-ui/themes";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { Select } from "@/components/Select/Select";
import { Player } from "@/api/player/types";
import { GameCreate } from "@/api/game/types";
import { getPlayerOptions } from "@/utils/utils";
import * as z from "zod";

const defaultValues: GameCreate = {
  start_time: new Date().toISOString(),
  end_time: new Date().toISOString(),
  player_1: "",
  player_2: "",
  score_player_1: 0,
  score_player_2: 0,
};

const schema = z.object({
  player_1: z.string().min(2, "Please select first player"),
  player_2: z.string().min(2, "Please select second player"),
});

export function CreateGameForm({
  onSubmit,
  players,
  isLoading,
}: {
  onSubmit: (values: GameCreate) => void;
  players: Player[];
  isLoading: boolean;
}) {
  const [values, setValues] = useState<GameCreate>(defaultValues);

  const [errors, setErrors] = useState<
    Partial<Record<keyof GameCreate, string>>
  >({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(value);
    setValues((prevValues) => ({
      ...prevValues,
      [name]:
        type === "number" && value
          ? parseInt(value)
          : type === "number"
            ? ""
            : value,
    }));
  };

  const validateForm = (): boolean => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorObject = e.errors.reduce(
          (acc, error) => {
            acc[error.path[0] as keyof GameCreate] = error.message;
            return acc;
          },
          {} as Partial<Record<keyof GameCreate, string>>
        );
        setErrors(errorObject);
      }
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
      setValues(defaultValues);
    } else {
      console.log("Errors:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="2">
        <Grid gap="4" columns="2">
          <FieldWrapper label="Player 1" error={errors.player_1}>
            <Select
              name="player_1"
              options={getPlayerOptions("player_1", players, values)}
              onChange={handleChange}
            />
          </FieldWrapper>

          <FieldWrapper label="Player 2" error={errors.player_2}>
            <Select
              name="player_2"
              options={getPlayerOptions("player_2", players, values)}
              onChange={handleChange}
            />
          </FieldWrapper>
        </Grid>
      </Flex>

      <Button type="submit" mt="4" loading={isLoading} style={{ width: 120 }}>
        Start game
      </Button>
    </form>
  );
}
