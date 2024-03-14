import React from "react";
import { Outlet } from "react-router-dom";
import UsersNav from "../../components/UsersNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllUsers = () => {
  const navigate = useNavigate();

  const [getData, setData] = useState({});

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        const response = await fetch("http://localhost:3000/api/user/getData", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data) {
          console.log(data);
          setData(data);
          toast.success(<div>{data.message}</div>, {
            duration: 3000,
            position: "top-right",
          });
        }
      } else {
        toast.error("You need to sign in", {
          duration: 3000,
          position: "top-right",
        });
        navigate("/signIn");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <UsersNav />
      <div>ALl Users {getData.message} </div>
      <Outlet />
    </div>
  );
};

export default AllUsers;
