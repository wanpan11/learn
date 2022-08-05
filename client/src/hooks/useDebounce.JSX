import { useRef, useCallback } from "react";

const useDebounce = (second = 200) => {
  let timer = useRef(null);

  return useCallback(
    (fun, params) => {
      if (timer.current) {
        clearTimeout(timer);
      }

      timer.current = setTimeout(() => {
        fun(...params);
      }, second);
    },
    [timer, second]
  );
};

export default useDebounce;
