import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-20 gap-3 p-5  rounded-xl ">
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
