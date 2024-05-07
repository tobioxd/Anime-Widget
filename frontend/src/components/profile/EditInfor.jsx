import React, { useState, useEffect } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";

const EditInfor = () => {
  const curuser = localStorage.getItem("user");
  const userId = JSON.parse(curuser)._id;
  const curpassword = localStorage.getItem("password");
  const [user, setUser] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [newpasswordError, setNewpasswordError] = useState("");
  const [newpasswordconfirmedError, setNewpasswordconfirmedError] =
    useState("");

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

  const { name, email, photo, bio } = user;

  console.log(name, email, photo, bio, curpassword);

  const handleUpdateMe = (e) => {
    if (window.confirm("Are you sure you want to update your info?") === true) {
      e.preventDefault();
      const userData = {
        name: e.target.name.value,
        email: e.target.email.value,
        photo: e.target.photo.value,
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

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (e.target.password.value !== curpassword) {
      setPasswordError("Your password is incorrect");
      return;
    } else {
      setPasswordError("");
    }

    if (e.target.newpassword.value.length < 8) {
      setNewpasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setNewpasswordError("");
    }

    if (e.target.newpassword.value === curpassword) {
      setNewpasswordError(
        "New password must be different from the current password"
      );
      return;
    } else {
      setNewpasswordError("");
    }

    if (e.target.newpassword.value !== e.target.passwordconfirmed.value) {
      setNewpasswordconfirmedError(
        "Password and Confirm Password do not match"
      );
      return;
    } else {
      setNewpasswordconfirmedError("");
    }

    if (
      window.confirm("Are you sure you want to update your password?") === true
    ) {
      const userData = {
        passwordCurrent: e.target.password.value,
        password: e.target.newpassword.value,
        passwordConfirm: e.target.passwordconfirmed.value,
      };

      //Send data to the server
      fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/users/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(userData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("password");
          alert("Password updated successfully, please login again");
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* left side*/}
        {
          <div className="mb-20">
            <img
              src={photo}
              alt={name}
              className="w-[420px] h-[630px] rounded-lg object-cover"
            />
          </div>
        }

        {/* right side*/}
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

            <div className="flex gap-8">
              {/*photo*/}
              <div className="lg:w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="photo" value="Photo" />
                </div>
                <TextInput
                  id="photo"
                  placeholder="Your photo"
                  required
                  type="text"
                  defaultValue={photo}
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
          <h2 className="mb-8 text-3xl font-bold mt-10">Change Password </h2>
          <form
            className="flex flex-col flex-wrap gap-4"
            onSubmit={handleUpdatePassword}
          >
            <div className="flex gap-8">
              {/*your password*/}
              <div className="lg:w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your Password" />
                </div>
                <TextInput
                  id="password"
                  placeholder="Your Password"
                  required
                  type="password"
                />
                <label htmlFor="password" className="text-red-500">
                  {passwordError}
                </label>
              </div>
            </div>

            <div className="flex gap-8">
              {/*yournewpassword*/}
              <div className="lg:w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="newpassword " value="Your New Password" />
                </div>
                <TextInput
                  id="newpassword"
                  placeholder="Enter your new password"
                  required
                  type="password"
                />
                <label htmlFor="newpassword" className="text-red-500">
                  {newpasswordError}
                </label>
              </div>
            </div>

            <div className="flex gap-8">
              {/*passwordconfirm*/}
              <div className="lg:w-1/2">
                <div className="mb-2 block">
                  <Label
                    htmlFor="passwordconfirmed"
                    value="Confirm New Password"
                  />
                </div>
                <TextInput
                  id="passwordconfirmed"
                  placeholder="Confirm your new password"
                  required
                  type="password"
                />
                <label htmlFor="passwordconfirmed" className="text-red-500">
                  {newpasswordconfirmedError}
                </label>
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
    </div>
  );
};

export default EditInfor;
