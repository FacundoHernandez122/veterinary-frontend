import React from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <>
      <nav>
        <Link to="/admin/profile" className="text-white me-5 font-extrabold ">
          Profile
        </Link>
        <Link
          to="/admin/change-password"
          className="text-white font-extrabold "
        >
          Change Password
        </Link>
      </nav>
      ;
    </>
  );
}

export default AdminNav;
