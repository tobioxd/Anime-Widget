import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import AnimeList from "../animelist/Animelist";
import About from "../components/About";
import SingleAnime from "../animelist/SingleAnime";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadAnime from "../dashboard/UploadAnime";
import ManageAnime from "../dashboard/ManageAnime";
import EditAnime from "../dashboard/EditAnime";
import SignUp from "../components/home/Signup";
import LogIn from "../components/home/LogIn";
import ForgotPassword from "../components/home/ForgotPassword";
import ResetPassword from "../components/home/ResetPassword";

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
        path: "/anime-list",
        element: <AnimeList />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/anime/:id",
        element: <SingleAnime />,
        loader: ({ params }) => fetch(`http://localhost:3000/api/v1/animes/${params.id}`)
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
        loader: ({ params }) => fetch(`http://localhost:3000/api/v1/users/resetPassword/${params.token}`),
      },
    ],
  },
  {
    path:"/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/upload-anime",
        element: <UploadAnime />,
      },
      {
        path: "/admin/dashboard/manage-anime",
        element: <ManageAnime />,
      },
      {
        path: "/admin/dashboard/edit-anime/:id",
        element: <EditAnime />,
        loader: ({ params }) => fetch(`http://localhost:3000/api/v1/animes/${params.id}`)
      },
    ],
  },
]);

export default router;
