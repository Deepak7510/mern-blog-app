import BlogCard from "@/components/common/BlogCard";
import BlogCardLoading from "@/components/common/BlogCardLoading";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/helpers/useFetch";
import React from "react";
import { useParams } from "react-router-dom";

const BlogByCategory = () => {
  const { category } = useParams();
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blog/category/${category}`,
    {},
    [category]
  );
  return (
    <div className="m-2 md:m-3">
      {loading && data == null ? (
        <Skeleton className={"w-1/2 h-8 m-2 md:m-3 pb-2 border-b"} />
      ) : (
        <h1 className="text-2xl font-medium m-2 md:m-3 pb-2 border-b">
          {data?.category}
        </h1>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          Array(6)
            .fill(null)
            .map((item, index) => {
              return <BlogCardLoading key={index} />;
            })
        ) : data && data.categoryBlogList.length > 0 ? (
          data?.categoryBlogList.map((item) => {
            return <BlogCard key={item._id} blogData={item} />;
          })
        ) : (
          <div className="text-md font-medium">No Blog</div>
        )}
      </div>
    </div>
  );
};

export default BlogByCategory;
