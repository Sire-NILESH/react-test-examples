import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Header />

      <Sidebar />

      <div className="p-4 sm:ml-64 mt-12 sm:pt-12">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
