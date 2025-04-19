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
const BlogComment = ({ blogId }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    getData,
    loading,
    data: commentList,
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/comment/fetch/${blogId}`,
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/add`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
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

  return (
    <div>
      <div className="flex gap-3 my-2">
        <span className="text-lg font-bold">Comment</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit">Comment</Button>
        </form>
      </Form>
      <div className="my-4 max-h-[600px] overflow-y-auto">
        {commentList && commentList.length > 0 ? (
          commentList.map((item) => {
            return (
              <div key={item._id} className="flex gap-4 my-4">
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
                  <div className="text-md font-medium">
                    @{item.user.name}{" "}
                    <span className="text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>{" "}
                  </div>
                  <div className="text-base">{item.comment}</div>
                </div>
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
