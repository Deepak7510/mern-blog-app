import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BlocksIcon,
  LayoutDashboard,
  List,
  MessageCircle,
  User,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  routeAdminManageUserBlog,
  routeAdminManageCategory,
  routeAdminManageDashBoard,
  routeAdminManageUser,
  routeAdminManageMessage,
  RouteUserIndexBlogs,
} from "@/helpers/route";
import AppLogo from "@/components/common/AppLogo";

const SidebarAllRoute = [
  {
    label: "Dashboard",
    path: routeAdminManageDashBoard,
    icon: <LayoutDashboard />,
  },
  {
    label: "Manage Categories",
    path: routeAdminManageCategory,
    icon: <List />,
  },
  {
    label: "User Blogs",
    path: routeAdminManageUserBlog,
    icon: <BlocksIcon />,
  },
  {
    label: "Manage Users",
    path: routeAdminManageUser,
    icon: <User />,
  },
  {
    label: "User Messages",
    path: routeAdminManageMessage,
    icon: <MessageCircle />,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  function handleNavigate(getPath) {
    return navigate(getPath);
  }
  return (
    <Sidebar className={"shadow"}>
      <SidebarHeader className={"hidden md:block"}>
        <Link to={RouteUserIndexBlogs}>
          <AppLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent className={"bg-white dark:bg-neutral-950"}>
        <SidebarGroup>
          <SidebarMenu>
            {SidebarAllRoute && SidebarAllRoute.length > 0
              ? SidebarAllRoute.map((item) => {
                  return (
                    <SidebarMenuItem key={item.label}>
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
