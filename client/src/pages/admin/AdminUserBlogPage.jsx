import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import toast from "react-hot-toast";
import useFetch from "@/helpers/useFetch";
import { useSelector } from "react-redux";
import BlogTableRowLoading from "@/components/user/BlogTableRowLoading";
import "react-quill-new/dist/quill.snow.css";
import UserBlogTableRow from "@/components/admin/UserBlogTableRow";

const AdminUserBlogPage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { getData, data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/users-blogs`,
    {},
    []
  );
  async function handleApprovalStatus(getBlogId, approval) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/blogs/update-approval-status/${getBlogId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ approval }),
        }
      );
      const result = await response.json();
      if (!response.ok) throw result;
      toast.success(result.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-lg font-extrabold"}>Manage Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Total blog : {data?.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(10)
                .fill(null)
                .map((_, index) => {
                  return <BlogTableRowLoading key={index} />;
                })
            ) : data?.length > 0 ? (
              data.map((item) => (
                <UserBlogTableRow
                  key={item._id}
                  getData={getData}
                  blogData={item}
                  handleApprovalStatus={handleApprovalStatus}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>No Blog</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUserBlogPage;
