"use client";

import { FC, ReactNode } from "react";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const WagmiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
