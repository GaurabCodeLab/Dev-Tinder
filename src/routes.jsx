import CommonLayout from "./layout/CommonLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AuthWrapper from "./components/AuthWrapper";
import Connections from "./pages/Connections";
import ConnectionRequest from "./pages/ConnectionRequest";

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
    element: (
      <AuthWrapper>
        <DashboardLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/connections",
        element: <Connections />,
      },
      {
        path: "/dashboard/connection-request",
        element: <ConnectionRequest />,
      },
    ],
  },
];

export default routes;
