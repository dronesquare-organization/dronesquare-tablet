import { TfiLayoutGrid3 } from "react-icons/tfi";
import {
  RiLayoutRowLine,
  RiLayoutColumnLine,
  RiLayoutGridLine,
} from "react-icons/ri";
export const COGNITO_IDENTITYPOOL_ID = "IdentityPoolId";
export const COGNITO_USERPOOL_ID = "UserPoolId";
export const COGNITO_USERPOOL_WEBCLIENT_ID = "UserPoolWebClientId";
export const API_GATEWAY_URL = "Endpoint";
export const S3_API_URL = "S3_Endpoint";
export const DATA_BUCKET_NAME = "BucketName";
export const TIMESERIES_ENDPOINT = "HTTPS_TimeseriesApiUrl";
export const CAL_API_ENDPOINT = "Calc_Api_Endpoint";
export const POTREE_PROXY_ENDPOINT = "Potree_Url";
export const CAPTURE_CLOUDFRONT_URL = "Cloudfront_Url";
export const PUBLIC_STORAGE = "https://st-landing.ds-develop.com";
export const MAPPING_REQUEST_URL = "Ecs_Apigw_Url";

export const PARAMETERS = [
  COGNITO_IDENTITYPOOL_ID,
  COGNITO_USERPOOL_ID,
  COGNITO_USERPOOL_WEBCLIENT_ID,
  API_GATEWAY_URL,
  DATA_BUCKET_NAME,
  S3_API_URL,
  POTREE_PROXY_ENDPOINT,
  TIMESERIES_ENDPOINT,
  CAL_API_ENDPOINT,
  CAPTURE_CLOUDFRONT_URL,
];
export const INFRA_CLASS = [
  { ko: "일반 객체", en: "Regular Object" },
  { ko: "코리더 객체", en: "Corridor Object" },
  { ko: "면 객체", en: "Face Obejct" },
  { ko: "수직 객체", en: "Vertival Object" },
  { ko: "기타", en: "Others" },
];
export const MARKER_COLORS = [
  "red",
  "yellow",
  "green",
  "skyblue",
  "blue",
  "brown",
];
export const LATLNG_SELECT_ITEMS = [
  { value: "KOREA2000", label: "Korea2000" },
  { value: "GOOGLE", label: "Google Mercator" },
  { value: "WSG", label: "WSG 84 / LonLat" },
];

export const ISSUE_GRADE_ITEMS = {
  severity: { ko: "심각도", en: "Severity" },
  importance: { ko: "중요도", en: "Priority" },
  urgenty: { ko: "긴급도", en: "Urgency" },
};

export const INSPECTION2D_PAGE_CATEGORY = {
  inspection2D: { ko: "정사영상", en: "2D Image" },
  inspection3D: { ko: "3D 모델", en: "3D Model" },
  timeSerise: { ko: "다중 뷰", en: "Multi-view" },
};

export const ISSUE_GRADE_VALUE_COLOR = [
  { grade: "0", color: "#fff" },
  { grade: "1", color: "#F5BB3C" },
  { grade: "2", color: "#F59700" },
  { grade: "3", color: "#C6612A" },
  { grade: "4", color: "#E63F30" },
  { grade: "5", color: "#BE3C30" },
];
export const MANAGE_DRONE_IMG_TABS = {
  UPLOADED_IMGS: { ko: "업로드 된 이미지", en: "Images" },
  PRE_UPLOAD_IMGS: { ko: "추가 할 이미지", en: "Image Uploading" },
};
export const MANAGE_ANNOTATION_TABS = {
  ISSUE_INFORMATION: { ko: "이슈 정보", en: "Issues" },
  MEASUARMENT_INFORMATION: { ko: "측정 정보", en: "Measurements" },
};
export const MANAGE_OTHER_DATA_TABS = {
  REFERENCE_DATA: { ko: "참고 데이터", en: "Etc Files" },
  OVERLAPPING_DATA: { ko: "중첩 데이터", en: "Overlay Layers" },
};

export const MANAGE_ANNOTATIONS_TABS = {
  ISSUE_INFORMATION: { ko: "이슈 리스트", en: "Issue Lists" },
  MEASUARMENT_INFORMATION: { ko: "측정 리스트", en: "Measurement Lists" },
};
export const LAYER_DESCRIPTION_NAV_ITEMS = {
  calInfoOptions: ["line", "rectangle", "polygon", "circle"],
  calPathInfoOptions: ["line", "rectangle", "polygon"],
  amountOfSectionOptions: ["rectangle", "polygon"],
  crossSectionOptions: ["line", "rectangle", "polygon"],
};
export const AUTH_GRADE = {
  GUEST: "guests",
  USER: "users",
  ADMIN: "admin",
};
export const SIGNIN_ERROR = {
  NotAuthorizedException: {
    name: "NotAuthorizedException",
    message: { ko: "비밀번호가 일치하지 않습니다.", en: "Wrong Password" },
  },
  UserNotFoundException: {
    name: "UserNotFoundException",
    message: { ko: "존재하지 않는 사용자입니다.", en: "Wrong User ID" },
  },
  ExpiredCodeError: {
    name: "ConfirmForgotPassword",
    message: { ko: "만료된 코드입니다.", en: "The code has expired" },
  },
  EmailNotConfirmCodeError: {
    name: "UserNotConfirmedException",
    message: {
      ko: "이메일 인증을 완료해주세요.",
      en: "Please Complete the email verification",
    },
  },
};
export const SIGNUP_ERROR = {
  UnexpectedLambdaError: {
    name: "UnexpectedLambdaException",
    message: {
      ko: "이메일 인증에 성공했으나, 예기치 않은 예외 발생.",
      en: "Email verification succeeded, but an unexpected exception occurred",
    },
  },
  EmailCodeMismatchError: {
    name: "CodeMismatchException",
    message: {
      ko: "인증번호가 일치하지 않습니다.",
      en: "The verification code does not match",
    },
  },
};
export const QUERY_OPTIONS = {
  retry: 2,
  refetchOnWindowFocus: false,
  staleTime: 10 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
};
export const DEFAULT_MAP_LOCATION = {
  lng: 126.97,
  lat: 37.56,
};

export const BIAS_ZOOM7 = 2.2;
export const BIAS_ZOOM11 = 0.015;

export const BIAS_LAT_LON_RATIO = 1.25;

export const DEFAULT_ZOOMIMAGE_LOCATION = {
  lng: 127,
  lat: 38,
};

export const MODAL_TYPE_STYLES = {
  hasTable: {
    width: "880px",
    height: "580px",
  },
  singleInput: {
    width: "370px",
    height: "190px",
  },
  delete: {
    width: "370px",
    height: "120px",
  },
};

export const TIMESERISE_QUERY_KEYS = [
  "getTimeseriesList",
  "getNotIncludedTimeseriesList",
];

export const RANDOM_COLOR = ["blue", "red", "brown", "green", "black"];

export const TIMESERISE_LAYOUT_BUTTONS = [
  {
    label: 0,
    icon: RiLayoutColumnLine,
    columns: 2,
    rows: 1,
    buttonSize: 25,
  },
  {
    label: 1,
    icon: RiLayoutRowLine,
    columns: 1,
    rows: 2,
    buttonSize: 25,
  },
  {
    label: 2,
    icon: RiLayoutGridLine,
    columns: 2,
    rows: 2,
    buttonSize: 25,
  },
  {
    label: 3,
    icon: TfiLayoutGrid3,
    columns: 3,
    rows: 3,
    buttonSize: 24,
  },
];

export const SIGNUP_FIELD = [
  { ko: "설계", en: "Design" },
  { ko: "시공", en: "Construction" },
  { ko: "유지보수", en: "Maintenance" },
  { ko: "안전진단", en: "Safety Assessment" },
  { ko: "측량", en: "Surveying" },
  { ko: "농업", en: "Agriculture" },
  { ko: "환경", en: "Environment" },
  { ko: "도시계획", en: "Urban Planning" },
  { ko: "드론운용", en: "Drone Operation" },
  { ko: "제조", en: "Manufacturing" },
  { ko: "운송", en: "Transportation" },
  { ko: "정보통신", en: "Information and Communication" },
  { ko: "공공행정", en: "Public Administration" },
  { ko: "자원개발", en: "Resource Development" },
  { ko: "기술 서비스", en: "Technical Service" },
  { ko: "기타", en: "Others" },
];

export const COORDINATE_NAMES = {
  5185: { ko: "서부원점", en: "West Belt" },
  5186: { ko: "중부원점", en: "Central Belt" },
  5187: { ko: "동부원점", en: "East Belt" },
};

export const DOWNLOAD_ICON = `
    <?xml version="1.0" encoding="utf-8"?>
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16L11.6464 16.3536L12 16.7071L12.3536 16.3536L12 16ZM12.5 4C12.5 3.72386 12.2761 3.5 12 3.5C11.7239 3.5 11.5 3.72386 11.5 4L12.5 4ZM5.64645 10.3536L11.6464 16.3536L12.3536 15.6464L6.35355 9.64645L5.64645 10.3536ZM12.3536 16.3536L18.3536 10.3536L17.6464 9.64645L11.6464 15.6464L12.3536 16.3536ZM12.5 16L12.5 4L11.5 4L11.5 16L12.5 16Z" fill="#fff"/>
    <path d="M5 21H19" stroke="#fff"/>
    </svg>`;

export const CHANNELTALK_KEY = "dafd7567-df37-495c-afc3-31c9e9e33af7";

export type ValueOf<T> = T[keyof T];

export const ANNOTATION_TYPE = {
  marker: "marker",
  line: "line",
  polygon: "polygon",
  text: "text",
  rectangle: "rectangle",
};

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

export const FIVE_GIGABYTE_AMOUNT = 5368709120;
