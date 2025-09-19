import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CommonLayout from "./layout/CommonLayout";
import Dashboard from "./pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
