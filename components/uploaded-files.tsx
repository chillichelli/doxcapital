import {
  CsvState,
  useCsvState,
  useCsvStateActions,
} from "@/components/csv-data-provider";
import {
  useLabelStore,
  useLabelStoreActions,
} from "@/components/label-store-provider";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getAddress } from "viem";
import { CheckIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pencil, X, XIcon } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { useToken } from "wagmi";

export const UploadedFiles = () => {
  const { data } = useCsvState();
  const { setData } = useCsvStateActions();

  const keys = Object.keys(data);

  const remove = useCallback(
    (item: string) => {
      setData((data) => {
        const copy = { ...data };
        delete copy[item];

        return copy;
      });
    },
    [setData],
  );

  return (
    <div className="">
      <div className="flex flex-col gap-3 px-3 py-5">
        <CardTitle>{keys.length} file(s) uploaded</CardTitle>
      </div>
      <Separator />
      <ScrollArea className="h-fit">
        <div className="space-y-2 p-3">
          {keys.map((item) => (
            <Item key={item} data={data} item={item} remove={remove} />
          ))}
        </div>
      </ScrollArea>
      {keys.length === 0 ? (
        <div className="flex items-center justify-center text-xs text-muted-foreground pb-5 h-[200px]">
          No files uploaded
        </div>
      ) : null}
    </div>
  );
};

interface Item {
  data: CsvState;
  item: string;
  remove: (item: string) => void;
}

export const Item: FC<Item> = ({ data, item, remove }) => {
  const { data: tokenData } = useToken({
    address: getAddress(item as `0x${string}`),
  });

  const { store } = useLabelStore();
  const { label } = useLabelStoreActions();

  const [value, setValue] = useState<string>(store[item] ? store[item] : item);
  const [editMode, setEditMode] = useState<boolean>(false);

  const save = useCallback(
    (val: string) => {
      label({ address: item, label: val });
      setEditMode(false);
    },
    [item, label],
  );

  const cancel = useCallback(() => {
    setValue(item);
    setEditMode(false);
  }, [item]);

  return (
    <div
      key={item}
      className={cn(
        "pr-[54px] relative gap-2 rounded-lg border pl-3 py-2 text-sm transition-all hover:bg-accent",
      )}
    >
      <div className="flex items-center gap-2">
        {editMode ? (
          <div className="relative w-full">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2 absolute right-2 top-2">
              <CheckIcon
                onClick={() => save(value)}
                className="h-5 w-5 cursor-pointer bg-secondary p-0.5 border rounded-sm"
              />
              <XIcon
                onClick={cancel}
                className="h-5 w-5 cursor-pointer bg-secondary p-0.5 border rounded-sm"
              />
            </div>
          </div>
        ) : (
          <>
            {!tokenData ? (
              <div className="w-3 h-3">
                <Pencil
                  className="min-w-3 min-h-3 w-3 h-3 cursor-pointer"
                  onClick={() => setEditMode((prev) => !prev)}
                />
              </div>
            ) : null}
            <div className="truncate">
              {tokenData ? tokenData.symbol : store[item] ? store[item] : item}
            </div>
          </>
        )}
      </div>
      <div className={cn("flex gap-2 text-xs text-muted-foreground")}>
        {tokenData?.symbol ? (
          <a
            rel="noopener noreferrer"
            className="text-blue-500"
            target="_blank"
            href={`https://etherscan.io/address/${item}`}
          >
            Etherscan
          </a>
        ) : null}
        {tokenData?.symbol ? (
          <a
            rel="noopener noreferrer"
            className="text-blue-500"
            target="_blank"
            href={`https://dexscreener.com/ethereum/${item}`}
          >
            Dexscreener
          </a>
        ) : null}
        {data[item].length} rows{" "}
      </div>
      <div className="absolute right-2 top-2">
        <Button
          onClick={() => remove(item)}
          variant="outline"
          size="icon"
          className="!p-1 shadow-sm"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
