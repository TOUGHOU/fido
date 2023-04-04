import { useRoutes } from "react-router-dom";

const routeConfig = [
  {
    path: "/guide",
    element: () => <div>guide</div>
  }
];

export const Content = () => {
  const routes = useRoutes(routeConfig);

  return routes;
};
