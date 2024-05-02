import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./screen/HomeScreen";
import Login from "./screen/LoginScreen";
import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
       <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />         
          </Routes>
          <ToastContainer position="top-center"/>
       </Router>
    </>
  )
}

export default App;
