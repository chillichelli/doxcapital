import { erc20ABI, useContractRead, UseContractReadConfig } from "wagmi";

type UseTotalSupplyProps = Omit<UseContractReadConfig, "functionName">;

export const useTotalSupply = ({
  chainId = 1,
  address,
}: UseTotalSupplyProps) => {
  return useContractRead({
    chainId,
    address,
    abi: erc20ABI,
    functionName: "totalSupply" as const,
  });
};
