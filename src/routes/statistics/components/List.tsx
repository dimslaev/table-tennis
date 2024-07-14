import { Table } from "@radix-ui/themes";
import { Statistics } from "@/api/statistics/types";

export function List({ statistics }: { statistics: Statistics[] }) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Player</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Games played</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Won</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Lost</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {statistics.map((player) => {
          return (
            <Table.Row
              key={player.id}
              align="center"
              style={
                player.ranking === 1
                  ? { backgroundColor: "var(--accent-3)" }
                  : {}
              }
            >
              <Table.Cell>{player.ranking}</Table.Cell>
              <Table.Cell>
                {player.first_name} {player.last_name}
              </Table.Cell>
              <Table.Cell>{player.games_played}</Table.Cell>
              <Table.Cell>{player.games_won}</Table.Cell>
              <Table.Cell>{player.games_lost}</Table.Cell>
              <Table.Cell>{player.score}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
