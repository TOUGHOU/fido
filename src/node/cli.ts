import { cac } from "cac";
import { resolve } from "path";

import { createDevServer } from "./dev";
import { build } from "./build";

const cli = cac("fido").version("0.0.1").help();

cli
  .command("[root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    const rootPath = root ? resolve(root) : process.cwd();
    const server = await createDevServer(rootPath);

    await server.listen();
    server.printUrls();
  });

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    try {
      await build(resolve(root));
    } catch (e) {
      console.log(e);
    }
  });

cli.parse();
