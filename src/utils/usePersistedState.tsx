import { Dispatch, SetStateAction, useEffect, useState } from "react";
import isJSON from "./isJSON";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(
   key: string,
   initialState: T,
   validation?: T[]
): Response<T> {
   const [state, setState] = useState(() => {
      const item = localStorage.getItem(key) as string;
      const storage: T = isJSON(item) && JSON.parse(item);
      return !!validation?.length
         ? validation.includes(storage)
            ? storage
            : initialState
         : storage ?? initialState;
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
   }, [key, state]);

   return [state, setState];
}

export default usePersistedState;
