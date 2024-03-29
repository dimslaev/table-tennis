import { Flex, FlexProps, Text, Tooltip } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type Props = FlexProps & {
  label: string;
  tooltip?: string;
  error?: FieldError | Merge<FieldErrorsImpl, FieldError> | undefined;
  required?: boolean;
  fullWidth?: boolean;
};

export const FieldWrapper = (props: Props) => {
  const {
    label,
    tooltip,
    error,
    required,
    fullWidth = "true",
    children,
    ...rest
  } = props;

  return (
    <Flex direction="column" gap="1" flexGrow={fullWidth ? "1" : "0"} {...rest}>
      <Flex align="center" gap="1">
        <Text as="label" size="2" color="gray">
          {label}

          {required && (
            <Text as="span" color="red">
              {" "}
              *
            </Text>
          )}
        </Text>

        {tooltip && (
          <Tooltip content={tooltip}>
            <InfoCircledIcon color="gray" data-testid="tooltip" />
          </Tooltip>
        )}
      </Flex>

      {children}

      {typeof error?.message === "string" && (
        <Text color="red" size="1">
          {error.message}
        </Text>
      )}
    </Flex>
  );
};
