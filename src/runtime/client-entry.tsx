import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import siteData from "fido:site-data";

import App from "./App";

const render = () => {
  const rootEl = document.querySelector("#root");

  if (!rootEl) {
    throw new Error("can not find root element!");
  }

  createRoot(rootEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

render();
