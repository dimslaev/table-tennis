import { useState, useEffect, useRef } from "react";

export function useMinimumFetchTimeElapsed(
  isLoading: boolean,
  ms: number = 750
) {
  const [hasElapsed, setHasElapsed] = useState<boolean>(true);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isLoading) {
      timeout.current && clearTimeout(timeout.current);
      setHasElapsed(false);
      timeout.current = setTimeout(() => {
        setHasElapsed(true);
      }, ms);
    }
  }, [ms, isLoading]);

  return hasElapsed;
}
