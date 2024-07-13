import { RouteObject } from "react-router-dom";
import { Root } from "@/routes/root";
import { CreateGame } from "@/routes/create-game";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <CreateGame /> },
      {
        path: "/start-game",
        element: "Start game",
      },
      {
        path: "/create-player",
        element: "Create player",
      },
      {
        path: "/stats",
        element: "Statistics",
      },
    ],
  },
];

export default routes;
