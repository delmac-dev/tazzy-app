import z from "zod";
import { ZSignIn, ZSignUp } from "./schemas";

export type ISignUp = z.infer<typeof ZSignUp>;
export type ISignIn = z.infer<typeof ZSignIn>;

export type IFormType = {
  type: string
}