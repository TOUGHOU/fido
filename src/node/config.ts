import { resolve } from "path";
import fs from "fs-extra";
import { loadConfigFromFile } from "vite";

import type { UserConfig, SiteConfig } from "shared/types";

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

function getConfigPath(root: string) {
  try {
    const supportedFileNames = ["config.ts", "config.js"];
    const configPath = supportedFileNames
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);

    return configPath;
  } catch (err) {
    console.error(`get config file failed, cause: ${err} `);
  }
}

export function resolveSiteData(userConfig: UserConfig): UserConfig {
  const {
    title = "fido",
    description = "Component Develop Tools",
    themeConfig = {},
    vite = {}
  } = userConfig;

  return {
    title,
    description,
    themeConfig,
    vite
  };
}

export async function resolveConfig(
  root: string,
  command: "serve" | "build",
  mode: "development" | "production"
): Promise<SiteConfig> {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  const siteConfig: SiteConfig = {
    root,
    configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };

  return siteConfig;
}

export async function resolveUserConfig(
  root: string,
  command: "serve" | "build",
  mode: "development" | "production"
) {
  const configPath = getConfigPath(root);
  // 获取配置文件内容
  const configFileContent = await loadConfigFromFile(
    {
      command,
      mode
    },
    configPath,
    root
  );

  if (configFileContent) {
    const { config } = configFileContent;
    const rawConfig = config as RawConfig;

    const userConfig = await (typeof rawConfig === "function"
      ? rawConfig()
      : rawConfig);

    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

export function defineConfig(config: UserConfig) {
  return config;
}
