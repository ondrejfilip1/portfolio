import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initSmoothScroll } from "./lib/gsap";

initSmoothScroll();

if (window.location.hash.startsWith("#/")) {
  const path = window.location.hash.slice(2);
  window.history.replaceState(null, "", import.meta.env.BASE_URL + path);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
