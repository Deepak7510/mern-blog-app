import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/helpers/useFetch";
import toast from "react-hot-toast";
import UsersTableRow from "@/components/admin/UserTableRow";
import UserTableRowLoading from "@/components/admin/UserTableRowLoading";

const AdminManageUserPage = () => {
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    {},
    []
  );

  async function handleBlockStatus(getUserId, status) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/update-block-status/${getUserId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw result;
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>Total User : {data?.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Block Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(10)
                .fill(null)
                .map((_, index) => {
                  return <UserTableRowLoading key={index} />;
                })
            ) : data && data?.length > 0 ? (
              data.map((item, index) => (
                <UsersTableRow
                  key={item._id}
                  userDetails={item}
                  handleBlockStatus={handleBlockStatus}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>No Comments</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminManageUserPage;
