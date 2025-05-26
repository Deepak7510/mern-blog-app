import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BlogCardTileSkeleton = ({ cardLayout }) => {
  return (
    <Card className="h-full py-1.5 overflow-hidden rounded-lg">
      <CardContent
        className={`px-1.5 flex ${
          cardLayout === 2 ? "flex-col gap-1" : "flex-row gap-3"
        }`}
      >
        <div
          className={`h-56 ${
            cardLayout === 2 ? "w-full" : "w-96"
          } rounded-lg overflow-hidden`}
        >
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-2 space-y-2 w-full">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex justify-between w-full items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCardTileSkeleton;
