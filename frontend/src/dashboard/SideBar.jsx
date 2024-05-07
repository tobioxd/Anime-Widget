import {
  Card,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

import userImg from "../assets/profilepic/avt.jpg";

export function DefaultSidebar() {

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 text-center">
        <img src={userImg} alt="Logo" className="mr-2" />
        <Typography variant="h5" color="blue-gray" className="text-2xl">
          tobioxd
        </Typography>
      </div>
      <List className="text-lg">
        <ListItem className="text-lg ">
          <a href="/admin/dashboard/upload-anime" className="text-lg">Upload Anime</a>
        </ListItem>
      </List>
      <List className="text-lg">
        <ListItem className="text-lg">
          <a href="/admin/dashboard/manage-anime" className="text-lg">Manage Anime</a>
        </ListItem>
      </List>
      <List className="text-lg">
        <ListItem className="text-lg">
          <a href="/admin/dashboard/manage-user" className="text-lg">Manage User</a>
        </ListItem>
      </List>
      <List className="text-lg">
        <ListItem className="text-lg">
          <a href="/" className="text-lg">Home</a>
        </ListItem>
      </List>
      <List className="text-lg">
        <ListItem className="text-lg">
          <a onClick={handleLogOut} className="text-lg">Log Out</a>
        </ListItem>
      </List>
    </Card>
  );
}

export default DefaultSidebar;
