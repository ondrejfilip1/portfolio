import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Experience from "./pages/Experience/Experience";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" Component={NotFound} />
        <Route path="/" Component={Home} />
        <Route path="/experience" Component={Experience} />
      </Routes>
    </HashRouter>
  );
}
