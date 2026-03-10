import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div className="max-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CommonLayout;
