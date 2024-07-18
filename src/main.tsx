import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "@/providers/RouterProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
);
