import { z } from "zod";
import { RegisterSchema } from "../schema";

export type RegisterCustomerInputs = z.infer<typeof RegisterSchema>