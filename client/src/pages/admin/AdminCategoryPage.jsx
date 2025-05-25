import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import toast from "react-hot-toast";
import useFetch from "@/helpers/useFetch";
import CategoryTableRow from "@/components/admin/CategoryTableRow";
import CategoryTableRowLoading from "@/components/admin/CategoryTableRowLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/helpers/Validation";
import Loading2 from "@/components/common/Loading2";

const AdminCategoryPage = () => {
  const [editId, setEditId] = useState(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const { getData, data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
    {},
    []
  );

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const categoryName = form.watch("name");
  useEffect(() => {
    if (categoryName) {
      form.setValue("slug", slugify(categoryName, { lower: true }));
    }
  }, [categoryName]);

  function resetAll() {
    form.reset();
    setOpenCategoryDialog(false);
    setEditId(null);
  }

  async function onSubmit(formData) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const url = editId
        ? `${import.meta.env.VITE_BACKEND_URL}/api/categories/${editId}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/categories`;
      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",

        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw result;
      toast.success(result.message);
      resetAll();
      getData();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  function handleEdit(getEditData) {
    setEditId(getEditData._id);
    setOpenCategoryDialog(true);
    form.setValue("name", getEditData.name);
    form.setValue("slug", getEditData.slug);
  }

  async function handleActiveStatus(categoryId, status) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/categories/update-active-status/${categoryId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
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
        <div className="flex justify-between">
          <CardTitle className={"text-lg font-extrabold"}>
            Manage Categories
          </CardTitle>
          <Button
            size={"sm"}
            className={"w-fit"}
            onClick={() => setOpenCategoryDialog(true)}
          >
            Add catgeory
          </Button>
        </div>

        <Dialog open={openCategoryDialog} onOpenChange={resetAll}>
          <DialogContent aria-describedby={undefined}>
            {form.formState.isSubmitting ? <Loading2 /> : null}
            <DialogHeader>
              <DialogTitle className="font-extrabold">
                {editId ? "Edit Category" : "Add Category"}
              </DialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Category Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input readOnly placeholder="Enter Slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                    type="submit"
                  >
                    Save Category
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Total Categories : {data?.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Category name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(10)
                .fill(null)
                .map((_, index) => {
                  return <CategoryTableRowLoading key={index} />;
                })
            ) : data && data?.length > 0 ? (
              data.map((item) => (
                <CategoryTableRow
                  key={item._id}
                  handleEdit={handleEdit}
                  getData={getData}
                  categoryData={item}
                  handleActiveStatus={handleActiveStatus}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>No Category</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminCategoryPage;
