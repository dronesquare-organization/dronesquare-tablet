import { useQuery } from "@tanstack/react-query";
import Repository from "./repository";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => Repository.getProjects(),
  });
};

export const useGetProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => Repository.getProject(id),
  });
};

export const useGetSearchProjects = (text: string) => {
  return useQuery({
    queryKey: ["searchProjects", text],
    queryFn: () => Repository.getSearchProjects(text),
  });
};

export const useGetAnnotations = (id: number) => {
  return useQuery({
    queryKey: ["annotations", id],
    queryFn: () => Repository.getAnnotations(id),
  });
};

export const useGetGisLayers = (id: number) => {
  return useQuery({
    queryKey: ["gisLayers", id],
    queryFn: () => Repository.getGisLayers(id),
  });
};

export const useGetGroupOfTimeseries = (id: number) => {
  return useQuery({
    queryKey: ["groupTimeseries", id],
    queryFn: () => Repository.getGroupTimeseries(id),
  });
};

export const useGetProjectEpsg = (id: number) => {
  return useQuery({
    queryKey: ["getProjectEpsg", id],
    queryFn: () => Repository.getProjectEps(id),
  });
};

export const useGetDxfJsonsFromS3 = (id: string) => {
  return useQuery({
    queryKey: ["getDxfJsons", id],
    queryFn: () => Repository.getDxfJsonsFromS3(id),
  });
};

export const useGetProjectZoomLevel = (id: number) => {
  return useQuery({
    queryKey: ["getProjectZoomLevel", id],
    queryFn: () => Repository.getProjectZoomLevel(id),
    // {
    //   refetchInterval: false,
    //   refetchOnWindowFocus: false,
    //   refetchOnReconnect: false,
    //   refetchOnMount: false,
    //   retryOnMount: false,
    //   enabled: !!id,
  });
};
