"use client";

import { useSelectedWalletsActions } from "@/components/selected-wallets-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  useWalletsState,
  WalletsListStateRecord,
} from "@/components/wallets-list-provider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import { FC, useCallback } from "react";

const TokenCell: FC<{ row: Row<WalletsListStateRecord> }> = ({ row }) => {
  const { toggle } = useSelectedWalletsActions();

  const onCheckedChange = useCallback(
    (value: CheckedState) => {
      row.toggleSelected(!!value);
      toggle([row.getValue("address")]);
    },
    [row, toggle],
  );

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={onCheckedChange}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  );
};

export const columns: ColumnDef<WalletsListStateRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => <TokenCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "count",
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Has token(s)" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("count")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
          href={`https://debank.com/profile/${row.getValue("address")}`}
        >
          {row.getValue("address")}
        </a>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export const WalletsList = () => {
  const data = useWalletsState();

  return (
    <DataTable
      data={data}
      columns={columns}
      initialState={{ sorting: [{ desc: true, id: "count" }] }}
    />
  );
};
