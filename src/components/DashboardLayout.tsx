import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Header />

      <Sidebar />

      <div className="p-4 sm:ml-64 mt-12 sm:pt-12">
        {/* can also suspend the lazy components here, but it looks out of place here */}
        {/* <Suspense fallback={<Loading />}> */}
        <Outlet />
        {/* </Suspense> */}
      </div>
    </>
  );
};

export default DashboardLayout;
