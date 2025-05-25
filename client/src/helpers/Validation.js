import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required."),
});

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required."),
  slug: z.string().min(1, "Slug is required."),
});

export const blogSchema = z.object({
  category: z.string().min(1, "Category name is required."),
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  thumbnail: z.any().optional(),
  slug: z.string().min(1, "Slug is required."),
});

export const changePasswordSchema = z.object({
  oldpassword: z.string().min(1, "Old Password is required."),
  newpassword: z
    .string()
    .min(8, "New Password must be at least 8 characters long"),
});

export const commentSchema = z.object({
  comment: z.string().min(1, "Comment is required."),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  bio: z.string().optional(),
  avatar: z.instanceof(File, { message: "Avatar must be a file." }).optional(),
});
