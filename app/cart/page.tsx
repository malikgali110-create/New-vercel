"use client"

import { DemoPopup } from "@/components/demo-popup"
import { useCart } from "@/contexts/cart-context"
import { useHolder } from "@/contexts/holder-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Crown, Coins, ArrowLeft, Package, Download, Printer } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { state, dispatch, applyDiscount } = useCart()
  const { state: holderState } = useHolder()
  const [discountType, setDiscountType] = useState<'holder' | 'token' | null>(null)
  const [promoCode, setPromoCode] = useState('')

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
    return (usdAmount / 0.5).toFixed(2)
  }

  const getProductIcon = (productType: string) => {
    switch (productType) {
      case 'digital': return <Download className="h-4 w-4" />
      case 'bundle': return <Package className="h-4 w-4" />
      case 'print': return <Printer className="h-4 w-4" />
      default: return <ShoppingCart className="h-4 w-4" />
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DemoPopup />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Discover amazing digital artworks, NFT bundles, and print-on-demand products to get started.
          </p>
          <div className="flex gap-4">
            <Link href="/digital-arts">
              <Button>Browse Digital Arts</Button>
            </Link>
            <Link href="/nft-bundles">
              <Button variant="outline">Explore NFT Bundles</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DemoPopup />
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">{state.itemCount} items in your cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => {
            const itemPrice = item.licenseType === 'commercial' && (item.productType === 'digital' || item.productType === 'bundle') 
              ? item.priceUSD * 3 
              : item.priceUSD
            
            return (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground">by {item.artist}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          {getProductIcon(item.productType)}
                          <Badge variant="outline" className="capitalize">
                            {item.productType}
                          </Badge>
                          <Badge variant="outline">
                            {item.category}
                          </Badge>
                          {item.isNFT && <Badge className="bg-primary">NFT</Badge>}
                        </div>
                      </div>

                      {/* License selector for digital/bundle items */}
                      {(item.productType === 'digital' || item.productType === 'bundle') && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">License Type</Label>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={item.licenseType === 'personal' ? 'default' : 'outline'}
                              onClick={() => updateLicense(item.id, 'personal')}
                            >
                              Personal Use
                            </Button>
                            <Button
                              size="sm"
                              variant={item.licenseType === 'commercial' ? 'default' : 'outline'}
                              onClick={() => updateLicense(item.id, 'commercial')}
                            >
                              Commercial Use (+200%)
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.licenseType === 'personal' 
                              ? 'For personal projects and non-commercial use'
                              : 'For commercial projects, resale, and business use'
                            }
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Label className="text-sm">Quantity:</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {convertUSDToXRP(itemPrice * item.quantity)} XRP
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${(itemPrice * item.quantity).toFixed(2)} USD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Discount Toggles */}
              {holderState.isConnected && (
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    Holder Benefits
                  </h4>
                  
                  {holderState.isHolder && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <div>
                          <Label htmlFor="holder-discount-full" className="text-sm">
                            Lifetime 50% off prints
                          </Label>
                          <p className="text-xs text-muted-foreground">Applies to print items only</p>
                        </div>
                      </div>
                      <Switch
                        id="holder-discount-full"
                        checked={discountType === 'holder'}
                        onCheckedChange={() => handleDiscountToggle('holder')}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-blue-500" />
                      <div>
                        <Label htmlFor="token-bonus-full" className="text-sm">
                          10% token bonus
                        </Label>
                        <p className="text-xs text-muted-foreground">Applies to entire cart</p>
                      </div>
                    </div>
                    <Switch
                      id="token-bonus-full"
                      checked={discountType === 'token'}
                      onCheckedChange={() => handleDiscountToggle('token')}
                      disabled={!holderState.isHolder}
                    />
                  </div>
                  
                  {!holderState.isHolder && (
                    <div className="text-center p-3 border border-dashed border-muted-foreground/30 rounded">
                      <p className="text-sm text-muted-foreground mb-2">
                        Connect wallet to unlock holder benefits
                      </p>
                      <Link href="/wallet">
                        <Button size="sm" variant="outline">
                          Connect Wallet
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Promo Code */}
              <div className="space-y-2">
                <Label htmlFor="promo-code">Promo Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="promo-code"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({state.itemCount} items)</span>
                  <div className="text-right">
                    <div>{convertUSDToXRP(state.subtotal)} XRP</div>
                    <div className="text-sm text-muted-foreground">${state.subtotal.toFixed(2)} USD</div>
                  </div>
                </div>
                
                {state.discounts.appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      {state.discounts.appliedDiscount === 'holder' ? (
                        <Crown className="h-4 w-4" />
                      ) : (
                        <Coins className="h-4 w-4" />
                      )}
                      {state.discounts.appliedDiscount === 'holder' ? 'Holder' : 'Token'} Discount
                    </span>
                    <span>-{convertUSDToXRP(state.subtotal - state.total)} XRP</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <div className="text-right">
                    <div>{convertUSDToXRP(state.total)} XRP</div>
                    <div className="text-sm font-normal text-muted-foreground">${state.total.toFixed(2)} USD</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Pay with XRP • Worldwide shipping • Instant downloads
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security & Trust */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span>Powered by XRPL</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Secure payments • Instant settlements • Low fees
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}