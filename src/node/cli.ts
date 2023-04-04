import { cac } from "cac";
import { resolve } from "path";

import { build } from "./build";
import { resolveConfig } from "./config";

const cli = cac("fido").version("0.0.1").help();

cli
  .command("[root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    const createServer = async () => {
      const { createDevServer } = await import("./dev.js");
      // const rootPath = root ? resolve(root) : process.cwd();
      const server = await createDevServer(root, async () => {
        await server.close();
        await createServer();
      });

      await server.listen();
      server.printUrls();
    };

    await createServer();
  });

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    try {
      const rootPath = resolve(root);
      const config = await resolveConfig(rootPath, "build", "production");
      await build(rootPath, config);
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
