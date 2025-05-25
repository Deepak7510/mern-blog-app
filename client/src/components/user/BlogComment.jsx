import React from "react";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useFetch from "@/helpers/useFetch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { commentSchema } from "@/helpers/Validation";
import { Separator } from "../ui/separator";
import { Trash } from "lucide-react";
const BlogComment = ({ blogId }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    getData,
    loading,
    data: commentList,
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/comments/blogs/${blogId}`,
    {},
    []
  );

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(value) {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
    const formData = { ...value, userId: user._id, blogId };
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
      toast.success(result.message);
      form.reset();
      getData();
    } catch (error) {
      console.err(error);
      toast.success(result.message);
    }
  }

  async function handleDeleteComment(getCommnetId) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/${getCommnetId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      if (result.success) {
        getData();
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <div className="flex my-1">
        <span className="text-base font-medium">Add a comment</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Wirte a comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              size={"sm"}
              className={"rounded-full text-xs px-6"}
              type="submit"
            >
              Comment
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-base font-medium">
        {commentList && commentList.length} Comments
      </div>
      <div className="my-1 max-h-[600px] overflow-y-auto">
        {commentList && commentList.length > 0 ? (
          commentList.map((item) => {
            return (
              <div
                key={item._id}
                className="flex justify-between items-center px-2"
              >
                <div className="flex gap-4 my-4">
                  <Avatar className={"w-11.5 h-11.5"}>
                    {item && item?.user.avatar ? (
                      <AvatarImage
                        src={item.user.avatar}
                        className={"object-cover"}
                      />
                    ) : (
                      <AvatarFallback className={"font-bold text-lg"}>
                        {item.user.name[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">
                      {item.user.name + " "}
                      <span className="text-xs">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>{" "}
                    </div>
                    <div className="text-base">{item.comment}</div>
                  </div>
                </div>
                {user && user._id === item.user._id ? (
                  <Button
                    onClick={() => handleDeleteComment(item._id)}
                    size={"sm"}
                    variant={"icon"}
                  >
                    <Trash />
                  </Button>
                ) : null}
              </div>
            );
          })
        ) : (
          <div>No Commnet</div>
        )}
      </div>
    </div>
  );
};

export default BlogComment;
