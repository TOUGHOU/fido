import { readFile } from "fs/promises";
import { Server } from "http";
import type { Plugin } from "vite";
import { DEFAULT_HTML_PATH } from "../constants";

export const indexHtmlPlguin: () => Plugin = () => {
  return {
    name: "fido:index-html",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");

          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    },
  };
};
