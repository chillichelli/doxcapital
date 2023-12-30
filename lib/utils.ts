import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, characters = 4): string {
  try {
    return `${address.substring(0, characters + 2)}...${address.substring(
      42 - characters,
    )}`;
  } catch {
    throw `Invalid 'address' parameter '${address}'.`;
  }
}
