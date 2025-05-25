import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import useFetch from "@/helpers/useFetch";
import { Label } from "@/components/ui/label";
import { Cloud, XIcon } from "lucide-react";
import BlogTableRow from "@/components/user/BlogTableRow";
import { useSelector } from "react-redux";
import BlogTableRowLoading from "@/components/user/BlogTableRowLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "@/helpers/Validation";
import Loading2 from "@/components/common/Loading2";
import "react-quill-new/dist/quill.snow.css";
import CustomEditor from "@/components/common/TextEditer";

const CommonBlogPage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [preview, setPriview] = useState("");
  const [editId, setEditId] = useState(null);
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const { getData, data, loading } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/blogs/role-base`,
    {},
    []
  );
  const { data: categoryData } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/categories/active`,
    {},
    []
  );

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      thumbnail: null,
      content: "",
    },
  });

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      form.setValue("slug", slugify(blogTitle, { lower: true }));
    }
  }, [blogTitle]);

  const thumbnail = form.watch("thumbnail");
  useEffect(() => {
    if (thumbnail) {
      const url = URL.createObjectURL(thumbnail);
      setPriview(url);
    }
  }, [thumbnail]);

  const thumbnailRef = useRef(null);

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    form.setValue("thumbnail", e.dataTransfer.files[0]);
  }

  function resetImage() {
    thumbnailRef.current = "";
    setPriview(null);
    form.setValue("thumbnail", null);
  }

  function resetAll() {
    setOpenBlogDialog(false);
    form.reset();
    setEditId(null);
    setPriview("");
  }

  async function onSubmit(formData) {
    if (formData.thumbnail === null && editId === null) {
      toast.error("Thumbnail is required.");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("user", user._id);
    newFormData.append("category", formData.category);
    newFormData.append("title", formData.title);
    newFormData.append("slug", formData.slug);
    newFormData.append("thumbnail", formData.thumbnail);
    newFormData.append("content", formData.content);

    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const url = editId
        ? `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${editId}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/blogs`;

      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: newFormData,
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
    setOpenBlogDialog(true);
    form.setValue("category", getEditData.category._id);
    form.setValue("title", getEditData.title);
    form.setValue("content", getEditData.content);
    setPriview(getEditData.thumbnail);
  }

  async function handleActiveStatus(getBlogId, status) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/blogs/update-active-status/${getBlogId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
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
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className={"text-lg font-extrabold"}>
            Manage Blogs
          </CardTitle>
          <Button
            size={"sm"}
            className={"w-fit"}
            onClick={() => setOpenBlogDialog(true)}
          >
            Add New Blog
          </Button>
        </div>
        <Dialog open={openBlogDialog} onOpenChange={resetAll}>
          <DialogContent
            aria-describedby={undefined}
            className="w-full md:w-[60%] h-screen overflow-auto !max-w-none "
          >
            {form.formState.isSubmitting ? <Loading2 /> : null}
            <DialogHeader>
              <DialogTitle className="font-extrabold">
                {editId ? "Edit Blog" : "Add Blog"}
              </DialogTitle>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className={"w-full"}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryData && categoryData.length > 0
                              ? categoryData.map((item) => {
                                  return (
                                    <SelectItem key={item._id} value={item._id}>
                                      {item.name}
                                    </SelectItem>
                                  );
                                })
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title" {...field} />
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

                  <div className="w-1/2">
                    {preview ? (
                      <div className="h-40 w-60 relative">
                        <img
                          src={preview}
                          alt="preview-images"
                          className="h-full w-full object-cover rounded-2xl"
                        />
                        <XIcon
                          onClick={resetImage}
                          className="absolute top-2 cursor-pointer right-2"
                        />
                      </div>
                    ) : (
                      <Label
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={
                          "flex flex-col gap-4 justify-center border-2 border-dashed rounded-xl h-40 text-center"
                        }
                      >
                        <div className="text-xl text-gray-400 font-semibold">
                          Drag & Drop or Select Image
                        </div>
                        <Cloud className="h-8 w-8 text-gray-400" />
                        <Input
                          onChange={(e) => {
                            form.setValue("thumbnail", e.target.files[0]);
                          }}
                          name="thumbnail"
                          ref={thumbnailRef}
                          type={"file"}
                          className={"hidden"}
                        />
                      </Label>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <CustomEditor field={field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={form.formState.isSubmitting}
                    className="w-full mt-15"
                    type="submit"
                  >
                    Save Blog
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
              <TableHead>Active</TableHead>
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
                <BlogTableRow
                  key={item._id}
                  handleEdit={handleEdit}
                  getData={getData}
                  blogData={item}
                  handleActiveStatus={handleActiveStatus}
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

export default CommonBlogPage;
