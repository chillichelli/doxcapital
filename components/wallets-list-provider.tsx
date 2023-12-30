"use client";

import { useCsvState } from "@/components/csv-data-provider";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

export interface WalletsListStateRecord {
  address: string;
  count: number;
}

const WalletListStateContext = createContext<
  WalletsListStateRecord[] | undefined
>(undefined);

interface WalletsListProvider {
  children?: ReactNode;
}

export const WalletsListProvider: FC<WalletsListProvider> = ({ children }) => {
  const { data: csvData } = useCsvState();
  const data: WalletsListStateRecord[] = useMemo(() => {
    const data: Record<string, number> = {};

    Object.entries(csvData).forEach(([, records]) => {
      Object.entries(records).forEach(([, record]) => {
        if (data[record.HolderAddress] && record.HolderAddress !== "") {
          data[record.HolderAddress] += 1;
        } else {
          data[record.HolderAddress] = 1;
        }
      });
    });

    console.log(data);
    return Object.keys(data).map((key) => ({ address: key, count: data[key] }));
  }, [csvData]);

  return (
    <WalletListStateContext.Provider value={useMemo(() => data, [data])}>
      {children}
    </WalletListStateContext.Provider>
  );
};

export const useWalletsState = () => {
  const context = useContext(WalletListStateContext);
  if (!context) {
    throw new Error("Hook can only be used inside Wallet List State Context");
  }

  return context;
};
