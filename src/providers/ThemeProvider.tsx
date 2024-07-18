import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@/style.css";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      appearance="light"
      grayColor="mauve"
      panelBackground="solid"
      radius="medium"
    >
      {children}
    </Theme>
  );
};
