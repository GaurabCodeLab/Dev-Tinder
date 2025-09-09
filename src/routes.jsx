import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CommonLayout from "./layout/CommonLayout";

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
    ],
  },
];

export default routes;
