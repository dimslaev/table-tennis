import { Heading, Flex } from "@radix-ui/themes";
import { useGetPlayers } from "@/api/player/hooks";
import { useCreateGame, useUpdateGame } from "@/api/game/hooks";
import { useGetStatistics } from "@/api/statistics/hooks";
// import { useMinimumFetchTimeElapsed } from "@/utils/hooks";
import { CreateGameForm } from "./components/CreateGameForm";
import { UpdateGameForm } from "./components/UpdateGameForm";
import { useState } from "react";
import { Game, GameUpdate } from "@/api/game/types";
import { Player } from "@/api/player/types";

export function StartGame() {
  const [game, setGame] = useState<Game | null>(null);
  const players = useGetPlayers();
  const statistics = useGetStatistics();

  const createGameMutation = useCreateGame({
    onSuccess: setGame,
  });
  const updateGameMutation = useUpdateGame();

  const onUpdateGame = (values: GameUpdate, winner?: Player) => {
    updateGameMutation.mutate({
      ...values,
      end_time: winner ? new Date().toISOString() : values.end_time,
    });

    if (winner) {
      alert(`Winner ${winner.first_name} ${winner.last_name}`);
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Heading>Start game</Heading>

      {game ? (
        <UpdateGameForm
          onSubmit={onUpdateGame}
          game={game}
          resetGame={() => setGame(null)}
          players={players.data || []}
          statistics={statistics.data || []}
          isLoading={false}
        />
      ) : (
        <CreateGameForm
          onSubmit={createGameMutation.mutate}
          players={players.data || []}
          isLoading={false}
        />
      )}
    </Flex>
  );
}
