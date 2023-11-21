import { useQuery } from "@tanstack/react-query";
import Repository from "./repository";

export const useGetProjectList = () => {
  return useQuery({
    queryKey: ["getProjectList"],
    queryFn: () => Repository.getProjectList(),
  });
};

export const useGetSearchProjectList = (text: string) => {
  return useQuery({
    queryKey: ["getSearchProject", text],
    queryFn: () => Repository.getSearchProjectList(text),
  });
};
