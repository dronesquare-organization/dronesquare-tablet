import { Auth } from "aws-amplify";
import { useQuery } from "@tanstack/react-query";
import { LogInParameters } from "../pages/login";
import { useState } from "react";

export default function useAuthentication() {
  const [error, setError] = useState<string>("");
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => Auth.currentUserInfo(),
  });

  const signIn = async ({ username, password }: LogInParameters) => {
    try {
      await Auth.signIn({ username, password });
      refetch();
    } catch (error) {
      setError((error as { name: string }).name);
      console.error(error);
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
