import { Dialog } from "./Dialog";
import { Dialog as RadixDialog, Button } from "@radix-ui/themes";

export function Default() {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>
        <Button>Open Dialog</Button>
      </RadixDialog.Trigger>
      <Dialog title="Title" description="Description" onConfirm={() => {}} />
    </RadixDialog.Root>
  );
}

export function Cancel() {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>
        <Button>Open Dialog</Button>
      </RadixDialog.Trigger>
      <Dialog
        title="Title"
        description="Description"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </RadixDialog.Root>
  );
}

export function CustomLabels() {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>
        <Button>Open Dialog</Button>
      </RadixDialog.Trigger>
      <Dialog
        title="Title"
        description="Description"
        onConfirm={() => {}}
        onCancel={() => {}}
        confirmButtonLabel="Yes"
        cancelButtonLabel="No"
      />
    </RadixDialog.Root>
  );
}
