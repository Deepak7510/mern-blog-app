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

function DeleteButton({ messageId, getData }) {
  async function handleDelete(getMessageId) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/${getMessageId}`,
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
        <Button size={"sm"} variant={"outline"}>
          <Trash color="red" />
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
          <AlertDialogAction onClick={() => handleDelete(messageId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const MessageTableRow = ({ messageDetails, getData }) => {
  const message =
    messageDetails.message.split(" ").length > 5
      ? messageDetails.message.split(" ").slice(0, 5).join(" ").concat("...")
      : messageDetails.message;
  return (
    <TableRow>
      <TableCell className={"font-medium"}>{messageDetails.name}</TableCell>
      <TableCell>{messageDetails.email}</TableCell>
      <TableCell>{message}</TableCell>
      <TableCell>
        {new Date(messageDetails.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className={"space-x-2"}>
        <DeleteButton messageId={messageDetails._id} getData={getData} />
      </TableCell>
    </TableRow>
  );
};

export default MessageTableRow;
