import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-[80px] flex justify-center items-center">
        <div className="w-[90%] h-[50px] ">
          <div className="h-[100%] flex justify-between items-center">
            <div>
              <Link to={"/"} className="text-3xl cursor-pointer">
                MyUser
              </Link>
            </div>
            <div>
              <div>
                <ul className="flex text-xl space-x-12 cursor-pointer">
                  <Link to={"/"}>About Me</Link>
                  <Link to={"/allUsers"}>Users Demo</Link>
                  <li>Admin Area</li>
                  <li>How it works</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
