import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import withSuspense from "./components/withSuspense";

const Posts = withSuspense(lazy(() => import("./pages/Posts")));
const Counter = withSuspense(lazy(() => import("./pages/Counter")));
const Pointer = withSuspense(lazy(() => import("./pages/Pointer")));
const CompoundComponent = withSuspense(
  lazy(() => import("./pages/CompoundComponent"))
);
const TrafficLight = withSuspense(lazy(() => import("./pages/TrafficLight")));
const Slider = withSuspense(lazy(() => import("./pages/Slider")));
const FileTree = withSuspense(lazy(() => import("./pages/FileTree")));
const StopWatch = withSuspense(lazy(() => import("./pages/StopWatch")));
const NotFound = withSuspense(lazy(() => import("./pages/NotFound")));
const Signin = withSuspense(lazy(() => import("./pages/Signin")));
const Signout = withSuspense(lazy(() => import("./pages/Signout")));

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Counter />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/traffic-light" element={<TrafficLight />} />
            <Route path="/stop-watch" element={<StopWatch />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/file-tree" element={<FileTree />} />
            <Route path="/pointer" element={<Pointer />} />
            <Route path="/compound-component" element={<CompoundComponent />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-out" element={<Signout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
