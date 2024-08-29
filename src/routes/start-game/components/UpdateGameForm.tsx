import { useState, useEffect } from "react";
import { Flex, Box, Grid, Button } from "@radix-ui/themes";
import { Player } from "@/api/player/types";
import { Game, GameUpdate } from "@/api/game/types";
import { Statistics } from "@/api/statistics/types";
import { PlayerCard } from "./PlayerCard";
import { Notification } from "@/components/Notification/Notification";
import { validateScore } from "@/utils/utils";

export function UpdateGameForm({
  onSubmit,
  game,
  resetGame,
  players,
  statistics,
  isLoading,
}: {
  onSubmit: (values: GameUpdate, winner: Player | undefined) => void;
  game: Game;
  resetGame: () => void;
  players: Player[];
  statistics: Statistics[];
  isLoading: boolean;
}) {
  const [formValues, setFormValues] = useState<Game>(game);

  const player1 = players.find((player) => player.id === game.player_1);
  const player2 = players.find((player) => player.id === game.player_2);

  const player1Stats = statistics.find((player) => player.id === game.player_1);
  const player2Stats = statistics.find((player) => player.id === game.player_2);

  const player1Score = formValues.score_player_1;
  const player2Score = formValues.score_player_2;
  const hasWinner = validateScore(player1Score, player2Score);

  const winner = hasWinner
    ? player1Score > player2Score
      ? player1
      : player2
    : undefined;

  useEffect(() => {
    if (hasWinner) {
      onSubmit(formValues, winner);
    }
  }, [hasWinner]);

  if (!player1 || !player2 || !player1Stats || !player2Stats) {
    return (
      <Notification color="red">
        There was an error. We are investigating...
      </Notification>
    );
  }

  return (
    <Flex direction="column" gap="4">
      <form>
        <Flex direction="column" gap="2">
          <Grid gap="4" columns={{ initial: "1", xs: "2" }}>
            <PlayerCard
              testId="player-1"
              player={player1}
              ranking={player1Stats.ranking!}
              score={player1Score}
              onScore={() => {
                setFormValues((values) => ({
                  ...values,
                  score_player_1: values.score_player_1 + 1,
                }));
              }}
              isWinner={winner?.id === player1.id}
              disabled={isLoading || hasWinner}
            />

            <PlayerCard
              testId="player-2"
              player={player2}
              ranking={player2Stats.ranking!}
              score={player2Score}
              onScore={() => {
                setFormValues((values) => ({
                  ...values,
                  score_player_2: values.score_player_2 + 1,
                }));
              }}
              isWinner={winner?.id === player2.id}
              disabled={isLoading || hasWinner}
            />
          </Grid>
        </Flex>
      </form>

      <Notification color="blue">
        A game is played until one of the players scores 11 points or if there
        is a 2 point difference after the score was tied (10:10).
      </Notification>

      {hasWinner && (
        <Box>
          <Button onClick={resetGame}>Start new game</Button>
        </Box>
      )}
    </Flex>
  );
}
