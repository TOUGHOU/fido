import { createRoot } from "react-dom/client";
import siteData from "fido:site-data";

import App from "./App";

const render = () => {
  const rootEl = document.querySelector("#root");
  console.log(siteData);

  if (rootEl) {
    createRoot(rootEl).render(<App />);
  } else {
    throw new Error("can not find root element!");
  }
};

render();
