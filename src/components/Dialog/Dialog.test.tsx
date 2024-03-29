import { vi, describe, test, expect } from "vitest";
import { Dialog } from "./Dialog";
import { Dialog as RadixDialog } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";

const WithRootAndDefaults = ({
  title = "Title",
  description = "Description",
  onConfirm = () => null,
  ...rest
}: Partial<React.ComponentProps<typeof Dialog>>) => (
  <RadixDialog.Root open>
    <Dialog
      title={title}
      description={description}
      onConfirm={onConfirm}
      {...rest}
    >
      Content
    </Dialog>
  </RadixDialog.Root>
);

describe("Dialog", () => {
  test("renders elements", async () => {
    render(<WithRootAndDefaults>Content</WithRootAndDefaults>);

    expect(screen.getByText("Title")).not.toBeNull();
    expect(screen.getByText("Description")).not.toBeNull();
    expect(screen.getByText("Content")).not.toBeNull();
    expect(screen.getByText("Confirm")).not.toBeNull();
    // cancel should not be rendered
    expect(screen.queryByText("Cancel")).toBeNull();
  });

  test("renders cancel button", () => {
    render(<WithRootAndDefaults onCancel={() => {}} />);
    expect(screen.getByText("Cancel")).not.toBeNull();
  });

  test("renders custom labels", () => {
    render(
      <WithRootAndDefaults
        onCancel={() => null}
        confirmButtonLabel="Yes"
        cancelButtonLabel="No"
      />
    );
    expect(screen.getByText("Yes")).not.toBeNull();
    expect(screen.getByText("No")).not.toBeNull();
  });

  test("calls onConfirm", () => {
    const onConfirm = vi.fn();
    render(<WithRootAndDefaults onConfirm={onConfirm} />);
    screen.getByText("Confirm").click();
    expect(onConfirm).toHaveBeenCalled();
  });

  test("calls onCancel", () => {
    const onCancel = vi.fn();
    render(<WithRootAndDefaults onCancel={onCancel} />);
    screen.getByText("Cancel").click();
    expect(onCancel).toHaveBeenCalled();
  });
});
