import { useState, ChangeEvent, FormEvent } from "react";
import { Flex, Grid, TextField, Select, Button } from "@radix-ui/themes";
import { useGetPlayers } from "@/api/player/hooks";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { GameCreate } from "@/api/game/types";
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
  start_time: z.string().min(2, "Please select a date"),
  end_time: z.string().min(2, "Please select a date"),
  player_1: z.string().min(2, "Please select first player"),
  player_2: z.string().min(2, "Please select second player"),
  score_player_1: z.number().min(0, "Please add score"),
  score_player_2: z.number().min(0, "Please add score"),
});

export function Form({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: GameCreate) => void;
  isLoading: boolean;
}) {
  const players = useGetPlayers();

  const [formValues, setFormValues] = useState<GameCreate>(defaultValues);

  const [errors, setErrors] = useState<
    Partial<Record<keyof GameCreate, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        dataset.type === "number" && value
          ? parseInt(value)
          : dataset.type === "number"
          ? ""
          : value,
    }));
  };

  const validateForm = (): boolean => {
    try {
      schema.parse(formValues, {
        errorMap: (issue, ctx) => {
          if (issue.code === "invalid_type" && issue.expected === "number")
            return { message: "Please add score" };
          return { message: ctx.defaultError };
        },
      });
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorObject = e.errors.reduce((acc, error) => {
          acc[error.path[0] as keyof GameCreate] = error.message;
          return acc;
        }, {} as Partial<Record<keyof GameCreate, string>>);
        setErrors(errorObject);
      }
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
      setFormValues(defaultValues);
    } else {
      console.log("Errors:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="2">
        <Grid gap="4" columns="2">
          <FieldWrapper label="Start timme" error={errors["start_time"]}>
            <TextField.Root
              name="datetime"
              type="datetime-local"
              value={formValues.start_time.slice(0, 16)}
              onChange={handleChange}
            />
          </FieldWrapper>

          <FieldWrapper label="End time" error={errors["end_time"]}>
            <TextField.Root
              name="datetime"
              type="datetime-local"
              value={formValues.end_time.slice(0, 16)}
              onChange={handleChange}
            />
          </FieldWrapper>
        </Grid>

        <Grid gap="4" columns="2">
          <FieldWrapper label="Player 1" error={errors["player_1"]}>
            <Select.Root
              name="player_1"
              value={formValues.player_1}
              onValueChange={(value) => {
                handleChange({
                  target: { name: "player_1", value },
                } as ChangeEvent<HTMLInputElement>);
              }}
            >
              <Select.Trigger />
              <Select.Content>
                {players.data
                  ?.filter((player) => player.id !== formValues.player_2)
                  .map(({ id, first_name, last_name }) => (
                    <Select.Item value={id} key={id}>
                      {first_name} {last_name}
                    </Select.Item>
                  ))}
              </Select.Content>
            </Select.Root>
          </FieldWrapper>

          <FieldWrapper label="Score" error={errors["score_player_1"]}>
            <TextField.Root
              name="score_player_1"
              data-type="number"
              value={formValues.score_player_1}
              onChange={handleChange}
            />
          </FieldWrapper>
        </Grid>

        <Grid gap="4" columns="2">
          <FieldWrapper label="Player 2" error={errors["player_2"]}>
            <Select.Root
              name="player_2"
              value={formValues.player_2}
              onValueChange={(value) => {
                handleChange({
                  target: { name: "player_2", value },
                } as ChangeEvent<HTMLInputElement>);
              }}
            >
              <Select.Trigger />
              <Select.Content>
                {players.data
                  ?.filter((player) => player.id !== formValues.player_1)
                  .map(({ id, first_name, last_name }) => (
                    <Select.Item value={id} key={id}>
                      {first_name} {last_name}
                    </Select.Item>
                  ))}
              </Select.Content>
            </Select.Root>
          </FieldWrapper>

          <FieldWrapper label="Score" error={errors["score_player_2"]}>
            <TextField.Root
              name="score_player_2"
              type="number"
              value={formValues.score_player_2}
              onChange={handleChange}
            />
          </FieldWrapper>
        </Grid>
      </Flex>

      <Button type="submit" mt="4" loading={isLoading} style={{ width: 120 }}>
        Create game
      </Button>
    </form>
  );
}
