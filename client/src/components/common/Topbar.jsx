import React, { useState } from "react";
import WhiteLogo from "../../assets/logo-white.png";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  AlignJustify,
  LogInIcon,
  LogOut,
  SearchIcon,
  XIcon,
} from "lucide-react";
import SearchBox from "./SearchBox";
import { RouteProfile, RouteSignIn } from "@/helpers/route";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetTokenAndCredantial } from "@/redux/auth-slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useSidebar } from "@/components/ui/sidebar";

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
                <Link to={RouteProfile}>Profile</Link>
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

const Topbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { toggleSidebar } = useSidebar();
  return (
    <>
      {showSearch ? (
        <div className="flex justify-between items-center h-16 top-0 sticky w-full z-50 px-4 lg:px-5 gap-2 bg-white shadow">
          <SearchBox />
          <Button onClick={() => setShowSearch(false)} variant={"none"}>
            <XIcon />
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center h-16 top-0 sticky w-full z-50 px-4 lg:px-5 gap-2 bg-white shadow">
          <button
            className="md:hidden text-xl"
            variant="none"
            onClick={toggleSidebar}
          >
            <AlignJustify className="h-7 w-7" />
          </button>
          <div className="md:hidden">
            <img src={WhiteLogo} width={120} alt="" />
          </div>
          <div className="min-w-[400px] hidden md:block">
            <SearchBox />
          </div>
          <div className="hidden md:block">
            <TopbarRightSide />
          </div>
          <div className="md:hidden">
            <Button onClick={() => setShowSearch(true)} variant={"none"}>
              <SearchIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
