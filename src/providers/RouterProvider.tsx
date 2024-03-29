import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import routes from "@/routes";

const router = createBrowserRouter(routes);

export const RouterProvider = () => <ReactRouterProvider router={router} />;
