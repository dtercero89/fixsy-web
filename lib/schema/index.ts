import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
  passwordConfirm: z.string().min(6, {
    message: "Confirm Password must contain at least 6 characters",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phoneNumber: z.string().min(6, {
    message: "Phone number is required",
  }),
  address: z.string().min(6, {
    message: "Address is required",
  }),
});

export const LoginSchemaNew = z.object({
  userId: z.string().min(3,{
    message: "You must enter the user in a valid format",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
