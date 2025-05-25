import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { changePasswordSchema } from "@/helpers/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/redux/auth-slice";
import toast from "react-hot-toast";
import Loading2 from "./Loading2";

const ChangePassword = () => {
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldpassword: "",
      newpassword: "",
    },
  });

  function resetAll() {
    form.reset();
    setOpenChangePasswordDialog(false);
  }

  async function onSubmit(formData) {
    const data = await dispatch(changePassword({ userId: user._id, formData }));
    if (data.payload.success) {
      toast.success(data.payload.message);
      resetAll();
    } else {
      toast.error(data.payload.message);
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpenChangePasswordDialog(true)}
        className={"w-full"}
      >
        Change Password
      </Button>
      <Dialog open={openChangePasswordDialog} onOpenChange={() => resetAll()}>
        <DialogContent aria-describedby={undefined}>
          {form.formState.isSubmitting ? <Loading2 /> : null}
          <DialogHeader>
            <DialogTitle className={"text-xl font-extrabold text-center"}>
              Change password
            </DialogTitle>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="oldpassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old password</FormLabel>
                          <FormControl>
                            <Input
                              type={"password"}
                              placeholder="Enter old password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="newpassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <Input
                              type={"password"}
                              placeholder="Enter new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      disabled={form.formState.isSubmitting}
                      type="submit"
                      className={"w-full"}
                    >
                      Save Change
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
