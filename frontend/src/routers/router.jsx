import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Blog from "../components/Blog";
import About from "../components/About";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
            path: "/blog",
            element: <Blog />,
        },
        {
            path: "/about",
            element: <About />,
        },
      ],
    },
  ]);

export default router;