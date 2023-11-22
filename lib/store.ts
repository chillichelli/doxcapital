import { create } from "zustand"

interface SettingsStore {
  aooCost: number
  damageAndRepairCost: number
  internetCost: number
  garbageTaxCost: number
  waterCost: number
  ibiCost: number
  housekeepingCost: number
  rate: number
  renovation: number
  occupancyRate: number
  totalCost: number
  setRenovation(val: number): void
  setOccupancyRate(val: number): void
  setRate(val: number): void
  setAooCost(val: number): void
  setDamageAndRepairCost(val: number): void
  setGarbageTaxCost(val: number): void
  setIbiCost(val: number): void
  setHousekeepingCost(val: number): void
  setInternetCost(val: number): void
  setWaterCost(val: number): void
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  rate: 100,
  renovation: 0,
  occupancyRate: 70,
  aooCost: 900,
  damageAndRepairCost: 200,
  garbageTaxCost: 185,
  ibiCost: 1360,
  housekeepingCost: 5161,
  waterCost: 750,
  internetCost: 360,
  setOccupancyRate: (val: number) => set({ occupancyRate: val }),
  setRenovation: (val: number) => set({ renovation: val }),
  setRate: (val: number) => set({ rate: val }),
  setAooCost: (val: number) => set({ aooCost: val }),
  setDamageAndRepairCost: (val: number) => set({ damageAndRepairCost: val }),
  setGarbageTaxCost: (val: number) => set({ garbageTaxCost: val }),
  setIbiCost: (val: number) => set({ ibiCost: val }),
  setHousekeepingCost: (val: number) => set({ housekeepingCost: val }),
  setWaterCost: (val: number) => set({ waterCost: val }),
  setInternetCost: (val: number) => set({ internetCost: val }),
  get totalCost() {
    return (
      get().aooCost +
      get().damageAndRepairCost +
      get().ibiCost +
      get().housekeepingCost +
      get().waterCost +
      get().internetCost
    )
  },
}))
