import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useFetch from "@/helpers/useFetch";
import LatestBlogTile from "./LatestBlogTile";

const RelatedBlogCard = ({ categorySlug, blogSlug }) => {
  const { data: raletedBlogList, loading } = useFetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/blogs/related/${categorySlug}/${blogSlug}`,
    {},
    [categorySlug, blogSlug]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-lg font-medium"}>Raleted Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          ""
        ) : raletedBlogList && raletedBlogList.length > 0 ? (
          raletedBlogList.map((item) => {
            return <LatestBlogTile blogDetails={item} key={item._id} />;
          })
        ) : (
          <div>No Leatest Blog</div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedBlogCard;
