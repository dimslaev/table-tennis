import { describe, test, expect } from "vitest";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { render, screen } from "@testing-library/react";
import * as Tooltip from "@radix-ui/react-tooltip";

const Default = ({
  label = "Label",
  ...rest
}: Partial<React.ComponentProps<typeof FieldWrapper>>) => (
  <Tooltip.Provider>
    <FieldWrapper label={label} {...rest}>
      <input />
    </FieldWrapper>
  </Tooltip.Provider>
);

describe("FieldWrapper", () => {
  test("renders elements", async () => {
    render(
      <Default
        required
        tooltip="Tooltip"
        error={{ message: "Error text", type: "value" }}
      />
    );
    expect(screen.getByText("Label")).not.toBeNull();
    expect(screen.getByText("*")).not.toBeNull();
    expect(screen.getByText("Error text")).not.toBeNull();
    expect(screen.getByTestId("tooltip")).not.toBeNull();
    expect(screen.getByRole("textbox")).not.toBeNull();
  });
});
