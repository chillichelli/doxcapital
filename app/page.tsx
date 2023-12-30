import { Dashboard } from "@/components/(landing)/Dashboard";
import { cookies } from "next/headers";
import { Main } from "@/components/ui/main";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

export default function IndexPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <Main>
      <div className="flex flex-col gap-6 items-baseline">
        <div className="flex flex-col mb-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/chillichelli"
            className="text-blue-500 font-bold text-lg"
          >
            @chillichelli
          </a>
          <h1
            className={cn(
              fontSans.className,
              "flex gap-6 items-center text-[40px] tracking-tighter font-bold",
            )}
          >
            Wallet Finder{" "}
          </h1>
          <span className="-mt-1 text-muted-foreground font-medium pl-1">
            for the kennel
          </span>
        </div>
        <div className="flex flex-col w-full">
          <Dashboard defaultLayout={defaultLayout} />
        </div>
      </div>
    </Main>
  );
}
