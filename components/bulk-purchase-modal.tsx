"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingCart, CreditCard, Wallet, Gift, Zap, Package, Percent, Crown } from "lucide-react"

interface BulkPurchaseItem {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  type: "pack" | "individual"
}

interface BulkPurchaseModalProps {
  items: BulkPurchaseItem[]
  trigger?: React.ReactNode
}

export function BulkPurchaseModal({ items, trigger }: BulkPurchaseModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(items.map((item) => item.id))
  const [paymentMethod, setPaymentMethod] = useState("xumm")
  const [applyBulkDiscount, setApplyBulkDiscount] = useState(true)

  const calculateDiscount = () => {
    if (!applyBulkDiscount) return 0
    if (selectedItems.length >= 5) return 20
    if (selectedItems.length >= 3) return 15
    if (selectedItems.length >= 2) return 10
    return 0
  }

  const getSubtotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = items.find((i) => i.id === itemId)
      return total + (item?.price || 0)
    }, 0)
  }

  const getDiscount = () => {
    const subtotal = getSubtotal()
    return Math.round(subtotal * (calculateDiscount() / 100))
  }

  const getTotal = () => {
    return getSubtotal() - getDiscount()
  }

  const handleItemToggle = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 rounded-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Bulk Purchase
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Bulk Purchase ({selectedItems.length} items)
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Items Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Select Items</h3>
            <div className="space-y-3 max-h-96 overflow-auto">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={`transition-all ${selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleItemToggle(item.id)}
                      />
                      <div className="relative h-12 w-12 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">{item.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold text-foreground">{item.price} XRP</span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-muted-foreground line-through">{item.originalPrice} XRP</span>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Purchase Summary</h3>

              {/* Bulk Discount Info */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900">Bulk Discount Active</span>
                  </div>
                  <div className="text-sm text-green-700">
                    {calculateDiscount()}% off for purchasing {selectedItems.length} items
                  </div>
                  {selectedItems.length >= 5 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                      <Crown className="h-3 w-3" />
                      Maximum bulk discount applied!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Price Breakdown */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({selectedItems.length} items)</span>
                    <span className="text-foreground">{getSubtotal()} XRP</span>
                  </div>
                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Bulk Discount ({calculateDiscount()}%)</span>
                      <span className="text-green-600">-{getDiscount()} XRP</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-foreground text-lg">{getTotal()} XRP</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    You save {getSubtotal() - getTotal()} XRP with this bulk purchase
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="xumm" id="xumm" />
                    <Label htmlFor="xumm" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="h-4 w-4" />
                      <div>
                        <div className="font-medium">XUMM Wallet</div>
                        <div className="text-xs text-muted-foreground">Pay with XRP via XUMM</div>
                      </div>
                    </Label>
                    <Badge className="bg-blue-500 text-white text-xs">Recommended</Badge>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Credit Card</div>
                        <div className="text-xs text-muted-foreground">Coming soon</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Bonus Items */}
            {selectedItems.length >= 3 && (
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-900">Bonus Items Included</span>
                  </div>
                  <div className="text-sm text-purple-700">
                    • Exclusive artist commentary videos • High-resolution wallpaper pack • Early access to future
                    collections
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Purchase Button */}
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full"
              disabled={selectedItems.length === 0}
            >
              <Zap className="h-4 w-4 mr-2" />
              Complete Bulk Purchase ({getTotal()} XRP)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
