import { Table } from "@/components/Table/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Game } from "@/api/game/types";
import games from "@/api/game/mocks/get-games.json";

const columns: ColumnDef<Game>[] = [
  {
    header: "Date",
    cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
    accessorKey: "datetime",
    sortingFn: "datetime",
  },
  {
    header: "Player 1",
    cell: (row) => row.renderValue(),
    accessorKey: "player_1",
  },
  {
    header: "Score",
    cell: (row) => row.renderValue(),
    accessorKey: "score_player_1",
  },
  {
    header: "Player 2",
    cell: (row) => row.renderValue(),
    accessorKey: "player_2",
  },
  {
    header: "Score",
    cell: (row) => row.renderValue(),
    accessorKey: "score_player_2",
  },
];

export function Default() {
  return <Table<Game> columns={columns} data={games} />;
}

export function Sorting() {
  return (
    <Table<Game>
      columns={columns}
      data={games}
      defaultSorting={[{ id: "datetime", desc: true }]}
    />
  );
}

export function Surface() {
  return <Table<Game> columns={columns} data={games} variant="surface" />;
}
