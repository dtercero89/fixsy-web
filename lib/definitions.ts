
import { z } from "zod";
import {  RegisterSchema } from "./schema";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;

};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type RegisterCustomerInputs = z.infer<typeof RegisterSchema>
