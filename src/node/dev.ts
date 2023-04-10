import { createServer as createViteDevServer } from "vite";
import pluginReact from "@vitejs/plugin-react";

import { indexHtmlPlguin } from "plugins/index-html";
import { pluginConfig } from "plugins/plugin-config";
import { pluginRoutes } from "plugins/plugin-routes";
import { resolveConfig } from "./config";
import { PACKAGE_ROOT } from "shared/constants";

const createDevServer = async (root = process.cwd(), restartServer) => {
  const config = await resolveConfig(root, "serve", "development");

  return createViteDevServer({
    root: PACKAGE_ROOT,
    plugins: [
      indexHtmlPlguin(),
      pluginReact({ jsxRuntime: "automatic" }),
      pluginConfig(config, restartServer),
      pluginRoutes({
        root: config.root
      })
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
