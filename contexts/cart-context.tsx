"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface CartItem {
  id: string
  title: string
  artist: string
  price: number
  priceUSD: number
  currency: string
  image: string
  category: string
  quantity: number
  isNFT?: boolean
  licenseType?: 'personal' | 'commercial'
  productType: 'digital' | 'bundle' | 'print'
  printOptions?: {
    size?: string
    material?: string
    frame?: string
  }
}

interface CartState {
  items: CartItem[]
  subtotal: number
  discounts: {
    holderDiscount: number
    tokenBonus: number
    appliedDiscount: 'holder' | 'token' | null
  }
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "UPDATE_LICENSE"; payload: { id: string; licenseType: 'personal' | 'commercial' } }
  | { type: "APPLY_DISCOUNT"; payload: { type: 'holder' | 'token' | null; holderDiscount: number; tokenBonus: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  applyDiscount: (type: 'holder' | 'token' | null, holderDiscount: number, tokenBonus: number) => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        const subtotal = calculateSubtotal(updatedItems)
        const total = calculateTotalWithDiscounts(subtotal, state.discounts)
        return {
          ...state,
          items: updatedItems,
          subtotal,
          total,
          itemCount: calculateItemCount(updatedItems),
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        const subtotal = calculateSubtotal(newItems)
        const total = calculateTotalWithDiscounts(subtotal, state.discounts)
        return {
          ...state,
          items: newItems,
          subtotal,
          total,
          itemCount: calculateItemCount(newItems),
        }
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const subtotal = calculateSubtotal(newItems)
      const total = calculateTotalWithDiscounts(subtotal, state.discounts)
      return {
        ...state,
        items: newItems,
        subtotal,
        total,
        itemCount: calculateItemCount(newItems),
      }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
        )
        .filter((item) => item.quantity > 0)

      const subtotal = calculateSubtotal(updatedItems)
      const total = calculateTotalWithDiscounts(subtotal, state.discounts)
      return {
        ...state,
        items: updatedItems,
        subtotal,
        total,
        itemCount: calculateItemCount(updatedItems),
      }
    }

    case "UPDATE_LICENSE": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, licenseType: action.payload.licenseType } : item,
      )
      const subtotal = calculateSubtotal(updatedItems)
      const total = calculateTotalWithDiscounts(subtotal, state.discounts)
      return {
        ...state,
        items: updatedItems,
        subtotal,
        total,
      }
    }

    case "APPLY_DISCOUNT": {
      const discounts = {
        holderDiscount: action.payload.holderDiscount,
        tokenBonus: action.payload.tokenBonus,
        appliedDiscount: action.payload.type,
      }
      const total = calculateTotalWithDiscounts(state.subtotal, discounts)
      return {
        ...state,
        discounts,
        total,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        subtotal: 0,
        discounts: {
          holderDiscount: 0,
          tokenBonus: 0,
          appliedDiscount: null,
        },
        total: 0,
        itemCount: 0,
      }

    default:
      return state
  }
}

function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    // Use USD price for calculations, with license multiplier for digital/bundle items
    let itemPrice = item.priceUSD
    
    // Apply license pricing (commercial license costs 3x more for digital/bundle items)
    if ((item.productType === 'digital' || item.productType === 'bundle') && item.licenseType === 'commercial') {
      itemPrice = itemPrice * 3
    }
    
    return total + itemPrice * item.quantity
  }, 0)
}

function calculateTotalWithDiscounts(subtotal: number, discounts: CartState['discounts']): number {
  if (discounts.appliedDiscount === 'holder') {
    // Holder discount applies only to print items (handled in subtotal calculation)
    return subtotal * (1 - discounts.holderDiscount)
  } else if (discounts.appliedDiscount === 'token') {
    // Token bonus applies to entire cart
    return subtotal * (1 - discounts.tokenBonus)
  }
  return subtotal
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    subtotal: 0,
    discounts: {
      holderDiscount: 0,
      tokenBonus: 0,
      appliedDiscount: null,
    },
    total: 0,
    itemCount: 0,
  })

  const applyDiscount = (type: 'holder' | 'token' | null, holderDiscount: number, tokenBonus: number) => {
    dispatch({ 
      type: 'APPLY_DISCOUNT', 
      payload: { type, holderDiscount, tokenBonus } 
    })
  }

  return (
    <CartContext.Provider value={{ state, dispatch, applyDiscount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
