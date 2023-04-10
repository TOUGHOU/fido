import fg from "fast-glob";
import { normalizePath } from "vite";
import path from "path";

interface RouteMeta {
  routePath: string;
  absolutePath: string;
}

export class RouteService {
  #scanDir: string;
  #routeData: RouteMeta[] = [];

  constructor(dir: string) {
    this.#scanDir = dir;
  }

  async init() {
    fg.sync(["**/*.{js,jsx,ts,tsx,md,mdx}"], {
      cwd: this.#scanDir,
      absolute: true,
      ignore: ["**/node_modules/**", "**/build/**", "config.ts"]
    })
      .sort()
      .forEach((filePath) => {
        const fileRelativePath = normalizePath(
          path.relative(this.#scanDir, filePath)
        );

        const routePath = this.normalizeRoutePath(fileRelativePath);

        this.#routeData.push({
          routePath: routePath,
          absolutePath: filePath
        });
      });
  }

  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  }

  normalizeRoutePath(path: string) {
    const routePath = path.replace(/\.(.*)?$/, "".replace(/index$/, ""));

    return routePath.startsWith("/") ? routePath : `/${routePath}`;
  }

  generateRoutesCode() {
    return `
import React from 'react';
import loadable from '@loadable/component';

${this.#routeData
  .map((route, index) => {
    return `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
  })
  .join("\n")}

export const routes = [
${this.#routeData
  .map((route, index) => {
    return `{ path: '${route.routePath}', element: React.createElement(Route${index})}`;
  })
  .join(",\n")}
];
`;
  }
}
