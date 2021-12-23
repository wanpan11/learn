import { useRef, useCallback } from 'react';

const useDebounce = (sceond = 200) => {
  let timer = useRef(null);

  return useCallback(
    (fun, params) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        fun(...params);
      }, sceond);
    },
    [timer, sceond]
  );
};

export default useDebounce;
