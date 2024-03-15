import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

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

  console.log(getData.user);

  return (
    <>
      <div className="w-full h-[40px] md:[80px]  flex justify-center items-center">
        <div className="w-[90% h-[30px] mt-10 md:h-[40px] flex justify-start items-center space-x-5">
          <div>
            <Link to={"create"}>
              <FaUserPlus
                size={25}
                className="bg-blue-700 text-white rounded-full w-12 h-12 p-3"
              />
            </Link>
          </div>
          <div>
            <Link to={"/allUsers"} className="font-mono">
              All Users
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="w-full h-full flex justify-center items-center m-auto pt-5">
        <div className="w-[90%]   flex justify-center items-center ">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 m-auto">
            {getData.user?.map((users) => {
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 300,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  key={users._id}
                  className="max-w-sm sm:ml-6 p-6 mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {users._id}
                    </h5>
                  </a>
                  <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <div>{`${users.firstName}  ${users.lastName}`}</div>
                    <div>{`${users.userId}`}</div>
                    <div>{`${users.gender} `}</div>
                    <div>{`${users.address} `}</div>
                    <div>{`${users.email} `}</div>
                    <div>{`${users.contact} `}</div>
                  </div>
                  <div className="flex space-x-6">
                    <Link
                      to={""}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                    </Link>
                    <Link
                      to={`update/${users.userId}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
