import CommonLayout from "./layout/CommonLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

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
];

export default routes;
