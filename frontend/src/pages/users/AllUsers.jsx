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
    <>
      <Link to={"create"}>Create</Link>
      <Outlet />
      <div className="w-full h-full flex justify-center items-center m-auto pt-5">
        <div className="w-[90%] border flex justify-center ">
          <div className="w-full grid grid-cols-4 space-x-6">
            {getData.user?.map((users) => {
              return (
                <div
                  key={users._id}
                  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {users._id}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <div>{`${users.firstName}  ${users.lastName}`}</div>
                    <div>{`${users.gender} `}</div>
                    <div>{`${users.address} `}</div>
                    <div>{`${users.email} `}</div>
                    <div>{`${users.contact} `}</div>
                  </p>
                  <div className="flex space-x-6">
                    <Link
                      to={"update"}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                    </Link>
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
