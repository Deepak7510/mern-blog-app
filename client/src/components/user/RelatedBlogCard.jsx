import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useFetch from "@/helpers/useFetch";
import LatestBlogTile from "./LatestBlogTile";
import { Separator } from "../ui/separator";

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
      <CardContent>
        <CardTitle className={"text-base lg:text-lg font-medium"}>
          Raleted Blogs
        </CardTitle>
        <Separator className={"my-2 bg-gray-200 dark:bg-gray-800"} />
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
