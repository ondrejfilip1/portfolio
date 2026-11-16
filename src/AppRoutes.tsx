import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";

export default function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/*" Component={NotFound} />
        <Route path="/" Component={Home} />
        <Route path="/experience" Component={Experience} />
        <Route path="/contact" Component={Contact} />
      </Routes>
    </BrowserRouter>
  );
}
