import React from "react";
import { Skeleton } from "../ui/skeleton";

const LatestBlogTileSkeleton = () => {
  return (
    <div className="flex mb-4 gap-4">
      {/* Image Skeleton */}
      <Skeleton className="h-16 w-30 rounded-lg" />

      {/* Text Skeletons */}
      <div className="w-full space-y-1">
        <Skeleton className="h-4 w-3/4" /> {/* Title */}
        <Skeleton className="h-3 w-1/2" /> {/* Author */}
        <Skeleton className="h-3 w-1/3" /> {/* Date */}
      </div>
    </div>
  );
};

export default LatestBlogTileSkeleton;
