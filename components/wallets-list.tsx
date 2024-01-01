"use client";

import { useCsvState } from "@/components/csv-data-provider";
import { useLabelStore } from "@/components/label-store-provider";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useWalletsState,
  WalletsListStateRecord,
} from "@/components/wallets-list-provider";
import { shortenAddress } from "@/lib/utils";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { FC, useMemo } from "react";
import { getAddress } from "viem";
import { useEnsName, useToken } from "wagmi";

const AddressCell: FC<{ row: Row<WalletsListStateRecord> }> = ({ row }) => {
  const { data } = useEnsName({ chainId: 1, address: row.getValue("address") });

  const link = (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500"
      href={`https://debank.com/profile/${row.getValue("address")}`}
    >
      {data ? data : row.getValue("address")}
    </a>
  );

  if (data) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent collisionPadding={8}>
          {row.getValue("address")}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
};

const TokenHeader: FC<{
  column: Column<WalletsListStateRecord, unknown>;
  id: string;
}> = ({ column, id }) => {
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

const TokenCell: FC<{ row: Row<WalletsListStateRecord>; id: string }> = ({
  row,
  id,
}) => {
  const val =
    row.getValue(id) !== undefined
      ? parseFloat(row.getValue(id)).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })
      : "0.00";

  if (!row.getValue(id)) {
    return "";
  }

  const data = (
    <span>
      {val.split(".")[0]}.
      <span className="text-[11px] text-muted-foreground">
        {val.split(".")[1]}
      </span>{" "}
    </span>
  );

  if (val === "0.00") {
    return (
      <div className="text-right whitespace-nowrap">
        <Tooltip>
          <TooltipTrigger asChild>{data}</TooltipTrigger>
          <TooltipContent collisionPadding={16}>
            Address has dust
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="text-right whitespace-nowrap">
      <span>
        {val.split(".")[0]}.
        <span className="text-[11px] text-muted-foreground">
          {val.split(".")[1]}
        </span>{" "}
      </span>
    </div>
  );
};

export const WalletsList = () => {
  const { data: csvState } = useCsvState();
  const walletsState = useWalletsState();

  const columns: ColumnDef<WalletsListStateRecord>[] = useMemo(
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
      {
        id: "count",
        accessorKey: "count",
        accessorFn: (row) => +row.count,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Has token(s)" />
        ),
        cell: ({ row }) => (
          <div className="w-[80px]">{row.getValue("count")}</div>
        ),
        enableSorting: true,
        enableHiding: false,
        meta: {
          header: {
            label: "Has token(s)",
          },
        },
      },
      ...(Object.keys(csvState).map((key) => ({
        id: key,
        accessorKey: key,
        accessorFn: (row) =>
          row[key] !== undefined ? parseFloat(row[key]) : 0,
        header: ({ column }) => <TokenHeader column={column} id={key} />,
        sortingFn: (rowA, rowB) => {
          const valA =
            rowA.getValue(key) !== undefined
              ? parseFloat(rowA.getValue(key))
              : 0;

          const valB =
            rowB.getValue(key) !== undefined
              ? parseFloat(rowB.getValue(key))
              : 0;

          return Number(valB) - Number(valA);
        },
        cell: ({ row }) => <TokenCell row={row} id={key} />,
        enableSorting: true,
        enableHiding: true,
        invertSorting: true,
      })) as ColumnDef<WalletsListStateRecord>[]),
    ],
    [csvState],
  );

  if (walletsState.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-sm font-medium">
          Upload some files to start cooking 🧑‍🍳.
        </span>
      </div>
    );
  }

  return (
    <DataTable
      data={walletsState}
      columns={columns}
      initialState={{
        sorting: [{ desc: true, id: "count" }],
        pagination: { pageSize: 20 },
      }}
      placeholder="No files uploaded"
    />
  );
};
