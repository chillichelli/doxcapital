import { Dashboard } from "@/components/(landing)/Dashboard";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import React from "react";

export default function IndexPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <>
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
      <Dashboard defaultLayout={defaultLayout} />
    </>
  );
}
