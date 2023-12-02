import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Screen } from "../utils/constant";
import { breakPoint } from "../store/breakPoint";

export const BreakPoint = {
  isSmall(onlyWidth?: boolean) {
    if (onlyWidth) {
      return `(max-width: ${Screen.wide - 1}px) and (min-width: ${
        Screen.small
      }px)`;
    }

    return `@media only screen and (max-width: ${
      Screen.wide - 1
    }px) and (min-width: ${Screen.small}px)`;
  },

  isWide(onlyWidth?: boolean) {
    if (onlyWidth) {
      return `(min-width: ${Screen.wide}px)`;
    }

    return `@media only screen and (min-width: ${Screen.wide}px)`;
  },

  isDisabled(onlyWidth?: boolean) {
    if (onlyWidth) {
      return `(max-width: ${Screen.small - 1}px)`;
    }

    return `@media only screen and (max-width: ${Screen.small - 1}px)`;
  },
};

function useMediaQueryObserver(query: string): boolean {
  const getMatches = (mediaQuery: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(mediaQuery).matches;
    }

    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

function useMediaQuery() {
  const isSmall = useMediaQueryObserver(BreakPoint.isSmall(true));
  const isWide = useMediaQueryObserver(BreakPoint.isWide(true));
  const isDisabled = useMediaQueryObserver(BreakPoint.isDisabled(true));

  const setBreakPoint = useSetRecoilState(breakPoint);

  useEffect(() => {
    setBreakPoint({ isSmall, isWide, isDisabled });
  }, [isSmall, isWide, isDisabled]);

  return { isSmall, isWide, isDisabled };
}

export default useMediaQuery;
