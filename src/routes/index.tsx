import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Projects from "../pages/projects";
import Error404 from "../pages/error404";
import Multiview from "../pages/multiView";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Projects />,
  },
  {
    path: "multiview/:projectId",
    element: <Multiview />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
