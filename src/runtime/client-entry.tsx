import { createRoot } from "react-dom/client";
import App from "./App";

const render = () => {
  const rootEl = document.querySelector("#root");

  if (rootEl) {
    createRoot(rootEl).render(<App />);
  } else {
    throw new Error("can not find root element!");
  }
};

render();
