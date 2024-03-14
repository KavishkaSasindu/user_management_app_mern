import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";

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
      <Link to={"/allUsers"}>All Users</Link>

      <div className="bg-blue-900 rounded-full w-12 h-12 flex justify-center items-center shadow-2xl">
        <Link to={"create"}>
          <FaUserPlus
            size={25}
            className="text-white text-center flex justify-center items-center w-full h-full"
          />
        </Link>
      </div>

      <Link to={"update"}>Update User</Link>
      <Outlet />
    </div>
  );
};

export default AllUsers;
