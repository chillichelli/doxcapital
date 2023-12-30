"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface SelectedWalletsContext {
  data: string[];
}

interface SelectedWalletsActionsContext {
  toggle: (addresses: string[]) => void;
}

const SelectedWalletsContext = createContext<
  SelectedWalletsContext | undefined
>(undefined);

const SelectedWalletsActionsContext = createContext<
  SelectedWalletsActionsContext | undefined
>(undefined);

interface SelectedWalletsProvider {
  children?: ReactNode;
}

export const SelectedWalletsProvider: FC<SelectedWalletsProvider> = ({
  children,
}) => {
  const [data, setData] = useState<string[]>([]);

  const toggle = useCallback((addresses: string[]) => {
    setData((data) => {
      const copy = [...data];
      for (let i = 0; i < addresses.length; i++) {
        const item = addresses[i];

        if (copy.includes(item)) {
          copy.splice(copy.indexOf(item), 1);
        } else {
          copy.push(item);
        }
      }

      return copy;
    });
  }, []);

  return (
    <SelectedWalletsActionsContext.Provider
      value={useMemo(() => ({ toggle }), [toggle])}
    >
      <SelectedWalletsContext.Provider
        value={useMemo(() => ({ data }), [data])}
      >
        {children}
      </SelectedWalletsContext.Provider>
    </SelectedWalletsActionsContext.Provider>
  );
};

export const useSelectedWallets = () => {
  const context = useContext(SelectedWalletsContext);
  if (!context) {
    throw new Error(
      "Hook can only be used inside Selected Wallets State Context",
    );
  }

  return context;
};

export const useSelectedWalletsActions = () => {
  const context = useContext(SelectedWalletsActionsContext);
  if (!context) {
    throw new Error(
      "Hook can only be used inside Selected Wallets Actions Context",
    );
  }

  return context;
};
