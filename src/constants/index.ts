import { join } from "path";

/**
 * 项目根目录
 */
export const PROJECT_ROOT = join(__dirname, "..");
/**
 * html模板路径
 */
export const DEFAULT_HTML_PATH = join(PROJECT_ROOT, "template.html");
/**
 * 客户端入口路径
 */
export const CLIENT_ENTRY_PATH = join(
  PROJECT_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);

/**
 * 服务端入口路径
 */
export const SERVER_ENTRY_PATH = join(
  PROJECT_ROOT,
  "src",
  "runtime",
  "ssr-entry.tsx"
);
