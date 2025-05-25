import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash, ViewIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { Switch } from "../ui/switch";

function DeleteButton({ blogId, getData }) {
  async function handleDelete(getBlogId) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${getBlogId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      if (result.success) {
        getData();
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently remove this blog
            and its related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(blogId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const UserBlogTableRow = ({ blogData, getData, handleApprovalStatus }) => {
  const titleText = blogData.title.split(" ").slice(0, 4).join(" ");
  const more = blogData.title.split(" ").length > 4 ? "..." : "";
  const title = titleText + more;

  return (
    <TableRow>
      <TableCell className="font-medium">{blogData.user.name}</TableCell>
      <TableCell>{blogData.category.name}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{new Date(blogData.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <Switch
          defaultChecked={Boolean(blogData.approval)}
          onCheckedChange={(value) => handleApprovalStatus(blogData._id, value)}
        />
      </TableCell>
      <TableCell className={"space-x-2"}>
        <DeleteButton blogId={blogData._id} getData={getData} />
      </TableCell>
    </TableRow>
  );
};

export default UserBlogTableRow;
