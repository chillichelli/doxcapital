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
      <Dashboard defaultLayout={defaultLayout} />
    </>
  );
}
