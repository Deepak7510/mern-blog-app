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
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn } from "@/helpers/route";
import { signUpSchema } from "@/helpers/Validation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import AuthWithGoolge from "@/components/auth/AuthWithGoolge";
import { registerUser } from "@/redux/auth-slice";
import Loading from "@/components/common/Loading";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData) {
    const result = await dispatch(registerUser(formData));
    if (result.payload.success) {
      toast.success(result.payload.message);
      form.reset();
      return navigate("/sign-in");
    } else {
      toast.error(result.payload.message);
    }
  }
  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      {form.formState.isSubmitting ? <Loading /> : null}
      <Card className="w-[400px] m-2">
        <CardTitle className={"font-extrabold text-2xl text-center"}>
          Create your Account
        </CardTitle>
        <CardContent>
          <AuthWithGoolge />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type={"text"}
                          placeholder="Enter your name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type={"email"}
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
                        <Input
                          type={"password"}
                          placeholder="Enter your password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="Enter your confirm password"
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
                  className={"w-full"}
                  type="submit"
                >
                  Sign Up
                </Button>
                <div className="flex justify-center gap-2 mt-4">
                  <p> if you have already account ?</p>
                  <Link
                    className="text-blue-800 hover:underline"
                    to={RouteSignIn}
                  >
                    Sign In
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

export default SignUp;
