import { vi, describe, test, expect } from "vitest";
import { Form } from "./Form";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import * as z from "zod";

const Default = ({
  onSubmit = () => null,
  ...rest
}: Partial<React.ComponentProps<typeof Form>>) => (
  <Form onSubmit={onSubmit} {...rest}>
    {({ register }) => (
      <>
        <input type="text" {...register("email")} />
        <button type="submit">Submit</button>
      </>
    )}
  </Form>
);

describe("Form", () => {
  test("renders form", async () => {
    render(<Default />);
    expect(screen.getByRole("form")).not.toBeNull();
    expect(screen.getByRole("textbox")).not.toBeNull();
  });

  test("validates form", async () => {
    const onSubmit = vi.fn();
    const schema = z.object({
      email: z.string().email(),
    });
    render(<Default onSubmit={onSubmit} schema={schema} />);

    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: "test" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });

    fireEvent.input(input, { target: { value: "test@email.com" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { email: "test@email.com" },
        expect.any(Object) // synthetic event
      );
    });
  });
});
