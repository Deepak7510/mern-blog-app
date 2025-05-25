import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <main className="px-20 max-w-[1400px] pt-17 mx-auto">
        <Outlet />
      </main>
      <UserFooter />
    </>
  );
};

export default UserLayout;
