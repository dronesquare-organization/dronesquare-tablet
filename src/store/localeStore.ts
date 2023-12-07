import { atom } from "recoil";
import { v1 } from "uuid";

export const locale = atom<{ locale: "ko" | "en" }>({
  key: `codeKey/${v1()}`,
  default: { locale: "ko" },
});
