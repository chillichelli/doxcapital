"use client";

import { CompareWallets } from "@/components/compare-wallets";
import { DropZone } from "@/components/drop-zone";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UploadedFiles } from "@/components/uploaded-files";
import { WalletsList } from "@/components/wallets-list";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Dashboard {
  defaultLayout: number[] | undefined;
}

export const Dashboard: FC<Dashboard> = ({ defaultLayout = [125, 500] }) => {
  return (
    <>
      <div className="flex lg:hidden flex-col h-full items-stretch w-full bg-card">
        <p
          className={cn(
            fontSans.className,
            "flex gap-3 items-baseline text-xl tracking-tighter font-bold p-5",
          )}
        >
          dox.capital{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/chillichelli"
            className="tracking-tight text-blue-500 font-semibold text-sm relative"
          >
            chillichelli
          </a>
        </p>
        <Separator />
        <div className="flex flex-col gap-3 p-5">
          <CardTitle>Upload CSV</CardTitle>
        </div>
        <Separator />
        <div className="flex flex-col gap-3 p-5 pb-0">
          <CardDescription>
            Download multiple CSV files containing holder data from the
            Etherscan token page and upload them here.
          </CardDescription>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <DropZone />
        </div>
        <Separator />
        <UploadedFiles />
        <Separator />
        <WalletsList />
        <Separator />
        <CompareWallets />
      </div>
      <div className="hidden h-full lg:block bg-card">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="h-full items-stretch w-full"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            minSize={15}
            maxSize={40}
            className="bg-muted/20"
          >
            <div className="flex items-center justify-between p-5">
              <p
                className={cn(
                  fontSans.className,
                  "flex gap-3 items-baseline text-xl tracking-tighter font-bold",
                )}
              >
                dox.capital{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/chillichelli"
                  className="tracking-tight text-blue-500 font-semibold text-sm relative"
                >
                  chillichelli
                </a>
              </p>
              <ModeToggle />
            </div>
            <Separator />
            <div className="flex flex-col gap-3 p-5">
              <CardTitle>Upload CSV</CardTitle>
            </div>
            <Separator />
            <div className="flex flex-col gap-3 p-5 pb-0">
              <CardDescription>
                Download multiple CSV files containing holder data from the
                Etherscan token page and upload them here.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <DropZone />
            </div>
            <Separator />
            <UploadedFiles />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={defaultLayout[1]}
            minSize={30}
            className="!overflow-auto"
          >
            <WalletsList />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};
