import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/data-table/data-table-debounced-input";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

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
  const onClick = useCallback(() => {
    if (column.getIsSorted() === "desc") {
      column.toggleSorting(false);
    } else if (column.getIsSorted() === "asc") {
      column.toggleSorting(true);
    } else {
      column.toggleSorting(false);
    }
  }, [column]);

  if (!column.getCanSort()) {
    return <div className={cn(className, "text-xs")}>{title}</div>;
  }

  const columnFilterValue = column.getFilterValue();

  return (
    <div
      className={cn(
        align === "right" ? "justify-end" : "",
        "flex items-center space-x-2 whitespace-nowrap",
        className,
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            onClick={onClick}
            size="sm"
            className={cn(
              align === "right" ? "-mr-3" : "-ml-3",
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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-fit"
          collisionPadding={16}
        >
          <div className="flex gap-1">
            <DebouncedInput
              tabIndex={1}
              className="w-[120px]"
              type="number"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={(columnFilterValue as [number, number])?.[0] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  value,
                  old?.[1],
                ])
              }
              placeholder={`Min ${
                column.getFacetedMinMaxValues()?.[0]
                  ? `(${column.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }`}
            />
            <DebouncedInput
              tabIndex={2}
              className="w-[120px]"
              type="number"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={(columnFilterValue as [number, number])?.[1] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  value,
                ])
              }
              placeholder={`Max ${
                column.getFacetedMinMaxValues()?.[1]
                  ? `(${column.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }`}
            />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
