import { useCallback, useEffect } from "react";

function useDeboucedEffect(func, delay, deps) {
  const callback = useCallback(func, [deps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
}

export default useDeboucedEffect;
