import { cac } from "cac";
import path = require("path");
import { createDevServer } from "./dev";

const { version } = require("../../package.json");

const cli = cac("fido").version(version).help();

cli
  .command("[root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    const rootPath = root ? path.resolve(root) : process.cwd();
    const server = await createDevServer(rootPath);

    await server.listen();
    server.printUrls();
  });

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    console.log("build", root);
  });

cli.parse();
