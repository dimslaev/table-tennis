import {
  Dialog as RadixDialog,
  ButtonProps,
  Flex,
  Button,
} from "@radix-ui/themes";

type Props = RadixDialog.ContentProps & {
  title: string;
  description?: string;
  onConfirm?: () => void;
  confirmButtonLabel?: string;
  confirmButtonProps?: Omit<ButtonProps, "children">;
  onCancel?: () => void;
  cancelButtonLabel?: string;
  cancelButtonProps?: Omit<ButtonProps, "children">;
};

export const Dialog = (props: Props) => {
  const {
    title,
    description,
    children,
    onConfirm,
    confirmButtonLabel = "Confirm",
    confirmButtonProps,
    onCancel,
    cancelButtonLabel = "Cancel",
    cancelButtonProps,
    ...rest
  } = props;

  return (
    <RadixDialog.Content maxWidth="450px" {...rest}>
      <RadixDialog.Title>{title}</RadixDialog.Title>
      {description && (
        <RadixDialog.Description size="2">
          {description}
        </RadixDialog.Description>
      )}

      {children && (
        <Flex direction="column" gap="3" mt="3">
          {children}
        </Flex>
      )}

      {(onConfirm || onCancel) && (
        <Flex gap="3" mt="4" justify="end">
          {onCancel && (
            <RadixDialog.Close>
              <Button
                {...cancelButtonProps}
                variant="soft"
                color="gray"
                onClick={onCancel}
              >
                {cancelButtonLabel}
              </Button>
            </RadixDialog.Close>
          )}
          {onConfirm && (
            <RadixDialog.Close>
              <Button {...confirmButtonProps} onClick={onConfirm}>
                {confirmButtonLabel}
              </Button>
            </RadixDialog.Close>
          )}
        </Flex>
      )}
    </RadixDialog.Content>
  );
};
