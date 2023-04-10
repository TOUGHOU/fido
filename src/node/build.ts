import { build as viteBuild, type InlineConfig } from "vite";
import path, { join } from "path";
import type { RollupOutput } from "rollup";
import pluginReact from "@vitejs/plugin-react";
// import ora from "ora";

import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "../shared/constants";
import renderPage from "./render-page";
import { SiteConfig } from "shared/types";
import { pluginConfig } from "plugins/plugin-config";

const createBundle = async (root: string, config: SiteConfig) => {
  const getViteConfig = (isServer: boolean, root: string): InlineConfig => {
    return {
      mode: "production",
      root,
      plugins: [pluginReact(), pluginConfig(config)],
      ssr: {
        noExternal: ["react-router-dom"]
      },
      build: {
        minify: false,
        ssr: isServer,
        outDir: isServer ? path.join(root, ".temp") : "build",
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: {
            format: isServer ? "cjs" : "esm"
          }
        }
      }
    };
  };
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(getViteConfig(false, root)),
      viteBuild(getViteConfig(true, root))
    ]);

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.error(e);
  }
};

export const build = async (root = process.cwd(), config: SiteConfig) => {
  const [clientBundle] = (await createBundle(root, config)) as [
    RollupOutput,
    RollupOutput
  ];
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");

  const { default: render } = await import(serverEntryPath);

  await renderPage(render, root, clientBundle);
};
