'use server'

import * as z from "zod";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { fetchServer } from "../fetchHelper/fetchServer";
import { LoginSchemaNew } from "../schema";


export const login = async (
  values: z.infer<typeof LoginSchemaNew>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchemaNew.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId, password } = validatedFields.data;

  try {
    const request = {
      email: userId,
      password: password
    }
    const existingUser = await fetchServer.httpPost('/users/log-in', request);

    if (!existingUser) {
      return { error: 'User does not exist' };
    }

    // Si el usuario existe, procedemos con el inicio de sesión
    return await onSignIn(userId, password, callbackUrl);
  } catch (error) {
    console.error("Error during user verification:", error);
    return { error: "An error occurred while verifying the user" };
  }
};

export const onSignIn = async (
  userId: string,
  password: string,
  callbackUrl?: string | null
) => {
  try {
    const result = await signIn("credentials", {
      userId,
      password,
      redirect: false,
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })

    if (result?.error) {
      return { error: result.error }
    }

    if (result?.url) {
      return { success: 'User logged in successfully', url: result.url }
    }

    return { success: 'User logged in successfully' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Wrong credentials, try again" }
        default:
          return { error: "Somethings is wrong with authentication" }
      }
    }
    console.error("Unexpected error during login:", error)
    return { error: "An unexpected error occurred during login" }
  }
}

  export const logout = async () => {
    await signOut();
  };


  export const userIdLoggued =async()=>{
    const session = await auth();
    return session && session.user ? true : false;
  }