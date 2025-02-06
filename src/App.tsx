import { scan } from "react-scan";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import withSuspense from "./components/withSuspense";
import ProtectedRoute from "./components/ProtectedRoute";

const Posts = withSuspense(lazy(() => import("./pages/Posts")));
const Todos = withSuspense(lazy(() => import("./pages/Todos")));
const ProductsPage = withSuspense(lazy(() => import("./pages/ProductsPage")));
const CounterPage = withSuspense(lazy(() => import("./pages/CounterPage")));
const Pointer = withSuspense(lazy(() => import("./pages/Pointer")));
const Notes = withSuspense(lazy(() => import("./pages/Notes")));
const DragNDrop = withSuspense(lazy(() => import("./pages/DragNDrop")));
const TrafficLight = withSuspense(lazy(() => import("./pages/TrafficLight")));
const Slider = withSuspense(lazy(() => import("./pages/Slider")));
const FileTree = withSuspense(lazy(() => import("./pages/FileTree")));
const StopWatch = withSuspense(lazy(() => import("./pages/StopWatch")));
const NotFound = withSuspense(lazy(() => import("./pages/NotFound")));
const Typist = withSuspense(lazy(() => import("./pages/Typist")));
const FileUploader = withSuspense(
  lazy(() => import("./pages/FileUploaderPage"))
);
const AccordianPage = withSuspense(lazy(() => import("./pages/AccordianPage")));
const Login = withSuspense(lazy(() => import("./pages/Login")));
const AdminPage = withSuspense(lazy(() => import("./pages/AdminPage")));
const Logout = withSuspense(lazy(() => import("./pages/Logout")));
const CompoundComponent = withSuspense(
  lazy(() => import("./pages/CompoundComponent"))
);

const ProtectedAdminPage = (
  <ProtectedRoute allowedRoles={["admin"]}>
    <AdminPage />
  </ProtectedRoute>
);

// React-Scan tool configuration
if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: false, // logs render info to console (default: false)
  });
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<CounterPage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/traffic-light" element={<TrafficLight />} />
            <Route path="/stop-watch" element={<StopWatch />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/file-tree" element={<FileTree />} />
            <Route path="/pointer" element={<Pointer />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/drag-n-drop" element={<DragNDrop />} />
            <Route path="/compound-component" element={<CompoundComponent />} />
            <Route path="/accordian-page" element={<AccordianPage />} />
            <Route path="/typist" element={<Typist />} />
            <Route path="/file-uploader" element={<FileUploader />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-page" element={ProtectedAdminPage} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
