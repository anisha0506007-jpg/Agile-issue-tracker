import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import CreateTicket from "../pages/CreateTicket";

import { ticketLoader } from "../loaders/ticketLoader";
import { ticketAction } from "../actions/ticketAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        loader: ticketLoader,
        element: <Dashboard />,
      },
      {
        path: "create-ticket",
        element: <CreateTicket />,
        action: ticketAction,
      },
    ],
  },
]);

export default router;