import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon, CheckIcon } from "@radix-ui/react-icons";

export const Notification = ({ color, children }: Callout.RootProps) => (
  <Callout.Root color={color} variant="outline">
    <Callout.Icon>
      {color === "green" ? <CheckIcon /> : <InfoCircledIcon />}
    </Callout.Icon>
    <Callout.Text>{children}</Callout.Text>
  </Callout.Root>
);
