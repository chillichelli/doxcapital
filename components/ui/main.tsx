import { ReactNode } from "react";

interface Main {
  children: ReactNode;
}

export const Main = ({ children }: Main) => {
  return (
    <main className="mx-auto w-full flex-1 px-6 py-8 sm:p-8">
      <div className="mx-auto h-full">{children}</div>
    </main>
  );
};
