import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import MultiView from "../pages/multiView";
import Projects from "../pages/projects";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Projects />,
  },
  {
    path: "/multiview",
    element: <MultiView />,
  },
]);

export default router;
