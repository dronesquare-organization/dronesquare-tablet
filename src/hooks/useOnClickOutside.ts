import { RefObject, useEffect, useState } from "react";

// 왜 undefined일 수 있지
export default function useOnClickOutside(
  ref: RefObject<HTMLElement> | undefined,
  callback: (event: Event) => void
) {
  const [isTouchEvent, setTouchEvent] = useState(false);
  const eventType = isTouchEvent ? "touchend" : "click";

  function handleEvent(event: Event) {
    if (event.type === "click" && isTouchEvent) {
      return;
    }

    if (ref?.current && event.target !== null) {
      if (!ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }
  }

  useEffect(() => {
    document.addEventListener(eventType, handleEvent, true);

    return () => {
      document.removeEventListener(eventType, handleEvent, true);
    };
  });

  useEffect(() => {
    setTouchEvent("ontouchstart" in document.documentElement);
  }, []);
}
