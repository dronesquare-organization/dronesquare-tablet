import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Projects from "../pages/projects";
import MultiView from "../pages/multiview";
import Test from "../pages/test";

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
]);

export default router;
