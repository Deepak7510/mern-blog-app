import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useFetch from "@/helpers/useFetch";
import LatestBlogTile from "./LatestBlogTile";
import { Separator } from "../ui/separator";

const LatestBlogCard = () => {
  const { data: leatestBlogsList, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/latest`,
    {},
    []
  );
  return (
    <Card>
      <CardContent>
        <CardTitle className={"text-base lg:text-lg font-medium"}>
          Latest Blogs
        </CardTitle>
        <Separator className={"my-2 bg-gray-200 dark:bg-gray-800"} />
        <div>
          {loading ? (
            ""
          ) : leatestBlogsList && leatestBlogsList.length > 0 ? (
            leatestBlogsList.map((item) => {
              return <LatestBlogTile blogDetails={item} key={item._id} />;
            })
          ) : (
            <div>No Leatest Blog</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestBlogCard;
