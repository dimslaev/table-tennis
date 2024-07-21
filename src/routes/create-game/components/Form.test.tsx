import { test, expect, vi } from "vitest";
import { Form } from "./Form";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import players from "@/api/player/mocks/get-players.json";

test("Create game form", () => {
  const onSubmit = vi.fn();
  const { container } = render(
    <ThemeProvider>
      <Form players={players} isLoading={false} onSubmit={onSubmit} />
    </ThemeProvider>
  );

  const submitBtn = container.querySelector('button[type="submit"]');
  const player1 = container.querySelector('[name="player_1"]');
  const player2 = container.querySelector('[name="player_2"]');
  const p1score = container.querySelector('[name="score_player_1"]');
  const p2score = container.querySelector('[name="score_player_2"]');
  const endTme = container.querySelector('[name="end_time"]');
  fireEvent.click(submitBtn!);

  expect(onSubmit).not.toHaveBeenCalled();
  expect(screen.getByText(/please select first player/i)).not.toBeNull();
  expect(screen.getByText(/please select second player/i)).not.toBeNull();
  expect(
    screen.getByText(/a game is played until one of the players scores 11/i)
  ).not.toBeNull();
  expect(screen.getByText(/end time must be after start time/i)).not.toBeNull();

  fireEvent.change(player1!, { target: { value: players[0].id } });
  fireEvent.change(player2!, { target: { value: players[1].id } });
  fireEvent.change(p1score!, { target: { value: 11 } });
  fireEvent.change(p2score!, { target: { value: 9 } });
  fireEvent.change(endTme!, {
    target: {
      value: new Date(new Date().getTime() + 12 * 1000 * 60 * 60)
        .toISOString()
        .slice(0, 16),
    },
  });

  fireEvent.click(submitBtn!);

  expect(onSubmit).toHaveBeenCalled();
});
