"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export interface CsvRecord {
  HolderAddress: string;
  Balance: string;
  PendingBalanceUpdate: string;
}

export type CsvState = Record<string, CsvRecord[]>;

interface CsvStateContext {
  data: CsvState;
}

interface CsvActionsContext {
  setData: Dispatch<SetStateAction<CsvState>>;
}

const CsvStateContext = createContext<CsvStateContext | undefined>(undefined);

const CsvActionsContext = createContext<CsvActionsContext | undefined>(
  undefined,
);

interface CsvsProvider {
  children?: ReactNode;
}

export const CsvProvider: FC<CsvsProvider> = ({ children }) => {
  const [data, setData] = useState<CsvState>({});

  return (
    <CsvActionsContext.Provider value={useMemo(() => ({ setData }), [])}>
      <CsvStateContext.Provider value={useMemo(() => ({ data }), [data])}>
        {children}
      </CsvStateContext.Provider>
    </CsvActionsContext.Provider>
  );
};

export const useCsvState = () => {
  const context = useContext(CsvStateContext);
  if (!context) {
    throw new Error("Hook can only be used inside Csv State Context");
  }

  return context;
};

export const useCsvStateActions = () => {
  const context = useContext(CsvActionsContext);
  if (!context) {
    throw new Error("Hook can only be used inside Csv Actions Context");
  }

  return context;
};
