import useFetch from "@/helpers/useFetch";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useNavigate, useParams } from "react-router-dom";
import { RouteUserBlogByCategory } from "@/helpers/route";

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
      <CardHeader>
        <CardTitle className={"text-xl font-bold"}>
          Recommmended Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap gap-2 w-full">
          {loading ? (
            Array(10)
              .fill(null)
              .map((_, index) => {
                return <Skeleton className={"px-6 w-40 h-8 rounded-full"} />;
              })
          ) : categoryData && categoryData.length > 0 ? (
            categoryData.map((item) => {
              return (
                <Button
                  onClick={() => navigate(RouteUserBlogByCategory(item.slug))}
                  variant={"outline"}
                  size={"sm"}
                  className={`rounded-full ${
                    category && category === item.slug
                      ? "bg-black text-white hover:bg-black hover:text-white"
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
