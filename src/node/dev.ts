import { createServer as createViteDevServer } from "vite";
import pluginReact from "@vitejs/plugin-react";

import { indexHtmlPlguin } from "../plugins/index-html";

const createDevServer = async (root = process.cwd()) => {
  return createViteDevServer({
    root,
    plugins: [indexHtmlPlguin(), pluginReact()],
    server: {
      open: true,
    },
  });
};

export { createDevServer };
