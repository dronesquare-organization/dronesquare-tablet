import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Projects from "../pages/projects";
import MultiView from "../pages/multiview";
import Test from "../pages/test";
import Error404 from "../pages/error404";

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
    path: "test",
    element: <Test />,
  },
  {
    path: "multiview/:projectId",
    element: <MultiView />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
