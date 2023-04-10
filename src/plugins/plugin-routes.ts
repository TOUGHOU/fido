import { Plugin } from "vite";
import { RouteService } from "./RouteService";

interface RoutesPluginProps {
  root: string;
}

export const ROUTES_ID = "fido:routes";

export function pluginRoutes(options: RoutesPluginProps): Plugin {
  const { root } = options;
  const routeService = new RouteService(root);

  return {
    name: ROUTES_ID,
    async configResolved() {
      await routeService.init();
    },
    resolveId(id: string) {
      if (id === ROUTES_ID) {
        return "\0{id}";
      }
    },
    load(id: string) {
      if (id === `\0${ROUTES_ID}`) {
        const routes = routeService.generateRoutesCode();
        console.log({ routes });

        return routes;
      }
    }
  };
}
