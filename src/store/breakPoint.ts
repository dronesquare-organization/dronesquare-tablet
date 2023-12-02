import { atom } from "recoil";
import { v1 } from "uuid";

export const breakPoint = atom<{
  isSmall: boolean;
  isWide: boolean;
  isDisabled: boolean;
}>({
  key: `codeKey/${v1()}`,
  default: {
    isSmall: false,
    isWide: false,
    isDisabled: false,
  },
});
