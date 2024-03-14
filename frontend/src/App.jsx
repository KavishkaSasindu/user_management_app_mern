import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AllUsers from "./pages/users/AllUsers";
import Create from "./pages/users/Create";
import UpdateUser from "./pages/users/UpdateUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/allUsers" element={<AllUsers />}>
            <Route path="create" element={<Create />} />
            <Route path="update" element={<UpdateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
