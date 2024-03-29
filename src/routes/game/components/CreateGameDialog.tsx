import { useState } from "react";
import { Dialog } from "@/components/Dialog/Dialog";
import { Form } from "@/components/Form/Form";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import {
  Button,
  TextField,
  Select,
  Flex,
  Grid,
  Dialog as RadixDialog,
} from "@radix-ui/themes";
import { useCreateGame } from "@/api/game/hooks";
import { Game } from "@/api/game/types";
import { Player } from "@/api/player/types";

import * as z from "zod";

export function CreateGameDialog({
  players,
  onSuccess,
}: {
  players: Player[];
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateGame({
    onSuccess: () => {
      setOpen(false);
      onSuccess?.();
    },
  });

  const schema = z.object({
    datetime: z.string().min(2, { message: "Please select a date" }),
    player_1: z.string().min(2, { message: "Please select first player" }),
    player_2: z.string().min(2, { message: "Please select second player" }),
    score_player_1: z.number().min(0, "Please add score"),
    score_player_2: z.number().min(0, "Please add score"),
  });

  const defaultValues: Omit<Game, "id"> = {
    datetime: new Date().toISOString(),
    player_1: "",
    player_2: "",
    score_player_1: 0,
    score_player_2: 0,
  };

  const handleSubmit = (values: Game) => {
    mutation.mutate(values);
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>
        <Button>Add game</Button>
      </RadixDialog.Trigger>

      <Dialog title="Add game">
        <Form<Game>
          onSubmit={handleSubmit}
          schema={schema}
          options={{ defaultValues }}
        >
          {({ register, formState, setValue }) => (
            <>
              <Flex direction="column" gap="2">
                <Grid gap="4" columns="2">
                  <FieldWrapper
                    label="Date"
                    error={formState.errors["datetime"]}
                  >
                    <TextField.Root
                      {...register("datetime")}
                      type="datetime-local"
                    />
                  </FieldWrapper>
                </Grid>

                <Grid gap="4" columns="2">
                  <FieldWrapper
                    label="Player 1"
                    error={formState.errors["player_1"]}
                  >
                    <Select.Root
                      {...register("player_1")}
                      onValueChange={(value) => {
                        setValue("player_1", value);
                      }}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        {players.map(({ id, first_name, last_name }) => (
                          <Select.Item value={id} key={id}>
                            {first_name} {last_name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </FieldWrapper>

                  <FieldWrapper
                    label="Score"
                    error={formState.errors["score_player_1"]}
                  >
                    <TextField.Root
                      {...register("score_player_1", { valueAsNumber: true })}
                    />
                  </FieldWrapper>
                </Grid>

                <Grid gap="4" columns="2">
                  <FieldWrapper
                    label="Player 2"
                    error={formState.errors["player_2"]}
                  >
                    <Select.Root
                      {...register("player_2")}
                      onValueChange={(value) => {
                        setValue("player_2", value);
                      }}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        {players.map(({ id, first_name, last_name }) => (
                          <Select.Item value={id} key={id}>
                            {first_name} {last_name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </FieldWrapper>

                  <FieldWrapper
                    label="Score"
                    error={formState.errors["score_player_2"]}
                  >
                    <TextField.Root
                      {...register("score_player_2", { valueAsNumber: true })}
                    />
                  </FieldWrapper>
                </Grid>
              </Flex>

              <Flex justify="end" gap="4" pt="4">
                <Button
                  type="button"
                  color="gray"
                  variant="soft"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={mutation.isPending}>
                  Submit
                </Button>
              </Flex>
            </>
          )}
        </Form>
      </Dialog>
    </RadixDialog.Root>
  );
}
