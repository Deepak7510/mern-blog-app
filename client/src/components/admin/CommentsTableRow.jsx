import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
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

function DeleteButton({ commentId, getData }) {
  async function handleDelete(getCommnetId) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/comment/delete/${getCommnetId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
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
          <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(commentId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const CommentsTableRow = ({ srNo, commentItem, getData }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{srNo + 1}</TableCell>
      <TableCell className={"line-clamp-1"}>
        {commentItem.blog?.title}
      </TableCell>
      <TableCell>{commentItem.user.name}</TableCell>
      <TableCell>{commentItem.comment}</TableCell>
      <TableCell>
        {new Date(commentItem.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className={"space-x-2"}>
        <DeleteButton commentId={commentItem._id} getData={getData} />
      </TableCell>
    </TableRow>
  );
};

export default CommentsTableRow;
