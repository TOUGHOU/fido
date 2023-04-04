import { join, relative } from "path";
import type { Plugin } from "vite";
import { SiteConfig } from "shared/types";
import { PACKAGE_ROOT } from "shared/constants";

const SITE_DATA_ID = "fido:site-data";

export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: "fido:config",
    resolveId(id) {
      return id === SITE_DATA_ID ? `$\0${SITE_DATA_ID}` : undefined;
    },
    load(id) {
      return id === `$\0${SITE_DATA_ID}`
        ? `export default ${JSON.stringify(config.siteData)}`
        : undefined;
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const includeFile = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      if (includeFile(ctx.file)) {
        console.log(`\n${relative}`);

        await restartServer?.();
      }
    },
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            "@runtime": join(PACKAGE_ROOT, "src", "runtime", "index.ts")
          }
        }
      };
    }
  };
}
