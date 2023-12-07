import { Auth } from "aws-amplify";
import { useQuery } from "@tanstack/react-query";
import { LogInParameters } from "../pages/login";
import { useState } from "react";
import { SIGNIN_ERROR } from "../utils/constant";
import useLocale from "./useLocale";

export default function useAuthentication() {
  const { locale } = useLocale();
  const [error, setError] = useState<string>("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => Auth.currentUserInfo(),
  });

  const signIn = async ({ username, password }: LogInParameters) => {
    try {
      await Auth.signIn({ username, password });
      refetch();
    } catch (err) {
      const message = SIGNIN_ERROR[(err as { name: string }).name];
      setError(message.message[locale.locale]);
      console.error(err);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return { data, signIn, signOut, isLoading, error };
}
