import React from "react";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { RouteUserBlogDetails } from "@/helpers/route";
import { Badge } from "../ui/badge";

const BlogCardTile = ({ blogDetails, cardLayout }) => {
  const navigate = useNavigate();
  const formattedDate = format(
    new Date(blogDetails.createdAt),
    "dd-MM-yyyy HH:mm a"
  );

  const title = blogDetails?.title
    .split(" ")
    .slice(0, 10)
    .join(" ")
    .concat("...");
  return (
    <Card
      onClick={() =>
        navigate(
          RouteUserBlogDetails(blogDetails.category.slug, blogDetails.slug)
        )
      }
      className="h-full py-1.5 overflow-hidden rounded-lg cursor-pointer"
    >
      <CardContent
        className={`px-1.5 flex ${
          cardLayout === 2 ? "flex-col gap-1" : " flex-row gap-3"
        } `}
      >
        <div
          className={`h-56 ${
            cardLayout === 2 ? "w-full" : "w-96"
          } rounded-lg overflow-hidden`}
        >
          <img
            src={blogDetails.thumbnail}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 space-y-0.5">
          <div className="flex gap-2 items-center">
            <Avatar className={"w-8 h-8"}>
              {blogDetails && blogDetails?.user.avatar ? (
                <AvatarImage
                  src={blogDetails.user.avatar}
                  className={"object-cover"}
                />
              ) : (
                <AvatarFallback className={"font-bold text-lg"}>
                  {blogDetails.user.name[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex gap-2 justify-between w-full">
              <div className="text-base font-medium">
                {blogDetails.user.name}
              </div>
              {blogDetails.user.role === "admin" ? (
                <Badge
                  className={"rounded-full text-[0.7rem] px-5"}
                  variant={"outline"}
                >
                  {blogDetails.user.role}
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="text-base font-medium font-sans text-gray-800 truncate">
            {title}
          </div>
          <div className="flex gap-1 items-center font-medium">
            <div className="text-xs">
              Last update :&nbsp;<span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCardTile;
