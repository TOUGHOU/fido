import { useRoutes } from "react-router-dom";
import { routes as routeConfig } from "fido:routes";

export const Content = () => {
  const routes = useRoutes(routeConfig);

  return routes;
};
