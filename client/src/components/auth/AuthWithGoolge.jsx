import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import auth, { googleProvider } from "@/helpers/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { checkAuth, googleLogin } from "@/redux/auth-slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthWithGoolge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGoogleAuth() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user) {
        return toast.error("Authentication failed.");
      }
      const formData = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };
      const data = await dispatch(googleLogin(formData));
      if (data.payload.success) {
        toast.success(data.payload.message);
        const token = JSON.parse(sessionStorage.getItem("token"));
        dispatch(checkAuth(token));
        return navigate("/");
      } else {
        toast.error(data.payload.message);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/network-request-failed":
          toast.error("No internet! Check connection.");
          break;
        case "auth/internal-error":
          toast.error("Something went wrong!");
          break;
        default:
          toast.error("Login failed! Try again.");
      }
    }
  }

  return (
    <>
      <div>
        <Button
          onClick={handleGoogleAuth}
          size={"lg"}
          className={"w-full mb-2 rounded-full"}
          variant={"outline"}
        >
          Continue with Google
        </Button>
      </div>
      <div className=" relative my-2">
        <Separator />
        <div className="bg-white dark:bg-neutral-950 absolute transform select-none translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%]">
          Or
        </div>
      </div>
    </>
  );
};

export default AuthWithGoolge;
