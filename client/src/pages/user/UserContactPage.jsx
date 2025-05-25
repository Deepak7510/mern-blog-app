import { Card, CardContent } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email format."),
  message: z
    .string()
    .nonempty("Message is required.")
    .max(250, "Message must be less then 250 character."),
});

function UserContactPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(formData) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (!response.ok) throw result;
      toast.success(result.message);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="sm:px-6 lg:px-10 xl:px-28 space-y-4">
      <div className="text-lg text-center">
        If you have any questions regarding <strong>Sales</strong>,{" "}
        <strong>Billing</strong>, or <strong>Technical Support</strong>, please
        don't hesitate to get in touch with us.
      </div>
      <Card
        className={
          "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 m-2"
        }
      >
        <CardContent className={"grid grid-cols-1 md:grid-cols-2"}>
          <div className="p-2 md:p-10 md:border-r-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 md:space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a message"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={form.formState.isSubmitting} type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <Separator className={"md:hidden my-6"} />
          <div className="md:border-l-1 p-2 md:p-10">
            <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
            <div className="space-y-1">
              <p>Email: deepakkumaryadav75100@gmail.com</p>
              <p> Phone: +91 7510064500 </p>
              <p>Address: Balrampur, India</p>
            </div>
            <div className="flex gap-4 mt-3">
              <Button className={"rounded-full"}>
                <Facebook className="h-6 w-6" />
              </Button>
              <Button className={"rounded-full"}>
                <Instagram className="h-6 w-6" />
              </Button>
              <Button className={"rounded-full"}>
                <Linkedin className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserContactPage;
