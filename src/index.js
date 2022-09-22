import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import dndflow from "./App";
import DnDFlow from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <DnDFlow />
  </StrictMode>
);
