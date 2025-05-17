import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";
import "./index.scss";
import "./variables.scss"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
  </StrictMode>
)