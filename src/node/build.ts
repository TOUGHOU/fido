import { build as viteBuild, type InlineConfig } from "vite";
import { join } from "path";
import type { RollupOutput } from "rollup";
// import ora from "ora";

import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "../constants";
import renderPage from "./render-page";

const getViteConfig = (isServer: boolean, root: string): InlineConfig => {
  return {
    mode: "production",
    root,
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm",
        },
      },
    },
  };
};

const createBundle = async (root: string) => {
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(getViteConfig(false, root)),
      viteBuild(getViteConfig(true, root)),
    ]);

    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.error(e);
  }
};

export const build = async (root = process.cwd()) => {
  // const spinning = ora();
  // spinning.start("Building client and server bundle");

  const [clientBundle] = await createBundle(root);
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");

  const { default: render } = await import(serverEntryPath);

  await renderPage(render, root, clientBundle);
};
