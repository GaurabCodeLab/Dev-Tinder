import CommonLayout from "./layout/CommonLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
