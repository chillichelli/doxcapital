import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  align?: "left" | "right";
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  align = "left",
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className, "text-xs")}>{title}</div>;
  }

  const onClick = useCallback(() => {
    if (column.getIsSorted() === "desc") {
      column.toggleSorting(false);
    } else if (column.getIsSorted() === "asc") {
      column.toggleSorting(true);
    } else {
      column.toggleSorting(false);
    }
  }, [column]);

  return (
    <div
      className={cn(
        align === "right" ? "justify-end" : "",
        "flex items-center space-x-2",
        className,
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          "hover:text-primary text-xs flex items-center h-8 data-[state=open]:bg-accent",
        )}
      >
        {align === "right" ? (
          <>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="mr-2 h-3 w-3" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="mr-2 h-3 w-3" />
            ) : (
              <CaretSortIcon className="mr-2 h-4 w-4" />
            )}
          </>
        ) : null}
        <span>{title}</span>
        {align === "left" ? (
          <>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-3 w-3" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-3 w-3" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </>
        ) : null}
      </button>
    </div>
  );
}
