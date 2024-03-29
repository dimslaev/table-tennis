import { ColumnDef } from "@tanstack/react-table";
import { type Game } from "@/api/game/types";
import { type Player } from "@/api/player/types";
import { Avatar, Flex, Text } from "@radix-ui/themes";

export type ExtendedGame = Omit<Game, "player_1" | "player_2"> & {
  player_1: Player;
  player_2: Player;
};

export const extendGames = (
  games: Game[],
  players: Player[]
): ExtendedGame[] => {
  return games.map((game) => {
    const p1 = players.find((player) => player.id === game.player_1)!;
    const p2 = players.find((player) => player.id === game.player_2)!;
    return {
      ...game,
      player_1: p1,
      player_2: p2,
    };
  });
};

const PlayerCell = (props: Player) => {
  const { avatar_url, first_name, last_name } = props || {};
  return (
    <Flex gap="2" align="center">
      <Avatar src={avatar_url} size="2" fallback="" radius="full" />
      <Text>
        {first_name} {last_name}
      </Text>
    </Flex>
  );
};

export const columns: ColumnDef<ExtendedGame>[] = [
  {
    header: "Date",
    cell: (ctx) => {
      const parsed = new Date(ctx.row.original.datetime);
      const date = parsed.toLocaleDateString("en-US", { dateStyle: "medium" });
      const time = parsed.toLocaleTimeString("en-US", { timeStyle: "short" });
      return `${date} ${time}`;
    },
    accessorKey: "datetime",
    sortingFn: "datetime",
  },
  {
    header: "Player 1",
    cell: (ctx) => <PlayerCell {...ctx.row.original.player_1} />,
    sortingFn: (rowA, rowB) => {
      const aName = `${rowA.original.player_1.first_name} ${rowA.original.player_1.last_name}`;
      const bName = `${rowB.original.player_1.first_name} ${rowB.original.player_1.last_name}`;
      return aName.localeCompare(bName);
    },
  },
  {
    header: "Player 2",
    cell: (ctx) => <PlayerCell {...ctx.row.original.player_2} />,
  },
  {
    header: "Score",
    cell: (ctx) => {
      return `${ctx.row.original.score_player_1} : ${ctx.row.original.score_player_2}`;
    },
  },
];
