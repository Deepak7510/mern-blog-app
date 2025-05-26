import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useFetch from "@/helpers/useFetch";
import React from "react";

const AdminDashboardPage = () => {
  const { getData, data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/dashboards`,
    {},
    []
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className={"text-center"}>
            <CardTitle className={"font-semibold text-xl"}>
              Total User
            </CardTitle>
            <div className="text-2xl font-bold">{data?.totalUser}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={"text-center"}>
            <CardTitle className={"font-semibold text-xl"}>
              Total Category
            </CardTitle>
            <div className="text-2xl font-bold">{data?.totalCategory}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={"text-center"}>
            <CardTitle className={"font-semibold text-xl"}>
              Total Blog
            </CardTitle>
            <div className="text-2xl font-bold">{data?.totalBlog}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={"text-center"}>
            <CardTitle className={"font-semibold text-xl"}>
              Total Blog
            </CardTitle>
            <div className="text-2xl font-bold">{data?.totalMessage}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
