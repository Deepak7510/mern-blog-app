import { RouteUserBlogDetails } from "@/helpers/route";
import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

const LatestBlogTile = ({ blogDetails }) => {
  const naviagte = useNavigate();
  const title = blogDetails.title
    .split(" ")
    .slice(0, 4)
    .join(" ")
    .concat("...");

  const formattedDate = format(new Date(blogDetails?.createdAt), "dd-MM-yyyy");
  return (
    <div
      onClick={() =>
        naviagte(
          RouteUserBlogDetails(blogDetails.category.slug, blogDetails.slug)
        )
      }
      className="flex mb-4 gap-4 cursor-pointer"
    >
      <div className="h-16 w-30 overflow-hidden rounded-lg">
        <img
          src={blogDetails.thumbnail}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-0 w-full">
        <div className="text-base font-medium">{title}</div>
        <div className="text-sm font-medium text-gray-700">
          {blogDetails.user.name}
        </div>
        <div className="text-xs font-medium text-gray-500">{formattedDate}</div>
      </div>
    </div>
  );
};

export default LatestBlogTile;
