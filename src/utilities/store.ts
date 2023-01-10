import React from "react";
import create, { StoreApi, UseBoundStore } from "zustand";
import { combine, devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type UseStore<T extends any> = UseBoundStore<StoreApi<T>>;

export const createStoreSelectors = <
  T extends Record<string | number | symbol, unknown>,
  S extends {
    // [k: string]: <U extends unknown>(state: T) => any;
    [k: string]: (state: T) => any;
  }
>(
  store: UseBoundStore<StoreApi<T>>,
  selectors: S
) => selectors;

export const useLocalStore = <S extends UseBoundStore<StoreApi<any>>>(
  store: S
): S => {
  const useStoreRef = React.useRef(store);
  React.useEffect(() => {
    const useStore = useStoreRef.current;
    return () => {
      useStore.destroy();
    };
  }, []);
  return useStoreRef.current;
};

export { create, combine, devtools, immer, subscribeWithSelector };
export type { UseBoundStore, StoreApi, UseStore };
