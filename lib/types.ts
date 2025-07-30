import z from "zod";
import * as schema from "./schemas";

export type ISignUp = z.infer<typeof schema.ZSignUp>;
export type ISignIn = z.infer<typeof schema.ZSignIn>;
export type IUpdateProfile = z.infer<typeof schema.ZUpdateProfile>;
export type IScheduleForm = z.infer<typeof schema.ZScheduleForm>;

export type IScreenFormParams = {
  type: string,
  id: string
}