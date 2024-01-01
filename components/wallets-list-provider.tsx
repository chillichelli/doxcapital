"use client";

import { useCsvState } from "@/components/csv-data-provider";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

export interface WalletsListStateRecord {
  [x: string]: string;
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
    const data: Record<string, Record<string, string>> = {};

    Object.entries(csvData).forEach(([token, records]) => {
      Object.entries(records).forEach(([, record]) => {
        if (data[record.HolderAddress] && record.HolderAddress !== "") {
          data[record.HolderAddress] = {
            ...data[record.HolderAddress],
            address: record.HolderAddress,
            count: `${+data[record.HolderAddress].count + 1}`,
            [token]: record.Balance,
          };
        } else {
          data[record.HolderAddress] = {
            address: record.HolderAddress,
            count: "1",
            [token]: record.Balance,
          };
        }
      });
    });

    return Object.values(data);
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
