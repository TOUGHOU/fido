import { createServer as createViteDevServer } from "vite";
import pluginReact from "@vitejs/plugin-react";

import { indexHtmlPlguin } from "plugins/index-html";
import { pluginConfig } from "plugins/pugin-config";
import { resolveConfig } from "./config";
import { PACKAGE_ROOT } from "shared/constants";

const createDevServer = async (root = process.cwd(), restartServer) => {
  const config = await resolveConfig(root, "serve", "development");

  return createViteDevServer({
    root,
    plugins: [
      indexHtmlPlguin(),
      pluginReact(),
      pluginConfig(config, restartServer)
    ],
    server: {
      open: true,
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
};

export { createDevServer };
