import { useState, ChangeEvent, FormEvent } from "react";
import { Flex, Grid, TextField, Text, Button } from "@radix-ui/themes";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { Select } from "@/components/Select/Select";
import { GameCreate } from "@/api/game/types";
import { Player } from "@/api/player/types";
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
    (data) => {
      const { score_player_1, score_player_2 } = data;

      if (
        Math.abs(score_player_1 - score_player_2) >= 2 &&
        (score_player_1 >= 11 || score_player_2 >= 11)
      ) {
        return true;
      }

      return false;
    },
    {
      path: ["scores"],
      message: "Check score",
    }
  );

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === "invalid_type" && issue.expected === "number")
    return { message: "Please add score" };
  return { message: ctx.defaultError };
};

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
    Partial<Record<keyof GameCreate | "scores", string>>
  >({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, dataset } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]:
        dataset?.type === "number" && value
          ? parseInt(value)
          : dataset?.type === "number"
            ? ""
            : value,
    }));
  };

  const validateForm = (): boolean => {
    try {
      schema.parse(values, { errorMap });
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
        <Grid gap="4" columns={{ initial: "1", xs: "2" }}>
          <FieldWrapper label="Start time" error={errors.start_time}>
            <TextField.Root
              value={values.start_time}
              onChange={handleChange}
              type="datetime-local"
            />
          </FieldWrapper>

          <FieldWrapper label="End time" error={errors.end_time}>
            <TextField.Root
              value={values.end_time}
              onChange={handleChange}
              type="datetime-local"
            />
          </FieldWrapper>
        </Grid>

        <Grid gap="4" columns="2">
          <FieldWrapper label="Player 1" error={errors.player_1}>
            <Select
              name="player_1"
              options={getPlayerOptions("player_1", players, values)}
              onChange={handleChange}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Score"
            error={errors.score_player_1 || errors["scores"]}
          >
            <TextField.Root
              name="score_player_1"
              value={values.score_player_1}
              onChange={handleChange}
              data-type="number"
            />
          </FieldWrapper>
        </Grid>

        <Grid gap="4" columns="2">
          <FieldWrapper label="Player 2" error={errors.player_2}>
            <Select
              name="player_2"
              options={getPlayerOptions("player_2", players, values)}
              onChange={handleChange}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Score"
            error={errors.score_player_2 || errors["scores"]}
          >
            <TextField.Root
              name="score_player_2"
              value={values.score_player_2}
              onChange={handleChange}
              data-type="number"
            />
          </FieldWrapper>
        </Grid>
      </Flex>

      {errors["scores"] && (
        <Text as="p" color="red" size="1" mt="2">
          A game is played until one of the players scores 11 points, or if
          there is a 2 point difference after the score was tied 10:10.
        </Text>
      )}

      <Button type="submit" mt="4" loading={isLoading} style={{ width: 120 }}>
        Create game
      </Button>
    </form>
  );
}
