import React, { useState, useEffect } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";

const MyInfor = () => {
  const curuser = JSON.parse(localStorage.getItem("user"));
  const userId = curuser._id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data using the id
    const fetchUser = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email, bio } = user;

  console.log(name, email, bio);

  const handleUpdateMe = (e) => {
    if (window.confirm("Are you sure you want to update your info?") === true) {
      e.preventDefault();
      const userData = {
        name: e.target.name.value,
        email: e.target.email.value,
        bio: e.target.bio.value,
      };

      //Send data to the server
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/updateMe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="w-full my-12">
      <div className="w-3/5 my-12">
        <h2 className="mb-8 text-3xl font-bold">Update Your Info </h2>
        <form
          className="flex flex-col flex-wrap gap-4"
          onSubmit={handleUpdateMe}
        >
          <div className="flex gap-8">
            {/*animename*/}
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                placeholder="Your name"
                required
                type="text"
                defaultValue={name}
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/*email*/}
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="Your email"
                required
                type="email"
                defaultValue={email}
              />
            </div>
          </div>

          <div>
            {/*description*/}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Bio" />
              </div>
              <Textarea
                id="bio"
                placeholder="Your bio ..."
                required
                className="w-full"
                row={4}
                defaultValue={bio}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyInfor;
