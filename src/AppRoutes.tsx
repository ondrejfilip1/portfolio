import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" Component={NotFound} />
        <Route path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
}
