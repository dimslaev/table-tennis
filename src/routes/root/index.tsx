import { Outlet } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export function Root() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryProvider>
  );
}
