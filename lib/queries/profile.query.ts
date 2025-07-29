import { supabase } from "../supabase"
import { IUpdateProfile } from "../types"


export const signIn = async () => {

}

export const signUp = async () => {

}

export const signOut = async () => {

}

export const getProfileDetails = async () => {
  const { data:{ session }, error:sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error("No user session found");

  const userId = session.user.id;

  const { data: account, error } = await supabase
    .from("accounts")
    .select("username, avatar, email")
    .eq("id", userId)
    .single();
  
  if (error) throw error;

  return account;
}

export const updateProfile = async ({avatar, username}:IUpdateProfile) => {
  const { data: { session } , error: sessionError } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.user) throw new Error("No user session found");

  const userId = session?.user?.id;

  const { data: account, error } = await supabase
    .from("accounts")
    .update({ avatar, username })
    .eq("id", userId)
    .select("username, avatar, email")
    .single();

  if (error) throw error;

  return account;
}

export const changePassword = async () => {

}

export const delateProfile = async () => {

}