"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { XRPLPayment } from "@/components/xrpl-payment"
import { CreditCard, Wallet, ShoppingCart, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface DirectPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    title: string
    artist: string
    price: number
    currency: string
    image: string
    category: string
    type?: "digital" | "print" | "nft"
  }
  selectedOptions?: {
    format?: string
    size?: string
    material?: string
    quantity?: number
  }
}

export function DirectPurchaseModal({ 
  isOpen, 
  onClose, 
  product, 
  selectedOptions = { quantity: 1 } 
}: DirectPurchaseModalProps) {
  const router = useRouter()
  const [showPayment, setShowPayment] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const quantity = selectedOptions.quantity || 1
  const totalPrice = product.price * quantity
  const isDigitalOnly = product.type === "digital" || product.type === "nft"

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ["firstName", "lastName", "email"]
    return required.every((field) => customerInfo[field as keyof typeof customerInfo].trim() !== "")
  }

  const proceedToPayment = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields")
      return
    }
    setShowPayment(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    onClose()
    router.push(`/payment-success?txid=${transactionId}&order=${Date.now()}&product=${product.id}`)
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    // Handle payment error (show message, etc.)
  }

  const orderData = {
    orderId: `EMC-DIRECT-${Date.now()}`,
    totalUSD: totalPrice,
    items: [{
      id: product.id,
      title: product.title,
      artist: product.artist,
      price: product.price,
      currency: product.currency,
      quantity: quantity,
      image: product.image,
      category: product.category,
      type: product.type,
      selectedOptions
    }],
    customerInfo,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {showPayment ? "Complete Payment" : "Quick Purchase"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!showPayment ? (
            <>
              {/* Product Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.title}</h4>
                      <p className="text-sm text-muted-foreground">by {product.artist}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{product.category}</Badge>
                        {product.type && (
                          <Badge variant="secondary">
                            {product.type === "digital" ? "Digital Download" : 
                             product.type === "print" ? "Print on Demand" : "NFT"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{product.price} {product.currency}</div>
                      <div className="text-sm text-muted-foreground">Qty: {quantity}</div>
                    </div>
                  </div>

                  {selectedOptions && Object.keys(selectedOptions).length > 1 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Selected Options:</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {selectedOptions.format && (
                          <div><span className="text-muted-foreground">Format:</span> {selectedOptions.format}</div>
                        )}
                        {selectedOptions.size && (
                          <div><span className="text-muted-foreground">Size:</span> {selectedOptions.size}</div>
                        )}
                        {selectedOptions.material && (
                          <div><span className="text-muted-foreground">Material:</span> {selectedOptions.material}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <Separator />
                  
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>{totalPrice} {product.currency}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  
                  {isDigitalOnly && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Wallet className="h-4 w-4" />
                        <span className="font-medium">Digital Delivery</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        Your digital files will be sent to the email address above after payment confirmation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button onClick={proceedToPayment} className="w-full" size="lg">
                <Wallet className="h-4 w-4 mr-2" />
                Pay {totalPrice} {product.currency} with XUMM
              </Button>
            </>
          ) : (
            <XRPLPayment
              orderData={orderData}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}