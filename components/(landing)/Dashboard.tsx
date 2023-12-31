"use client";

import { CompareWallets } from "@/components/compare-wallets";
import { DropZone } from "@/components/drop-zone";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { UploadedFiles } from "@/components/uploaded-files";
import { WalletsList } from "@/components/wallets-list";
import { FC } from "react";

interface Dashboard {
  defaultLayout: number[] | undefined;
}

export const Dashboard: FC<Dashboard> = ({ defaultLayout = [125, 500] }) => {
  return (
    <>
      <div className="flex lg:hidden flex-col h-full items-stretch w-full bg-card">
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
          >
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
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <WalletsList />
            <Separator />
            <CompareWallets />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};
