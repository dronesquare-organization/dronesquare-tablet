import { useQuery } from "@tanstack/react-query";
import Repository from "./repository";

export const useGetProjectList = () => {
  return useQuery({
    queryKey: ["projectList"],
    queryFn: () => Repository.getProjectList(),
  });
};

export const useGetProjectById = (id: number) => {
  return useQuery({
    queryKey: ["projectById", id],
    queryFn: () => Repository.getProjectById(id),
  });
};

export const useGetSearchProjectList = (text: string) => {
  return useQuery({
    queryKey: ["searchProjectList", text],
    queryFn: () => Repository.getSearchProjectList(text),
  });
};

export const useGetGisLayersById = (id: number) => {
  return useQuery({
    queryKey: ["gisLayersById", id],
    queryFn: () => Repository.getGisLayersById(id),
  });
};
