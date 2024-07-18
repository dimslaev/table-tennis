import { test, expect, vi } from "vitest";
import { CreateGameForm } from "./CreateGameForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import players from "@/api/player/mocks/get-players.json";

test("Create game form", () => {
  const onSubmit = vi.fn();
  const { container } = render(
    <ThemeProvider>
      <CreateGameForm players={players} isLoading={false} onSubmit={onSubmit} />
    </ThemeProvider>
  );

  const submitBtn = container.querySelector('button[type="submit"]');
  const player1 = container.querySelector('[name="player_1"]');
  const player2 = container.querySelector('[name="player_2"]');

  fireEvent.click(submitBtn!);

  expect(onSubmit).not.toHaveBeenCalled();
  expect(screen.getByText(/please select first player/i)).not.toBeNull();
  expect(screen.getByText(/please select second player/i)).not.toBeNull();

  fireEvent.change(player1!, { target: { value: players[0].id } });
  fireEvent.change(player2!, { target: { value: players[1].id } });

  fireEvent.click(submitBtn!);

  expect(onSubmit).toHaveBeenCalled();
});
