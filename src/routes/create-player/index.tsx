import { Heading, Flex, Separator } from "@radix-ui/themes";
import {
  useGetPlayers,
  useCreatePlayer,
  useRemovePlayer,
} from "@/api/player/hooks";
import { useGetGames } from "@/api/game/hooks";
import { useMinimumFetchTimeElapsed } from "@/utils/hooks";
import { Form } from "./components/Form";
import { List } from "./components/List";

export function CreatePlayer() {
  const players = useGetPlayers();
  const games = useGetGames();

  const createPlayer = useCreatePlayer({
    onSuccess: () => {
      players.refetch();
    },
  });

  const deletePlayer = useRemovePlayer({
    onSuccess: () => {
      players.refetch();
    },
  });

  const createPlayerIsPending = !useMinimumFetchTimeElapsed(
    createPlayer.isPending
  );
  const deletePlayerIsPending = !useMinimumFetchTimeElapsed(
    deletePlayer.isPending
  );

  return (
    <Flex direction="column" gap="4">
      <Heading>Add new player</Heading>
      <Form onSubmit={createPlayer.mutate} isLoading={createPlayerIsPending} />
      <Separator size="4" />
      <List
        players={players.data || []}
        games={games.data || []}
        onDeletePlayer={deletePlayer.mutate}
        isLoading={deletePlayerIsPending}
      />
    </Flex>
  );
}
