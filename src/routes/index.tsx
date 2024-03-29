import { RouteObject } from "react-router-dom";
import { Root } from "@/routes/root";
import { Game } from "@/routes/game";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/", element: <Game /> }],
  },
];

export default routes;
