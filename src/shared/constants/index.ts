import { join } from "path";

/**
 * 项目根目录
 */
export const PACKAGE_ROOT = join(__dirname, "..");
/**
 * 运行时目录
 */
export const RUNTIME_PATH = join(PACKAGE_ROOT, "src", "runtime");
/**
 * html模板路径
 */
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");
/**
 * 客户端入口路径
 */
export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, "client-entry.tsx");
/**
 * 服务端入口路径
 */
export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, "ssr-entry.tsx");
