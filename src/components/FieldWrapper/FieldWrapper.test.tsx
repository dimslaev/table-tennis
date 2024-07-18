import { describe, test, expect } from "vitest";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { render, screen } from "@testing-library/react";
import * as Tooltip from "@radix-ui/react-tooltip";

const Default = (props: Partial<React.ComponentProps<typeof FieldWrapper>>) => (
  <Tooltip.Provider>
    <FieldWrapper label="Label" htmlFor="test-input" {...props}>
      <input id="test-input" />
    </FieldWrapper>
  </Tooltip.Provider>
);

describe("FieldWrapper", () => {
  test("renders label and children", async () => {
    render(<Default />);
    const label = screen.getByText("Label");
    const input = screen.getByLabelText(/label/i);
    expect(label).not.toBeNull();
    expect(label.getAttribute("for")).toBe("test-input");
    expect(input).not.toBeNull();
  });

  test("renders error", async () => {
    render(<Default error="Error text" />);
    expect(screen.getByText("Error text")).not.toBeNull();
  });

  test("renders tooltip", async () => {
    render(<Default tooltip="Tooltip" />);
    expect(screen.getByTestId("tooltip")).not.toBeNull();
  });
});
