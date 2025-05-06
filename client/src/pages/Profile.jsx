import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/helpers/useFetch";
import ChnagePassword from "@/components/common/ChangePassword";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import toast from "react-hot-toast";
import { profileSchema } from "@/helpers/Validation";
import { checkAuth } from "@/redux/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import Loading2 from "@/components/common/Loading2";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: userData } = useSelector((state) => state.auth);
  const [preview, setPriview] = useState(null);
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      avatar: null,
    },
  });
  const { loading, data } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${userData._id}`,
    {},
    [userData]
  );

  useEffect(() => {
    if (data) {
      form.reset({ name: data?.name || "", bio: data?.bio || "" });
    }
  }, [data]);

  const avatar = form.watch("avatar");
  useEffect(() => {
    if (avatar) {
      setPriview(URL.createObjectURL(avatar));
    }
  }, [avatar]);

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    form.setValue("avatar", e.dataTransfer.files[0]);
  }

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("avatar", data.avatar);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update/${userData._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
      toast.success(result.message);
      const token = JSON.parse(sessionStorage.getItem("token"));
      dispatch(checkAuth(token));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className=" grid lg:grid-cols-2 gap-4 m-2 md:m-3">
      {loading ? (
        <Card>
          <CardHeader className={"flex justify-center items-center w-full"}>
            <Skeleton className={"h-22 w-22 lg:h-32 lg:w-32 rounded-full"} />
          </CardHeader>
          <CardContent className={"space-y-3"}>
            <Skeleton className={"w-full h-5"} />
            <Skeleton className={"w-full h-8"} />
            <Skeleton className={"w-full h-5"} />
            <Skeleton className={"w-full h-20"} />
            <Skeleton className={"w-full h-8"} />
            <Skeleton className={"w-full h-8"} />
          </CardContent>
        </Card>
      ) : (
        <Card className={"w-full h-fit sticky top-0"}>
          {form.formState.isSubmitting ? <Loading2 /> : null}
          <CardHeader className={"flex justify-center items-center w-full"}>
            <Label
              htmlFor="profile"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Avatar className={"h-22 w-22 lg:h-32 lg:w-32 group"}>
                {preview ? (
                  <AvatarImage src={preview} className={"object-cover"} />
                ) : data && data.avatar ? (
                  <AvatarImage src={data.avatar} className={"object-cover"} />
                ) : (
                  <AvatarFallback className={"text-5xl font-bold"}>
                    {data?.name[0]}
                  </AvatarFallback>
                )}
                <div className="absolute top-[50%] left-[50%] z-10 transform translate-[-50%]">
                  <CameraIcon className="h-20 w-10 opacity-0 group-hover:opacity-40" />
                </div>
              </Avatar>
              <Input
                id="profile"
                onChange={(e) => {
                  form.setValue("avatar", e.target.files[0]);
                }}
                className={"hidden"}
                type={"file"}
              />
            </Label>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="bio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button className="w-full" type="submit">
                    Save Profile
                  </Button>
                </div>
              </form>
            </Form>
            <div className="my-2 w-full">
              <ChnagePassword />
            </div>
          </CardContent>
        </Card>
      )}
      <Card className={"w-full sticky top-"}></Card>
    </div>
  );
};

export default Profile;
