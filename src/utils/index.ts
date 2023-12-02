import {
  ISSUE_GRADE_VALUE_COLOR,
  PROJECT_CONDITION,
  ValueOf,
} from "./constant";

export const getFlagOfProcess = (
  condition: ValueOf<typeof PROJECT_CONDITION>
) => {
  if (condition === PROJECT_CONDITION.BEFORE) {
    return `처리 전`;
  } else if (condition === PROJECT_CONDITION.PROCESSING) {
    return `처리 중`;
  } else if (condition === PROJECT_CONDITION.COMPLETED) {
    return `처리 완료`;
  } else if (condition === PROJECT_CONDITION.FAILED) {
    return `처리 실패`;
  } else if (condition === PROJECT_CONDITION.REQUESTED) {
    return `처리 요청`;
  } else if (condition === PROJECT_CONDITION.REVIEWING) {
    return `검수 중`;
  }
  return "";
};

export function textColor(issueGrade: string | number) {
  if (issueGrade === 0 || issueGrade === "0") {
    return "black";
  }
  if (issueGrade === 1 || issueGrade === "1") {
    return ISSUE_GRADE_VALUE_COLOR.find((item) => item.grade === "1")?.color;
  }
  if (issueGrade === 2 || issueGrade === "2") {
    return ISSUE_GRADE_VALUE_COLOR.find((item) => item.grade === "2")?.color;
  }
  if (issueGrade === 3 || issueGrade === "3") {
    return ISSUE_GRADE_VALUE_COLOR.find((item) => item.grade === "3")?.color;
  }
  if (issueGrade === 4 || issueGrade === "4") {
    return ISSUE_GRADE_VALUE_COLOR.find((item) => item.grade === "4")?.color;
  }
  if (issueGrade === 5 || issueGrade === "5") {
    return ISSUE_GRADE_VALUE_COLOR.find((item) => item.grade === "5")?.color;
  }
}

const epsg5185 =
  "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
const epsg5186 =
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
const epsg5187 =
  "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
const epsg5188 =
  "+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
const epsg3857 =
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

export const coordinate = {
  epsg: {
    "5185": epsg5185,
    "5186": epsg5186,
    "5187": epsg5187,
    "5188": epsg5188,
    "3857": epsg3857,
  },
  wgs: {
    "84": wgs84,
  },
};

export type EpsgCode = keyof (typeof coordinate)["epsg"];
