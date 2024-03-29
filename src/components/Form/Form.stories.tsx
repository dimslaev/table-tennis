import * as React from "react";
import { Form } from "@/components/Form/Form";
import { FieldWrapper } from "@/components/FieldWrapper/FieldWrapper";
import { Button, TextField, Flex, Grid } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import * as z from "zod";

export function Default() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div style={{ maxWidth: "280px" }}>
      <Form onSubmit={console.log} schema={schema}>
        {({ register, formState, reset }) => (
          <>
            <Flex direction="column" gap="2">
              <FieldWrapper label="Email" error={formState.errors["email"]}>
                <TextField.Root {...register("email")}>
                  <TextField.Slot>
                    <EnvelopeClosedIcon />
                  </TextField.Slot>
                </TextField.Root>
              </FieldWrapper>

              <FieldWrapper
                label="Password"
                error={formState.errors["password"]}
              >
                <TextField.Root
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                >
                  <TextField.Slot side="right">
                    <Flex
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      style={{ cursor: "default" }}
                    >
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Flex>
                  </TextField.Slot>
                </TextField.Root>
              </FieldWrapper>
            </Flex>

            <Grid gap="4" columns="2" mt="5">
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                color="gray"
                variant="soft"
                onClick={() => reset()}
              >
                Reset
              </Button>
            </Grid>
          </>
        )}
      </Form>
    </div>
  );
}
