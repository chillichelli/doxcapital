"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  useWalletsState,
  WalletsListStateRecord,
} from "@/components/wallets-list-provider";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
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
