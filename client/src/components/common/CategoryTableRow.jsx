import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
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

function DeleteButton({ categoryId, getData }) {
  async function handleDelete(getCategoryId) {
    const token = JSON.parse(sessionStorage.getItem("token"));

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/category/delete/${getCategoryId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        getData();
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
          <AlertDialogTitle>Delete Category?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently remove this
            category and its related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(categoryId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const CategoryTableRow = ({ srNo, categoryData, handleEdit, getData }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{srNo + 1}</TableCell>
      <TableCell>{categoryData.name}</TableCell>
      <TableCell>{categoryData.slug}</TableCell>
      <TableCell>{categoryData.status.toString()}</TableCell>
      <TableCell className={"space-x-2"}>
        <Button onClick={() => handleEdit(categoryData)}>
          <Edit />
        </Button>
        <DeleteButton categoryId={categoryData._id} getData={getData} />
      </TableCell>
    </TableRow>
  );
};

export default CategoryTableRow;
