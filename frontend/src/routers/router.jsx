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
import Forum from "../screen/Forum";
import Post from "../components/forums/Post";
import Inbox from "../screen/Inbox"

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
      },
      {
        path: "edit-info/:userId",
        element: <EditInfo />,
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
      {
        path: "forum",
        element: <Forum />,
      },
      {
        path: "/forum/:id",
        element: <Post />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
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
      },
      {
        path: "/admin/dashboard/manage-user",
        element: <ManageUser />,
      },
    ],
  },
]);

export default router;
