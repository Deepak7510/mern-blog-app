import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useFetch from "@/helpers/useFetch";
import LatestBlogTile from "./LatestBlogTile";

const LatestBlogCard = () => {
  const { data: leatestBlogsList, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/latest`,
    {},
    []
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          ""
        ) : leatestBlogsList && leatestBlogsList.length > 0 ? (
          leatestBlogsList.map((item) => {
            return <LatestBlogTile blogDetails={item} key={item._id} />;
          })
        ) : (
          <div>No Leatest Blog</div>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestBlogCard;
