import { RouteObject } from "react-router-dom";
import { Root } from "@/routes/root";
import { CreateGame } from "@/routes/create-game";
import { CreatePlayer } from "@/routes/create-player";
import { Statistics } from "@/routes/statistics";

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
        element: <CreatePlayer />,
      },
      {
        path: "/stats",
        element: <Statistics />,
      },
    ],
  },
];

export default routes;
