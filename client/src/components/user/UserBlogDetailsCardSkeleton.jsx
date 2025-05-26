import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const UserBlogDetailsCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Avatar + author info */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Thumbnail */}
        <Skeleton className="h-52 sm:h-[350px] md:h-[400px] lg:h-[450px] w-full rounded" />

        {/* Blog content */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>

        {/* Like */}
        <Skeleton className="h-6 w-20" />

        <Separator className="my-4" />

        {/* Comment section placeholder */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

export default UserBlogDetailsCardSkeleton;
