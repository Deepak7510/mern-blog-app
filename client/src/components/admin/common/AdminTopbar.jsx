import { ModeToggle } from "@/components/common/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import {
  RouteSignIn,
  RouteUserManageBlogs,
  RouteUserProfile,
} from "@/helpers/route";
import { logoutUser, resetTokenAndCredantial } from "@/redux/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const { toggleSidebar } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        sessionStorage.removeItem("token");
        dispatch(resetTokenAndCredantial());
        navigate(RouteSignIn);
      }
    });
  }
  return (
    <header className="flex justify-between items-center py-2 top-0 sticky w-full z-50 px-4 lg:px-5 gap-2 border-b dark:border-b-gray-700 bg-white dark:bg-neutral-950 shadow">
      <Button onClick={toggleSidebar} size={"sm"} variant={"icon"}>
        <AlignJustify />
      </Button>

      <div className="flex justify-center items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className={"w-10 h-10"}>
              {user && user?.avatar ? (
                <AvatarImage src={user.avatar} className={"object-cover"} />
              ) : (
                <AvatarFallback className={"font-bold text-lg"}>
                  {user.name[0]}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className={"mr-2 px-5"}>
            <DropdownMenuLabel>
              Welcome {user.name.split(" ")[0]}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={RouteUserProfile}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={RouteUserManageBlogs}>Manage blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminTopbar;
