import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const Navbar = () => {
  const [navItem, setNavItem] = useState(false);

  const toggle = () => {
    setNavItem(!navItem);
  };
  return (
    <>
      <div className="w-full h-[80px] flex justify-center items-center">
        <div className="w-[90%] h-[50px] ">
          <div className="h-[100%] flex justify-between items-center">
            <div>
              <Link
                to={"/"}
                className="text-2xl md:text-3xl cursor-pointer font-sans"
              >
                MyUser
              </Link>
            </div>
            <div className="hidden md:flex">
              <div>
                <ul className="flex text-md lg:text-xl md:space-x-8 lg:space-x-12 cursor-pointer font-sans">
                  <Link to={"/"}>About Me</Link>
                  <Link to={"/allUsers"}>Users Demo</Link>
                  <li>Admin Area</li>
                  <li>How it works</li>
                </ul>
              </div>
            </div>
            <div className="flex md:hidden">
              <button onClick={toggle}>
                {navItem ? (
                  <MdClose size={25} />
                ) : (
                  <GiHamburgerMenu size={25} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {navItem ? (
        <motion.div
          className="w-full h-[500px] shadow-md flex justify-start items-center bg-blue-900 text-white"
          initial={{
            y: -400,
          }}
          animate={{
            y: 0,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className="w-full h-[400px]  flex items-center justify-center">
            <div className="w-full h-[300px] flex flex-col items-center ">
              <div className="flex flex-col justify-center items-center ">
                <ul className="flex flex-col text-xl space-y-8 cursor-pointer font-sans">
                  <Link to={"/"} className="text-center">
                    About Me
                  </Link>
                  <Link to={"/allUsers"} className="text-center">
                    Users Demo
                  </Link>
                  <li className="text-center">Admin Area</li>
                  <li className="text-center">How it works</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
