import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/users/user-list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();

    const element = document.querySelector("#root > div > div > div > div");
    if (element) {
      element.remove();
    }
  }, []);

  console.log(allUsers);

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllUsers(allUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Anime</h2>

      {/* Table */}

      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell className="text-left whitespace-nowrap">
            No
          </Table.HeadCell>
          <Table.HeadCell className="text-left whitespace-nowrap">
            id
          </Table.HeadCell>
          <Table.HeadCell className="text-left whitespace-nowrap">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="text-left whitespace-nowrap">
            Email
          </Table.HeadCell>
          <Table.HeadCell className="text-left whitespace-nowrap">
            Password Changed At
          </Table.HeadCell>
          <Table.HeadCell className="text-left whitespace-nowrap">
            <span>Manage</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allUsers.map((user, index) => (
            <Table.Row key={user._id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{user._id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.passwordChangedAt}</Table.Cell>
              <Table.Cell>
                <button
                  className="px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded hover:bg-red-700"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ManageUser;
