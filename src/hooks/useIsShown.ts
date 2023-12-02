import { useCallback, useState } from "react";

export default function useIsShown(initialValue?: boolean) {
  const [isShown, setIsShown] = useState(initialValue ?? false);

  const onOpen = useCallback(() => {
    setIsShown(true);
  }, []);

  const onClose = useCallback(() => {
    setIsShown(false);
  }, []);

  return [isShown, onOpen, onClose] as const;
}
