import { useRecoilState } from "recoil";
import { locale } from "../store/localeStore";

export default function useLocale() {
  const [localeState, setLocale] = useRecoilState(locale);

  return { locale: localeState, setLocale: setLocale };
}
