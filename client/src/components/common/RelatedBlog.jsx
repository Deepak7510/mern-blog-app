import { RouteBlogDetails } from "@/helpers/route";
import useFetch from "@/helpers/useFetch";
import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const RelatedBlog = ({ category, blog }) => {
  const { data: relatedBlogData, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blog/related/${category}/${blog}`,
    {},
    [category, blog]
  );

  return (
    <div>
      <h1 className="font-bold text-lg mb-1">Related Blog</h1>
      <div className="space-y-3">
        {loading ? (
          Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <Skeleton className="w-32 h-16 rounded" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              );
            })
        ) : relatedBlogData && relatedBlogData.length > 0 ? (
          relatedBlogData.map((item) => {
            return (
              <Link
                key={relatedBlogData._id}
                to={RouteBlogDetails(item.category.slug, item.slug)}
                className="flex gap-2"
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-25 h-16 object-cover rounded"
                />
                <div className=" line-clamp-3 text-md">{item.title}</div>
              </Link>
            );
          })
        ) : (
          <div>No Blog</div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlog;
