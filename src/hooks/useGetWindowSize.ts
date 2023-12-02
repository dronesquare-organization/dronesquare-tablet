/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

const useGetWindowSize = () => {
  const isClient = typeof window === "object"; // Check if window is defined

  const [width, setWidth] = useState<number>(isClient ? window.innerWidth : 0);
  const [height, setHeight] = useState<number>(
    isClient ? window.innerHeight : 0
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize(this: Window, ev: UIEvent) {
      setWidth(this.innerWidth);
      setHeight(this.innerHeight);
    }

    window.addEventListener("resize", handleResize, true);

    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, [isClient]);

  return { width, height };
};

export default useGetWindowSize;
