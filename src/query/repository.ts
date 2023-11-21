import { API } from "aws-amplify";
export type ValueOf<T> = T[keyof T];

export const PROJECT_CONDITION: {
  BEFORE: "before";
  PROCESSING: "on_processing";
  COMPLETED: "completed";
  FAILED: "failed";
  REQUESTED: "requested";
  REVIEWING: "reviewing";
} = {
  BEFORE: "before",
  PROCESSING: "on_processing",
  COMPLETED: "completed",
  FAILED: "failed",
  REQUESTED: "requested",
  REVIEWING: "reviewing",
};

export type ProjectType = {
  id: number;
  title: string;
  address: string;
  created: string;
  updated: string | null;
  lat: number;
  lon: number;
  image_count: number;
  uploading: string;
  is_manifold_exist: boolean;
  current_state: ValueOf<typeof PROJECT_CONDITION>;
  infra_type?: string;
  infra_class: string;
  comment?: string;
};

export type ProjectsDataType = {
  data: ProjectType[];
};

class Repository {
  async getProjectList(): Promise<ProjectsDataType> {
    return API.get("DronesquareApi", "projects", {});
  }

  async getSearchProjectList(text: string): Promise<ProjectsDataType> {
    if (!text) {
      return API.get("DronesquareApi", "projects", {});
    }
    return API.get("DronesquareApi", `projects?term=${text}`, {});
  }
}

export default new Repository();
