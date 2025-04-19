import BlogCard from "@/components/common/BlogCard";
import BlogCardLoading from "@/components/common/BlogCardLoading";
import useFetch from "@/helpers/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const { data: blogData, loading } = useFetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/blog/search?input=${searchParams.get("input")}`,
    {},
    [searchParams]
  );
  return (
    <div className="m-2 md:m-3">
      <h1 className="m-2 md:m-3 text-xl pb-3 border-b font-medium">
        Search result for : {searchParams.get("input")}
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          Array(6)
            .fill(null)
            .map((_, index) => {
              return <BlogCardLoading key={index} />;
            })
        ) : blogData && blogData.length > 0 ? (
          blogData.map((item) => {
            return <BlogCard key={item._id} blogData={item} />;
          })
        ) : (
          <div className="text-lg font-medium">No Blog</div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

// SearchResult
