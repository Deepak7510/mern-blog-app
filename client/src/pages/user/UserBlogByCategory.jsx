import { Button } from "@/components/ui/button";
import BlogCardTile from "@/components/user/BlogCardTile";
import CategoryListCard from "@/components/user/CategoryListCard";
import LatestBlogCard from "@/components/user/LatestBlogCard";
import useFetch from "@/helpers/useFetch";
import { Grid2x2, Rows2 } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UserBlogByCategory = () => {
  const [cardLayout, setCardLayout] = useState(2);

  const { category } = useParams();

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/category/${category}`,
    {},
    [category]
  );

  return (
    <div>
      <div className="flex justify-between items-center my-2.5">
        <h1 className="text-2xl font-bold">{data?.category}</h1>
        <div className="flex gap-3 items-center">
          <div className="text-lg font-medium text-gray-600">View :</div>
          <Button
            onClick={() => setCardLayout(1)}
            size={"sm"}
            className={"cursor-pointer"}
            variant={"outline"}
          >
            <Rows2 />
          </Button>
          <Button
            onClick={() => setCardLayout(2)}
            size={"sm"}
            className={"cursor-pointer"}
            variant={"outline"}
          >
            <Grid2x2 />
          </Button>
        </div>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
        <div className="md:col-span-2">
          <div
            className={`grid grid-cols-1 lg:${
              cardLayout === 1
                ? "grid-cols-1"
                : cardLayout === 2
                ? "grid-cols-2"
                : ""
            } gap-3.5`}
          >
            {loading ? (
              <div>ff</div>
            ) : data &&
              data.categoryBlogList &&
              data.categoryBlogList.length > 0 ? (
              data.categoryBlogList.map((item) => {
                return (
                  <BlogCardTile
                    cardLayout={cardLayout}
                    blogDetails={item}
                    key={item._id}
                  />
                );
              })
            ) : (
              <div>No Blog</div>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <CategoryListCard />
          <LatestBlogCard />
        </div>
      </div>
    </div>
  );
};

export default UserBlogByCategory;
