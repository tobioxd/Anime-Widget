import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screen/Home";
import AnimeList from "../screen/Animelist";
import About from "../components/About";
import SingleAnime from "../components/animelist/SingleAnime";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadAnime from "../dashboard/UploadAnime";
import ManageAnime from "../dashboard/ManageAnime";
import EditAnime from "../dashboard/EditAnime";
import SignUp from "../components/home/Signup";
import LogIn from "../components/home/LogIn";
import LogOut from "../components/home/LogOut";
import UserProfile from "../components/profile/UserProfile";
import EditInfo from "../components/profile/EditInfor";
import ForgotPassword from "../components/home/ForgotPassword";
import ResetPassword from "../components/home/ResetPassword";
import ManageUser from "../dashboard/ManageUser";

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
        loader: ({ params }) => fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${params.id}`)
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
      {
        path: "profile/:userId",
        element: <UserProfile />,
        loader: ({ params }) => fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${params.userId}`)
      },
      {
        path: "edit-info/:userId",
        element: <EditInfo />,
        loader: ({ params }) => fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${params.userId}`)
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
      },
    ],
  },
  {
    path:"/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard/upload-anime",
        element: <UploadAnime />
      },
      {
        path: "/admin/dashboard/manage-anime",
        element: <ManageAnime />,
      },
      {
        path: "/admin/dashboard/edit-anime/:id",
        element: <EditAnime />,
        loader: ({ params }) => fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/animes/${params.id}`)
      },
      {
        path: "/admin/dashboard/manage-user",
        element: <ManageUser />,
      },
    ],
  },
]);

export default router;
