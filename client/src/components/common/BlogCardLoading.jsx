import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogCardLoading = () => {
  return (
    <Card className="h-full py-1.5 overflow-hidden rounded-lg">
      <CardContent className={"space-y-2 px-1.5"}>
        <Skeleton className="h-52 rounded w-full" />
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCardLoading;
