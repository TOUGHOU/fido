import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

const render = () => {
  return renderToString(
    <StaticRouter location={"/guide"}>
      <App />
    </StaticRouter>
  );
};

export default render;
