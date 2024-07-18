import { IconButton, Table } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { ExtendedGame } from "@/api/game/types";
import { formatDate } from "@/utils/utils";

export function List({
  games,
  onDeleteGame,
  isLoading,
}: {
  games: ExtendedGame[];
  onDeleteGame: (id: string) => void;
  isLoading: boolean;
}) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Player 1</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Player 2</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body style={{ opacity: isLoading ? 0.6 : 1 }}>
        {games
          ?.sort((a, b) => {
            return (
              new Date(b.start_time).getTime() -
              new Date(a.start_time).getTime()
            );
          })
          .map((game) => (
            <Table.Row key={game.id} align="center">
              <Table.Cell>{formatDate(game.start_time)}</Table.Cell>
              <Table.Cell>
                {game.player_1.first_name} {game.player_1.last_name}
              </Table.Cell>
              <Table.Cell>
                {game.player_2.first_name} {game.player_2.last_name}
              </Table.Cell>
              <Table.Cell>
                {game.score_player_1} : {game.score_player_2}
              </Table.Cell>
              <Table.Cell align="right">
                <IconButton
                  variant="soft"
                  onClick={() => onDeleteGame(game.id)}
                  disabled={isLoading}
                >
                  <TrashIcon width="18" height="18" />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
}
