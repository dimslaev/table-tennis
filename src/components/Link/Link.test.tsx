import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Link } from "@/components/Link/Link";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const WithRouter = (props: Partial<React.ComponentProps<typeof Link>>) => {
  return (
    <MemoryRouter initialEntries={["Current route", "/current-route"]}>
      <Routes>
        <Route
          path="/current-route"
          element={
            <Link href="/target-route" {...props}>
              Link
            </Link>
          }
        />
        <Route path="/target-route" element={<div>Route</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Link", () => {
  test("renders only one link", async () => {
    render(<WithRouter />);
    const allLinks = screen.getAllByRole("link");
    const link = allLinks[0];
    expect(allLinks).not.toBeNull();
    expect(link.getAttribute("href")).toBe("/target-route");
    expect(link.textContent).toBe("Link");
  });

  test("navigates to route", async () => {
    render(<WithRouter />);
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(screen.getByText("Route")).not.toBeNull();
  });
});
