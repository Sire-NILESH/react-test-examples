import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Posts from "./pages/Posts";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Slider from "./pages/Slider";
import StopWatch from "./pages/StopWatch";
import TrafficLight from "./pages/TrafficLight";
import Users from "./pages/Users";
import Pointer from "./pages/Pointer";
import CompoundComponent from "./pages/CompoundComponent";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Posts />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/traffic-light" element={<TrafficLight />} />
            <Route path="/stop-watch" element={<StopWatch />} />
            <Route path="/pointer" element={<Pointer />} />
            <Route path="/compound-component" element={<CompoundComponent />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-out" element={<Signout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
