import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<div />} />
            <Route path="/posts" element={<Posts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
