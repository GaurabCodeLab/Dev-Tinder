import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
