import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/route";

const BlogCard = ({ blogData }) => {
  const formattedDate = format(
    new Date(blogData.createdAt),
    "dd-MM-yyyy HH:mm a"
  );

  return (
    <Link to={RouteBlogDetails(blogData.category.slug, blogData.slug)}>
      <Card className="h-full py-1.5 overflow-hidden rounded-lg">
        <CardContent className={"space-y-0.5 px-1.5"}>
          <div className="h-52 rounded-lg overflow-hidden">
            <img
              src={blogData.thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2 space-y-0.5">
            <div className="flex gap-3 items-center">
              <Avatar className={"w-8 h-8"}>
                {blogData && blogData?.user.avatar ? (
                  <AvatarImage
                    src={blogData.user.avatar}
                    className={"object-cover"}
                  />
                ) : (
                  <AvatarFallback className={"font-bold text-lg"}>
                    {blogData.user.name[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="text-md font-normal">{blogData.user.name}</div>
              </div>
            </div>

            <div className="line-clamp-1 font-medium text-md">
              {blogData.title}
            </div>

            <div className="flex gap-1 items-center font-medium">
              <div className="text-xs">
                Last update :&nbsp;<span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
