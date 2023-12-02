import { API, Storage } from "aws-amplify";
import {
  AnnotationData,
  EpsgData,
  GroupOfTimeseriesData,
  ProjectData,
  ProjectGisLayerData,
  ProjectsDataType,
} from "./model";

class Repository {
  async getProjects(): Promise<ProjectsDataType> {
    return API.get("DronesquareApi", "projects", {});
  }

  async getProject(id: number): Promise<ProjectData> {
    return API.get("DronesquareApi", `projects/${id}`, {});
  }

  async getSearchProjects(text: string): Promise<ProjectsDataType> {
    if (!text) {
      return API.get("DronesquareApi", "projects", {});
    }
    return API.get("DronesquareApi", `projects?term=${text}`, {});
  }

  async getGisLayers(id: number): Promise<ProjectGisLayerData> {
    return API.get(
      "DronesquareApi-Calculation",
      `calculation/${id}/constant/gis_layers`,
      {}
    );
  }

  async getProjectEps(id: number): Promise<EpsgData> {
    return API.get(
      "DronesquareApi-Calculation",
      `calculation/${id}/constant/cartesian-crs`,
      {}
    );
  }

  async getGroupTimeseries(id: number): Promise<GroupOfTimeseriesData> {
    return API.get(
      "DronesquareApi-Timeseries",
      `/timeseries?project=${id}`,
      {}
    );
  }

  async getAnnotations(id: number): Promise<AnnotationData> {
    return API.get("DronesquareApi", `projects/${id}/annotations`, {});
  }

  async getDxfJsonsFromS3(id: string) {
    const dxfs = await Storage.list(`${id}/dxf2geojson/`);

    const promises = dxfs.results.map(async (item) => {
      if (!item.key) return;
      if (item.key.includes(".json")) {
        const json = await Storage.get(
          `${id}/dxf2geojson/${item.key.split("/").pop()}`
        );
        const fetchJson = await fetch(json);
        const geoJson = await fetchJson.json();
        return [item.key.split("/").pop(), geoJson];
      }
    });

    const results = await Promise.allSettled(promises);

    const dxfObj = results.reduce<Record<string, unknown>>(
      (prevResult, result) => {
        if (result.status === "fulfilled" && result.value) {
          const key = result.value[0];
          prevResult[key] = result.value[1];
        }
        return prevResult;
      },
      {}
    );

    return dxfObj;
  }

  async getProjectZoomLevel(id: number) {
    return API.get(
      "DronesquareApi-Calculation",
      `calculation/${id}/constant/geotiff/tms-zoom-level`,
      {}
    );
  }
}

export default new Repository();
