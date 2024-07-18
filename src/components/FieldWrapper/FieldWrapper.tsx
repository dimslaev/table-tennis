import { Flex, FlexProps, Text, Tooltip } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type Props = FlexProps & {
  label: string;
  htmlFor?: string;
  error?: string | undefined;
  required?: boolean;
  tooltip?: string;
  fullWidth?: boolean;
};

export const FieldWrapper = (props: Props) => {
  const {
    label,
    htmlFor,
    error,
    required,
    tooltip,
    fullWidth = true,
    children,
    ...rest
  } = props;

  return (
    <Flex direction="column" gap="1" flexGrow={fullWidth ? "1" : "0"} {...rest}>
      <Flex align="center" gap="1">
        <Text as="label" size="2" color="gray" htmlFor={htmlFor}>
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

      {error && (
        <Text color="red" size="1">
          {error}
        </Text>
      )}
    </Flex>
  );
};
