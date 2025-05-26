import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BlogComment from "@/components/user/BlogComment";
import BlogLike from "@/components/user/BlogLike";
import CategoryListCard from "@/components/user/CategoryListCard";
import RelatedBlogCard from "@/components/user/RelatedBlogCard";
import useFetch from "@/helpers/useFetch";
import { format } from "date-fns";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const decodeHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.innerHTML;
};
const UserBlogDetailsPage = () => {
  const navigate = useNavigate();
  const { category, blog } = useParams();

  if (!blog || !category) {
    return navigate("/");
  }

  const { data: blogDetails, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/details/${blog}`,
    {},
    [category, blog]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="mb-3 lg:hidden">
          <CategoryListCard />
        </div>
        <Card>
          <CardContent>
            {loading ? (
              ""
            ) : blogDetails ? (
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Avatar className={"w-12 h-12"}>
                      {blogDetails && blogDetails?.user.avatar ? (
                        <AvatarImage
                          src={blogDetails.user.avatar}
                          alt="profile-avatar"
                          className={"object-cover"}
                        />
                      ) : (
                        <AvatarFallback className={"font-bold text-lg"}>
                          {blogDetails.user.name[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="text-base font-medium">
                        {blogDetails.user.name}
                      </div>
                      <div className="text-xs font-medium">
                        Last update :&nbsp;
                        <span>
                          {format(
                            new Date(blogDetails?.createdAt),
                            "dd-MM-yyyy HH:mm a"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-lg my-2 font-medium">
                  {blogDetails.title}
                </div>
                <div className="h-52 sm:h-[350px] md:h-[400px] lg:h-[450px]">
                  <img
                    src={blogDetails.thumbnail}
                    alt="thumnail-image"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div
                  className="content-wrapper my-2"
                  dangerouslySetInnerHTML={{
                    __html: decodeHTML(blogDetails?.content),
                  }}
                ></div>
                <div className="my-2">
                  <BlogLike blogId={blogDetails._id} />
                </div>
                <Separator className={"my-4"} />
                <BlogComment blogId={blogDetails?._id} />
              </div>
            ) : (
              <div>Blog not found</div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-3">
        <div className="hidden lg:block">
          <CategoryListCard />
        </div>
        <RelatedBlogCard categorySlug={category} blogSlug={blog} />
      </div>
    </div>
  );
};

export default UserBlogDetailsPage;
