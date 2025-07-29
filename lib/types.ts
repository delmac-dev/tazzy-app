import z from "zod";
import { ZUpdateProfile, ZSignIn, ZSignUp } from "./schemas";

export type ISignUp = z.infer<typeof ZSignUp>;
export type ISignIn = z.infer<typeof ZSignIn>;
export type IUpdateProfile = z.infer<typeof ZUpdateProfile>;

export type IFormType = {
  type: string
}