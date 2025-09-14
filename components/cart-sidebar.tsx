"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useHolder } from "@/contexts/holder-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Crown, Coins } from "lucide-react"
import Link from "next/link"

export function CartSidebar() {
  const { state, dispatch, applyDiscount } = useCart()
  const { state: holderState } = useHolder()
  const [isOpen, setIsOpen] = useState(false)
  const [discountType, setDiscountType] = useState<'holder' | 'token' | null>(null)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateLicense = (id: string, licenseType: 'personal' | 'commercial') => {
    dispatch({ type: "UPDATE_LICENSE", payload: { id, licenseType } })
  }

  const handleDiscountToggle = (type: 'holder' | 'token') => {
    if (discountType === type) {
      setDiscountType(null)
      applyDiscount(null, 0, 0)
    } else {
      setDiscountType(type)
      if (type === 'holder') {
        applyDiscount('holder', holderState.holderBenefits.printDiscount, 0)
      } else {
        applyDiscount('token', 0, holderState.holderBenefits.tokenBonus)
      }
    }
  }

  const convertUSDToXRP = (usdAmount: number) => {
    // Demo conversion rate: 1 XRP = $0.50
    return (usdAmount / 0.5).toFixed(2)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({state.itemCount} items)
          </SheetTitle>
        </SheetHeader>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">Add some amazing artworks to get started!</p>
            <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 mt-6">
              <div className="space-y-4">
                {state.items.map((item) => {
                  const itemPrice = item.licenseType === 'commercial' && (item.productType === 'digital' || item.productType === 'bundle') 
                    ? item.priceUSD * 3 
                    : item.priceUSD
                  
                  return (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">by {item.artist}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.productType}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            {item.isNFT && <Badge className="text-xs bg-primary">NFT</Badge>}
                            {item.licenseType && (
                              <Badge variant={item.licenseType === 'commercial' ? 'default' : 'secondary'} className="text-xs capitalize">
                                {item.licenseType}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* License selector for digital/bundle items */}
                        {(item.productType === 'digital' || item.productType === 'bundle') && (
                          <div className="flex items-center gap-2 text-xs">
                            <Label className="text-xs">License:</Label>
                            <Button
                              size="sm"
                              variant={item.licenseType === 'personal' ? 'default' : 'outline'}
                              className="h-6 px-2 text-xs"
                              onClick={() => updateLicense(item.id, 'personal')}
                            >
                              Personal
                            </Button>
                            <Button
                              size="sm"
                              variant={item.licenseType === 'commercial' ? 'default' : 'outline'}
                              className="h-6 px-2 text-xs"
                              onClick={() => updateLicense(item.id, 'commercial')}
                            >
                              Commercial
                            </Button>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">
                                {convertUSDToXRP(itemPrice)} XRP
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ${itemPrice.toFixed(2)} USD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              {/* Discount Toggles */}
              {holderState.isConnected && (
                <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    Holder Benefits
                  </h4>
                  
                  {holderState.isHolder && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="h-3 w-3 text-yellow-500" />
                        <Label htmlFor="holder-discount" className="text-xs">
                          50% off prints (lifetime)
                        </Label>
                      </div>
                      <Switch
                        id="holder-discount"
                        checked={discountType === 'holder'}
                        onCheckedChange={() => handleDiscountToggle('holder')}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-3 w-3 text-blue-500" />
                      <Label htmlFor="token-bonus" className="text-xs">
                        10% token bonus
                      </Label>
                    </div>
                    <Switch
                      id="token-bonus"
                      checked={discountType === 'token'}
                      onCheckedChange={() => handleDiscountToggle('token')}
                      disabled={!holderState.isHolder}
                    />
                  </div>
                  
                  {!holderState.isHolder && (
                    <p className="text-xs text-muted-foreground">
                      Connect wallet and verify holder status for discounts
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <div className="text-right">
                    <div>{convertUSDToXRP(state.subtotal)} XRP</div>
                    <div className="text-xs text-muted-foreground">${state.subtotal.toFixed(2)} USD</div>
                  </div>
                </div>
                
                {state.discounts.appliedDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      {state.discounts.appliedDiscount === 'holder' ? (
                        <Crown className="h-3 w-3" />
                      ) : (
                        <Coins className="h-3 w-3" />
                      )}
                      {state.discounts.appliedDiscount === 'holder' ? 'Holder' : 'Token'} Discount
                    </span>
                    <span>-{convertUSDToXRP(state.subtotal - state.total)} XRP</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-xs text-muted-foreground">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <div className="text-right">
                    <div>{convertUSDToXRP(state.total)} XRP</div>
                    <div className="text-sm font-normal text-muted-foreground">${state.total.toFixed(2)} USD</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gap-2">
                    <CreditCard className="h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
