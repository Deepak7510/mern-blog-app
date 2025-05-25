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
import { Switch } from "../ui/switch";

function DeleteButton({ categoryId, getData }) {
  async function handleDelete(getCategoryId) {
    const token = JSON.parse(sessionStorage.getItem("token"));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${getCategoryId}`,
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
        <Button size={"sm"} variant={"outline"}>
          <Trash color="red" />
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

const CategoryTableRow = ({
  categoryData,
  handleEdit,
  getData,
  handleActiveStatus,
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{categoryData.name}</TableCell>
      <TableCell>{categoryData.slug}</TableCell>
      <TableCell>
        <Switch
          defaultChecked={Boolean(categoryData.status)}
          onCheckedChange={(value) =>
            handleActiveStatus(categoryData._id, value)
          }
        />
      </TableCell>
      <TableCell className={"space-x-2"}>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleEdit(categoryData)}
        >
          <Edit />
        </Button>
        <DeleteButton categoryId={categoryData._id} getData={getData} />
      </TableCell>
    </TableRow>
  );
};

export default CategoryTableRow;
