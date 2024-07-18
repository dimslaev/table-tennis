import { useState, ChangeEvent, FormEvent } from "react";
import { Flex, Grid, TextField, Button } from "@radix-ui/themes";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { PlayerCreate } from "@/api/player/types";
import * as z from "zod";

const defaultValues: PlayerCreate = {
  avatar_url: "",
  first_name: "",
  last_name: "",
};

const schema = z.object({
  first_name: z.string().min(1, "Please add first name"),
  last_name: z.string().min(1, "Please add last name"),
});

export function Form({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: PlayerCreate) => void;
  isLoading: boolean;
}) {
  const [values, setValues] = useState<PlayerCreate>(defaultValues);

  const [errors, setErrors] = useState<
    Partial<Record<keyof PlayerCreate, string>>
  >({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]:
        type === "number" && value
          ? parseInt(value)
          : type === "number"
            ? ""
            : value,
    }));
  };

  const validateForm = (): boolean => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorObject = e.errors.reduce(
          (acc, error) => {
            acc[error.path[0] as keyof PlayerCreate] = error.message;
            return acc;
          },
          {} as Partial<Record<keyof PlayerCreate, string>>
        );
        setErrors(errorObject);
      }
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
      setValues(defaultValues);
    } else {
      console.log("Errors:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="2">
        <Grid gap="4" columns="2">
          <FieldWrapper label="First name" error={errors.first_name}>
            <TextField.Root
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
            />
          </FieldWrapper>

          <FieldWrapper label="Last name" error={errors.last_name}>
            <TextField.Root
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
            />
          </FieldWrapper>
        </Grid>
      </Flex>

      <Button type="submit" mt="4" loading={isLoading} style={{ width: 120 }}>
        Create player
      </Button>
    </form>
  );
}
