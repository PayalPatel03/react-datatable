import React, { use, useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import axios from "axios";
import Table from "./components/Table";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

function App() {
  const URL = "http://localhost:3000/products";
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    let res = await axios.get(URL);
    setUsers(res.data);
    setEditId("");
    setUser({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId === "") {
      await axios.post(URL, { ...user, id: String(Date.now()) });
      toast.success("User added Successfully!", {});
    } else {
      let res = await axios.put(`${URL}/${editId}`, { ...user });
      toast.info("User Updated Successfully!", {});
    }
    handleFetch();
    setEditId("");
    setUser({});
    navigate("/data");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${URL}/${id}`);
    toast.warn("User Deleted Successfully!", {});

    handleFetch();
  };
  const handleEdit = (id) => {
    let user = users.find((item) => item.id === id);
    setEditId(id);
    setUser(user);
    navigate("/form");
  };

  console.log(user);

  return (
    <>
      {/* <Header />
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
      />
      <Table
        users={users}
        setUsers={setUsers}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
     */}
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/form" />} /> 
        <Route
          path="/form"
          element={
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              user={user}
            />
          }
        />
        <Route
          path="/data"
          element={
            <Table
              users={users}
              setUsers={setUsers}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
