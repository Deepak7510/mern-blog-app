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
import { signInSchema } from "@/helpers/Validation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignUp } from "@/helpers/route";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import AuthWithGoolge from "@/components/auth/AuthWithGoolge";
import { checkAuth, loginUser } from "@/redux/auth-slice";
import Loading from "@/components/common/Loading";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    const result = await dispatch(loginUser(formData));
    if (result.payload.success) {
      toast.success(result.payload.message);
      form.reset();
      const token = JSON.parse(sessionStorage.getItem("token"));
      dispatch(checkAuth(token));
      navigate("/");
    } else {
      toast.error(result.payload.message);
    }
  }

  return (
    <div className=" flex justify-center items-center h-screen w-screen relative">
      {form.formState.isSubmitting ? <Loading /> : null}
      <Card className="w-96 m-2">
        <CardTitle className={"font-extrabold text-2xl text-center"}>
          Login Into Account
        </CardTitle>
        <CardContent>
          <AuthWithGoolge />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Button
                  disabled={form.formState.isSubmitting}
                  className={"w-full"}
                  type="submit"
                >
                  Sign In
                </Button>
                <div className="flex justify-center gap-2 mt-4">
                  <p>Don't have account ?</p>
                  <Link
                    className="text-blue-800 hover:underline"
                    to={RouteSignUp}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
