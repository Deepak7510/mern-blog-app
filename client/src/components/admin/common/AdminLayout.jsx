import React from "react";
import { SidebarProvider } from "../../ui/sidebar";

import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full relative">
        <AdminTopbar />
        <div className="min-h-[calc(100vh-40px)] p-3">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
