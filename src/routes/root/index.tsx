import { Outlet } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Layout } from "@/components/Layout/Layout";

export function Root() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </QueryProvider>
  );
}
