import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { Flex, Grid, TextField, Button } from "@radix-ui/themes";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { Notification } from "@/components/Notification/Notification";
import { Select } from "@/components/Select/Select";
import { GameCreate } from "@/api/game/types";
import { Player } from "@/api/player/types";
import {
  getPlayerOptions,
  getDatetimeInputValue,
  validateScore,
  validateStartEndTimes,
} from "@/utils/utils";
import * as z from "zod";

const defaultValues: GameCreate = {
  start_time: new Date().toISOString(),
  end_time: new Date().toISOString(),
  player_1: "",
  player_2: "",
  score_player_1: 0,
  score_player_2: 0,
};

const schema = z
  .object({
    start_time: z.string().min(2, "Please select a date"),
    end_time: z.string().min(2, "Please select a date"),
    player_1: z.string().min(2, "Please select first player"),
    player_2: z.string().min(2, "Please select second player"),
    score_player_1: z.number().min(0, "Please add score"),
    score_player_2: z.number().min(0, "Please add score"),
  })
  .refine(
    ({ score_player_1, score_player_2 }) =>
      validateScore(score_player_1, score_player_2),
    { path: ["scores"], message: "Check score" }
  )
  .refine(
    (data) => {
      return validateStartEndTimes(data.start_time, data.end_time);
    },
    {
      message: "Check times",
      path: ["times"],
    }
  );

export function Form({
  players,
  onSubmit,
  isLoading,
}: {
  players: Player[];
  onSubmit: (values: GameCreate) => void;
  isLoading: boolean;
}) {
  const [values, setValues] = useState<GameCreate>(defaultValues);

  const [errors, setErrors] = useState<
    Partial<Record<keyof GameCreate | "scores" | "times", string>>
  >({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      e.target.select();
    }
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
              value={values.player_1}
              options={getPlayerOptions("player_1", players, values)}
              onChange={handleChange}
            />
          </FieldWrapper>

          <FieldWrapper label="Player 2" error={errors.player_2}>
            <Select
              name="player_2"
              value={values.player_2}
              options={getPlayerOptions("player_2", players, values)}
              onChange={handleChange}
            />
          </FieldWrapper>
        </Grid>

        <Grid gap="4" columns="2">
          <FieldWrapper
            label="Score"
            error={errors.score_player_1 || errors["scores"]}
          >
            <TextField.Root
              name="score_player_1"
              type="number"
              value={values.score_player_1}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Score"
            error={errors.score_player_2 || errors["scores"]}
          >
            <TextField.Root
              name="score_player_2"
              type="number"
              value={values.score_player_2}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </FieldWrapper>
        </Grid>

        {errors["scores"] && (
          <Notification color="red">
            A game is played until one of the players scores 11 points, or if
            there is a 2 point difference after the score was tied 10:10.
          </Notification>
        )}

        <Grid gap="4" columns={{ initial: "1", xs: "2" }}>
          <FieldWrapper
            label="Start time"
            error={errors.start_time || errors.times}
          >
            <TextField.Root
              name="start_time"
              value={getDatetimeInputValue(values.start_time)}
              onChange={handleChange}
              type="datetime-local"
            />
          </FieldWrapper>

          <FieldWrapper
            label="End time"
            error={errors.end_time || errors.times}
          >
            <TextField.Root
              name="end_time"
              value={getDatetimeInputValue(values.end_time)}
              onChange={handleChange}
              type="datetime-local"
            />
          </FieldWrapper>
        </Grid>

        {errors["times"] && (
          <Notification color="red">
            End time must be after start time, within the same day.
          </Notification>
        )}
      </Flex>

      <Button type="submit" mt="4" loading={isLoading} style={{ width: 120 }}>
        Create game
      </Button>
    </form>
  );
}
