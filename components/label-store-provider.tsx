"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface LabelStoreContext {
  store: Record<string, string>;
}

interface LabelStoreActionsContext {
  label(payload: { address: string; label: string }): void;
}

const LabelStoreContext = createContext<LabelStoreContext | undefined>(
  undefined,
);

const LabelStoreActionsContext = createContext<
  LabelStoreActionsContext | undefined
>(undefined);

interface LabelStoreProvider {
  children?: ReactNode;
}

export const LabelStoreProvider: FC<LabelStoreProvider> = ({ children }) => {
  const [store, setStore] = useLocalStorage<Record<string, string>>(
    "labels",
    {},
  );

  const label = useCallback(
    ({ address, label }: { address: string; label: string }) => {
      setStore((data) => {
        const copy = { ...data };
        copy[address] = label;

        return copy;
      });
    },
    [setStore],
  );

  return (
    <LabelStoreActionsContext.Provider
      value={useMemo(() => ({ label }), [label])}
    >
      <LabelStoreContext.Provider value={useMemo(() => ({ store }), [store])}>
        {children}
      </LabelStoreContext.Provider>
    </LabelStoreActionsContext.Provider>
  );
};

export const useLabelStore = () => {
  const context = useContext(LabelStoreContext);
  if (!context) {
    throw new Error(
      "Hook can only be used inside Selected Wallets State Context",
    );
  }

  return context;
};

export const useLabelStoreActions = () => {
  const context = useContext(LabelStoreActionsContext);
  if (!context) {
    throw new Error(
      "Hook can only be used inside Selected Wallets Actions Context",
    );
  }

  return context;
};
