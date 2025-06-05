import useFetch from "@/helpers/useFetch";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useNavigate, useParams } from "react-router-dom";
import { RouteUserBlogByCategory } from "@/helpers/route";
import { Separator } from "../ui/separator";

const CategoryListCard = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data: categoryData, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/categories/active`,
    {},
    []
  );
  return (
    <Card>
      <CardContent>
        <CardTitle className={"text-base lg:text-lg font-medium"}>
          Categories
        </CardTitle>
        <Separator className={"my-2 bg-gray-200 dark:bg-gray-800"} />
        <div className="flex flex-row overflow-x-auto pb-4 md:flex-wrap gap-2 w-full">
          {loading ? (
            Array(10)
              .fill(null)
              .map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    className={"px-6 w-40 h-8 rounded-full"}
                  />
                );
              })
          ) : categoryData && categoryData.length > 0 ? (
            categoryData.map((item) => {
              return (
                <Button
                  key={item._id}
                  onClick={() => navigate(RouteUserBlogByCategory(item.slug))}
                  variant={"outline"}
                  size={"sm"}
                  className={`rounded-full text-xs ${
                    category && category === item.slug
                      ? "bg-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black text-white hover:bg-black hover:text-white"
                      : ""
                  } `}
                >
                  {item.name}
                </Button>
              );
            })
          ) : (
            <div>No Category</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryListCard;
