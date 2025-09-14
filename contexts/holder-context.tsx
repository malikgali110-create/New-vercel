"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface HolderState {
  isHolder: boolean
  isConnected: boolean
  walletAddress?: string
  holderBenefits: {
    printDiscount: number // 50% off prints
    tokenBonus: number // 10% token bonus
    prioritySupport: boolean
    airdropEligible: boolean
  }
}

interface HolderContextType {
  state: HolderState
  toggleHolderStatus: () => void
  connectWallet: (address?: string) => void
  disconnectWallet: () => void
}

const HolderContext = createContext<HolderContextType | null>(null)

const defaultHolderBenefits = {
  printDiscount: 0.5, // 50%
  tokenBonus: 0.1, // 10%
  prioritySupport: true,
  airdropEligible: true,
}

export function HolderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HolderState>({
    isHolder: false,
    isConnected: false,
    walletAddress: undefined,
    holderBenefits: {
      printDiscount: 0,
      tokenBonus: 0,
      prioritySupport: false,
      airdropEligible: false,
    },
  })

  const toggleHolderStatus = () => {
    setState(prev => ({
      ...prev,
      isHolder: !prev.isHolder,
      holderBenefits: !prev.isHolder ? defaultHolderBenefits : {
        printDiscount: 0,
        tokenBonus: 0,
        prioritySupport: false,
        airdropEligible: false,
      },
    }))
  }

  const connectWallet = (address?: string) => {
    setState(prev => ({
      ...prev,
      isConnected: true,
      walletAddress: address || "rDemo1234567890abcdef",
    }))
  }

  const disconnectWallet = () => {
    setState(prev => ({
      ...prev,
      isConnected: false,
      walletAddress: undefined,
      isHolder: false,
      holderBenefits: {
        printDiscount: 0,
        tokenBonus: 0,
        prioritySupport: false,
        airdropEligible: false,
      },
    }))
  }

  return (
    <HolderContext.Provider value={{ state, toggleHolderStatus, connectWallet, disconnectWallet }}>
      {children}
    </HolderContext.Provider>
  )
}

export function useHolder() {
  const context = useContext(HolderContext)
  if (!context) {
    throw new Error("useHolder must be used within a HolderProvider")
  }
  return context
}