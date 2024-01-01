"use client";

import { useCsvState } from "@/components/csv-data-provider";
import { useLabelStore } from "@/components/label-store-provider";
import { useSelectedWallets } from "@/components/selected-wallets-provider";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { shortenAddress } from "@/lib/utils";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { FC, useMemo } from "react";
import { getAddress } from "viem";
import { useEnsName, useToken } from "wagmi";

type Record = { address: string; [key: string]: string };

const TokenHeader: FC<{ column: Column<Record, unknown>; id: string }> = ({
  column,
  id,
}) => {
  const { store } = useLabelStore();
  const { data: tokenData } = useToken({
    address: getAddress(id as `0x${string}`),
  });

  return (
    <DataTableColumnHeader
      column={column}
      title={`${
        tokenData
          ? tokenData.symbol
          : store[id]
            ? store[id]
            : shortenAddress(id)
      }`}
      align="right"
    />
  );
};

const TokenCell: FC<{ row: Row<Record>; id: string }> = ({ row, id }) => {
  const { store } = useLabelStore();
  const { data: tokenData } = useToken({
    address: getAddress(id as `0x${string}`),
  });

  return (
    <div className="text-right font-medium">
      {row.getValue(id)
        ? parseFloat(row.getValue(id)).toLocaleString("en-US")
        : ""}{" "}
      <span className="font-normal text-muted-foreground">
        {tokenData ? tokenData.symbol : store[id] ? store[id] : ""}
      </span>
    </div>
  );
};

const AddressCell: FC<{ row: Row<Record> }> = ({ row }) => {
  const { data } = useEnsName({ chainId: 1, address: row.getValue("address") });

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500"
      href={`https://debank.com/profile/${row.getValue("address")}`}
    >
      {data ? data : shortenAddress(row.getValue("address"))}
    </a>
  );
};

export const CompareWallets = () => {
  const { data } = useCsvState();
  const { data: selectedWallets } = useSelectedWallets();

  const columns: ColumnDef<Record>[] = useMemo(
    () => [
      {
        accessorKey: "address",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => <AddressCell row={row} />,
        enableSorting: false,
        enableHiding: false,
      },
      ...(Object.keys(data).map((key) => ({
        id: key,
        accessorKey: key,
        header: ({ column }) => <TokenHeader column={column} id={key} />,
        sortingFn: (rowA, rowB) => {
          return (
            parseFloat(rowA.getValue(key)) - parseFloat(rowB.getValue(key))
          );
        },
        cell: ({ row }) => <TokenCell row={row} id={key} />,
        enableSorting: true,
        enableHiding: false,
      })) as ColumnDef<Record>[]),
    ],
    [data],
  );

  const tableData: Record[] = useMemo(() => {
    return selectedWallets.reduce<Record[]>((acc, cur) => {
      const row: Record = {
        address: cur,
      };

      Object.keys(data).map((key) => {
        const item = data[key].find((el) => el.HolderAddress === cur);
        if (item) {
          row[key] = item.Balance;
        }
      });

      acc.push(row);

      return acc;
    }, []);
  }, [data, selectedWallets]);

  return (
    <DataTable
      data={tableData}
      columns={columns}
      initialState={{ sorting: [{ desc: true, id: "count" }] }}
      pagination={false}
      toolbar={false}
      placeholder="Select wallets to compare"
    />
  );
};
