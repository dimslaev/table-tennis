import { Container, Section, Heading, Flex } from "@radix-ui/themes";
import { Table } from "@/components/Table/Table";
import { CreateGameDialog } from "./components/CreateGameDialog";
import { type ExtendedGame, columns, extendGames } from "@/routes/game/columns";
import { useGetGames } from "@/api/game/hooks";
import { useGetPlayers } from "@/api/player/hooks";

export function Game() {
  const games = useGetGames();
  const players = useGetPlayers();

  const isLoading = games.isLoading || players.isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const extendedGames = extendGames(games.data || [], players.data || []);

  return (
    <Container px="4">
      <Section>
        <Flex justify="between">
          <Heading mb="4">Game scores</Heading>

          <CreateGameDialog
            players={players.data || []}
            onSuccess={() => {
              games.refetch();
            }}
          />
        </Flex>

        <Table<ExtendedGame>
          columns={columns}
          data={extendedGames || []}
          defaultSorting={[{ id: "datetime", desc: true }]}
          variant="surface"
        />
      </Section>
    </Container>
  );
}
