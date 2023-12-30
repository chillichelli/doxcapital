import { DropZone } from "@/components/drop-zone";
import { Main } from "@/components/ui/main";
import { Separator } from "@/components/ui/separator";
import { WalletsList } from "@/components/wallets-list";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

export default function IndexPage() {
  return (
    <Main>
      <div className="flex flex-col gap-6 items-baseline">
        <h1
          className={cn(
            fontSans.className,
            "flex gap-6 items-center text-[40px] tracking-tighter font-bold",
          )}
        >
          Wallet Finder
        </h1>

        <div className="flex gap-4">
          <DropZone />
        </div>
        <Separator />
        <WalletsList />
      </div>
    </Main>
  );
}
