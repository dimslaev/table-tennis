import { IconButton, Table, Tooltip } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { Player } from "@/api/player/types";
import { Game } from "@/api/game/types";

export function List({
  players,
  games,
  onDeletePlayer,
  isLoading,
}: {
  players: Player[];
  games: Game[];
  onDeletePlayer: (id: string) => void;
  isLoading: boolean;
}) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Player</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body style={{ opacity: isLoading ? 0.6 : 1 }}>
        {players.map((player) => {
          const playerHasExistingGames = games.some(
            (game) => game.player_1 === player.id || game.player_2 === player.id
          );
          const button = (
            <IconButton
              variant="soft"
              onClick={() => onDeletePlayer(player.id)}
              disabled={isLoading || playerHasExistingGames}
            >
              <TrashIcon width="18" height="18" />
            </IconButton>
          );
          return (
            <Table.Row key={player.id} align="center">
              <Table.Cell>
                {player.first_name} {player.last_name}
              </Table.Cell>
              <Table.Cell align="right">
                {playerHasExistingGames ? (
                  <Tooltip content="Player has existing games">
                    {button}
                  </Tooltip>
                ) : (
                  button
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
