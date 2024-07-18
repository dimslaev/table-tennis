import { Heading, Flex, Separator } from "@radix-ui/themes";
import {
  useGetExtendedGames,
  useCreateGame,
  useRemoveGame,
} from "@/api/game/hooks";
import { useGetPlayers } from "@/api/player/hooks";
import { useMinimumFetchTimeElapsed } from "@/utils/hooks";
import { Form } from "./components/Form";
import { List } from "./components/List";

export function CreateGame() {
  const games = useGetExtendedGames();
  const players = useGetPlayers();
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
    <Flex direction="column" gap="4">
      <Heading>Add score for an existing game</Heading>
      <Form
        players={players.data || []}
        onSubmit={createGame.mutate}
        isLoading={createGameIsPending}
      />
      <Separator size="4" my="4" />
      <List
        games={games.data || []}
        onDeleteGame={deleteGame.mutate}
        isLoading={deleteGameIsPending || createGameIsPending}
      />
    </Flex>
  );
}
