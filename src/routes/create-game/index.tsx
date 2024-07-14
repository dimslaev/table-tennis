import { Heading, Flex, Separator } from "@radix-ui/themes";
import { useGetExtendedGames, useRemoveGame } from "@/api/game/hooks";
import { useCreateGame } from "@/api/game/hooks";
import { useMinimumFetchTimeElapsed } from "@/utils/hooks";
import { Form } from "./components/Form";
import { List } from "./components/List";

export function CreateGame() {
  const games = useGetExtendedGames();

  const createGame = useCreateGame({
    onSuccess: () => {
      games.refetch();
    },
  });

  const deleteGame = useRemoveGame({
    onSuccess: () => {
      games.refetch();
    },
  });

  const createGameIsPending = !useMinimumFetchTimeElapsed(createGame.isPending);
  const deleteGameIsPending = !useMinimumFetchTimeElapsed(deleteGame.isPending);

  return (
    <Flex maxWidth="600px" direction="column" gap="6">
      <Heading>Add score for an existing game</Heading>
      <Form onSubmit={createGame.mutate} isLoading={createGameIsPending} />
      <Separator size="4" />
      <List
        games={games.data || []}
        onDeleteGame={deleteGame.mutate}
        isLoading={deleteGameIsPending || createGameIsPending}
      />
    </Flex>
  );
}
