import { Coordinate } from "ol/coordinate";
import { EpsgCode } from "../utils";
export type ValueOf<T> = T[keyof T];

export type Location = [number, number] | [number, number, number];

export type MarkerShape =
  | "marker"
  | "line"
  | "rectangle"
  | "polygon"
  | "circle"
  | "circlemarker"
  | "text";

export interface Annotation {
  id?: number;
  type?: MarkerShape;
  title: string;
  radius?: number;
  position: Coordinate | Coordinate[];
  comment?: string;
  issueDegree?: string;
  issue?: string;
  issueGrade?: string;
  projectId?: string | string[];
  created?: string;
}

interface Child {
  value: string;
  label: string;
  order: number;
  id: number;
}

export interface GroupOfTimeseriesData {
  data: {
    value: number;
    label: string;
    children?: Child[];
  };
  status: string;
  message?: string;
}

export interface AnnotationData {
  annotations: Annotation[];
  status: string;
}

export interface ProjectData {
  data: ProjectType;
  status: string;
}

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

export type LayerPath = {
  build_complete: boolean;
  json: string;
  dxf: string;
};

export type TmsLayer = {
  build_complete: boolean;
  tif: string;
  tiles: string;
  zoom_level: {
    min: string;
    max: string;
  };
};

export type ProjectGisLayerData = {
  geojson_layer: LayerPath[];
  tms_layer: TmsLayer[];
};

export type EpsgData = {
  epsg: EpsgCode;
};
