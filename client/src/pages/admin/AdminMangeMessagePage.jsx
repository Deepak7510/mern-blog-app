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
import UserTableRowLoading from "@/components/admin/UserTableRowLoading";
import MessageTableRow from "@/components/admin/MessageTableRow";
import MessageTableRowSkeleton from "@/components/admin/MessageTableRowSkeleton";

const AdminMangeMessagePage = () => {
  const { getData, data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
    {},
    []
  );

  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>Total Message : {data?.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(10)
                .fill(null)
                .map((_, index) => {
                  return <MessageTableRowSkeleton key={index} />;
                })
            ) : data && data?.length > 0 ? (
              data.map((item) => (
                <MessageTableRow messageDetails={item} getData={getData} />
              ))
            ) : (
              <TableRow>
                <TableCell>No messages</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminMangeMessagePage;
