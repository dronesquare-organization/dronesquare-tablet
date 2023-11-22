import { PROJECT_CONDITION, ValueOf } from "./constant";

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
