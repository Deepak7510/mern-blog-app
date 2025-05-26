import React, { useState } from "react";
import InputSearchBar from "../InputSearchBar";
import { LogInIcon, LogOut, SearchIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, resetTokenAndCredantial } from "@/redux/auth-slice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  routeAdminManageDashBoard,
  RouteSignIn,
  RouteUserIndexBlogs,
  RouteUserManageBlogs,
  RouteUserProfile,
} from "@/helpers/route";

import toast from "react-hot-toast";
import { ModeToggle } from "@/components/common/mode-toggle";
import AppLogo from "@/components/common/AppLogo";
import { useTheme } from "@/components/common/theme-provider";

export const TopbarRightSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        sessionStorage.removeItem("token");
        dispatch(resetTokenAndCredantial());
        navigate("/");
      }
    });
  }
  return (
    <div>
      {isAuthenticated ? (
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
            {user?.role === "admin" ? (
              <DropdownMenuItem asChild>
                <Link to={routeAdminManageDashBoard}>Admin Dashboard</Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className="rounded-full" asChild>
          <Link to={RouteSignIn}>
            <LogInIcon /> Sign In
          </Link>
        </Button>
      )}
    </div>
  );
};

const UserHeader = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  return (
    <header className="bg-white dark:bg-neutral-950 border-gray-200 dark:border-gray-800 flex justify-between items-center border-b-2 py-1.5 px-3 md:px-10 fixed z-10 top-0 w-full">
      {showSearchInput ? (
        <div className="flex gap-2 w-full px-5">
          <div className="w-full">
            <InputSearchBar />
          </div>
          <button onClick={() => setShowSearchInput(false)}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <div>
            <Link to={RouteUserIndexBlogs}>
              <AppLogo />
            </Link>
          </div>
          <div className="flex gap-2 md:gap-5 items-center">
            <div className="hidden md:block">
              <InputSearchBar />
            </div>
            <button
              onClick={() => setShowSearchInput(true)}
              className="md:hidden"
              variant={"icon"}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <ModeToggle />
            <TopbarRightSide />
          </div>
        </>
      )}
    </header>
  );
};

export default UserHeader;
