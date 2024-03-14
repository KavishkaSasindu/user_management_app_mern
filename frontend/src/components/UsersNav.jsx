import React from "react";
import { Link } from "react-router-dom";

const UsersNav = () => {
  return (
    <div>
      <div>
        <Link to={"create"}>Create User</Link>
      </div>
    </div>
  );
};

export default UsersNav;
