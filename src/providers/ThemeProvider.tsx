import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@/style.css";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      appearance="dark"
      grayColor="sand"
      panelBackground="solid"
      radius="small"
    >
      {children}
    </Theme>
  );
};
