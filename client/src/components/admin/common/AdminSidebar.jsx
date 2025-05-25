import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../../../assets/appLogo.svg";
import {
  routeAdminManageUserBlog,
  routeAdminManageCategory,
  routeAdminManageDashBoard,
  routeAdminManageUser,
  routeAdminManageMessage,
} from "@/helpers/route";

const SidebarAllRoute = [
  {
    label: "Dashboard",
    path: routeAdminManageDashBoard,
    icon: <LayoutDashboard />,
  },
  {
    label: "Manage Categories",
    path: routeAdminManageCategory,
    icon: <LayoutDashboard />,
  },
  {
    label: "User Blogs",
    path: routeAdminManageUserBlog,
    icon: <LayoutDashboard />,
  },
  {
    label: "Manage Users",
    path: routeAdminManageUser,
    icon: <LayoutDashboard />,
  },
  {
    label: "User Messages",
    path: routeAdminManageMessage,
    icon: <LayoutDashboard />,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  function handleNavigate(getPath) {
    navigate(getPath);
  }
  return (
    <Sidebar className={"shadow"}>
      <SidebarHeader className={"hidden md:block"}>
        <img src={appLogo} alt="" width={120} />
      </SidebarHeader>
      <SidebarContent className={"bg-white dark:bg-neutral-950"}>
        <SidebarGroup>
          <SidebarMenu>
            {SidebarAllRoute && SidebarAllRoute.length > 0
              ? SidebarAllRoute.map((item) => {
                  return (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => handleNavigate(item.path)}
                      >
                        {item.icon}
                        <span> {item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              : null}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className={"md:hidden"}>
        <TopbarRightSide />
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default AdminSidebar;
