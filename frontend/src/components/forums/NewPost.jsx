import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import TextareaAutosize from "react-textarea-autosize";

const NewPost = () => {
  const privacyOptions = ["public", "private"];

  const [selectedPrivacy, setSelectedPrivacy] = useState(privacyOptions[0]);

  const handleChangeSelectedValue = (e) => {
    console.log(e.target.value);
    setSelectedPrivacy(e.target.value);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const post = form.post.value;
    const privacy = form.privacy.value;

    const postData = {
      title,
      post,
      privacy,
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        alert("Post added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Add new Post</h2>
      <form onSubmit={handleAddPost} className="flex flex-col flex-wrap gap-4">
        <div className="flex gap-8">
          {/*title*/}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Post title"
              required
              type="text"
            />
          </div>

          {/*privacy*/}
          <div className="lg:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="privacy" value="Privacy" />
            </div>
            <select
              id="privacy"
              value={selectedPrivacy}
              onChange={handleChangeSelectedValue}
              className="text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pl-5 text-xs"
            >
              {privacyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*post*/}
        <div className="mb-2 block">
          <Label htmlFor="post" value="Post" />
        </div>
        <TextareaAutosize
          id="post"
          placeholder="Post"
          required
          minRows={3}
          maxRows={15}
        />

        <div className="flex justify-center">
          <Button type="submit" className="bg-sky-400 text-white mt-4 hover:bg-sky-600">
            Add Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
