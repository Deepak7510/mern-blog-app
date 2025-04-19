import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import WhiteLogo from "../../assets/logo-white.png";
import {
  Circle,
  HomeIcon,
  MessageCircle,
  Rss,
  Shapes,
  UserIcon,
} from "lucide-react";
import {
  RouteAdminBlog,
  RouteAdminCategory,
  RouteBlogByCategory,
  RouteComments,
  RouteIndex,
  RouteUsers,
} from "@/helpers/route";
import useFetch from "@/helpers/useFetch";
import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { TopbarRightSide } from "./Topbar";

function AppSidebar() {
  const { data: categoryData, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/category/fetch/status-true`,
    {},
    []
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <Sidebar className={"shadow"}>
      <SidebarHeader className={"hidden md:block"}>
        <img src={WhiteLogo} alt="" width={120} />
      </SidebarHeader>
      <SidebarContent className={"bg-white"}>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <HomeIcon />
                <Link to={RouteIndex}>Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {isAuthenticated ? (
              user.role === "admin" ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link className="flex w-full" to={RouteAdminCategory}>
                        <Shapes className="h-5 w-5" />
                        Categories
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link className="flex w-full" to={RouteAdminBlog}>
                        <Rss className="h-5 w-5" />
                        Blogs
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <MessageCircle />
                      <Link to={RouteComments}>Comment</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <UserIcon />
                      <Link to={RouteUsers}>Users</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link className="flex w-full" to={RouteAdminBlog}>
                      <Rss className="h-5 w-5" />
                      Blogs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            ) : null}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className={"w-full h-4"} />
              <Skeleton className={"w-full h-4"} />
              <Skeleton className={"w-full h-4"} />
              <Skeleton className={"w-full h-4"} />
              <Skeleton className={"w-full h-4"} />
              <Skeleton className={"w-full h-4"} />
              <Skeleton className={"w-full h-4"} />
            </div>
          ) : categoryData && categoryData.length > 0 ? (
            categoryData.map((item) => {
              return (
                <SidebarMenu key={item._id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link
                        to={RouteBlogByCategory(item.slug)}
                        className="flex w-full items-center gap-2"
                      >
                        <Circle className="h-3 w-3" />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              );
            })
          ) : null}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={"md:hidden"}>
        <TopbarRightSide />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
