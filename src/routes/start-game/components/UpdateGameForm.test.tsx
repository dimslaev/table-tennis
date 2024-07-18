import { test, expect, vi } from "vitest";
import { UpdateGameForm } from "./UpdateGameForm";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import players from "@/api/player/mocks/get-players.json";
import game from "@/api/game/mocks/get-game.json";
import statistics from "@/api/statistics/mocks/get-statistics.json";
import { Statistics } from "@/api/statistics/types";
import { Player } from "@/api/player/types";

const makeStatistics = (stats: Statistics[], players: Player[]) => {
  return stats.map((stat, i) => {
    return {
      ...stat,
      id: players[i].id,
    };
  });
};

test("Update game form", () => {
  const onSubmit = vi.fn();
  const onReset = vi.fn();
  const { container } = render(
    <ThemeProvider>
      <UpdateGameForm
        onSubmit={onSubmit}
        game={game}
        resetGame={onReset}
        players={players}
        statistics={makeStatistics(statistics, players)}
        isLoading={false}
      />
    </ThemeProvider>
  );

  const player1Btn = container.querySelector('[data-testid="player-1"] button');
  const player2Btn = container.querySelector('[data-testid="player-2"] button');

  const clickTimes = (btn: Element, times: number) => {
    for (let i = 0; i < times; i++) {
      fireEvent.click(btn);
    }
  };

  // A game is played until one of the players scores 11 points or if there
  // is a 2 point difference after the score was tied (10:10).

  clickTimes(player1Btn!, 10);
  clickTimes(player2Btn!, 10);

  clickTimes(player1Btn!, 1);

  expect(onSubmit).not.toHaveBeenCalled();

  // clickTimes(player1Btn!, 1)

  // expect(onSubmit).toHaveBeenCalled();
});
