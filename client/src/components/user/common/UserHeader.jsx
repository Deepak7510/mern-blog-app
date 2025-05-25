import React from "react";
import InputSearchBar from "../InputSearchBar";
import { LogInIcon, LogOut } from "lucide-react";
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
  RouteSignIn,
  RouteUserIndexBlogs,
  RouteUserManageBlogs,
  RouteUserProfile,
} from "@/helpers/route";

import appLogo from "../../../assets/appLogo.svg";
import toast from "react-hot-toast";

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
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className={"w-11.5 h-11.5"}>
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
              <DropdownMenuItem asChild>Billing</DropdownMenuItem>
              <DropdownMenuItem asChild>Team</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden">
            <div className="text-sm font-bold">{user && user.name}</div>
            <div className="text-xs">{user && user.email}</div>
          </div>
        </div>
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
  return (
    <header className="bg-white flex justify-between items-center border-b-2 py-2 px-10 fixed z-10 top-0 w-full">
      <Link to={RouteUserIndexBlogs}>
        <img src={appLogo} alt="" className="object-cover" />
      </Link>
      <div className="flex gap-5 items-center">
        <div>
          <InputSearchBar />
        </div>
        <div>
          <TopbarRightSide />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
