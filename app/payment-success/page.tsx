"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Download, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // In a real implementation, you would fetch order details from your backend
    // using the transaction ID or order ID from the URL params
    const mockOrderDetails = {
      orderId: "EMC-" + Date.now(),
      transactionId: searchParams.get("txid") || "mock_transaction_id",
      totalUSD: 245.5,
      totalXRP: 2.455,
      items: [
        {
          id: "nft-001",
          title: "Cosmic Dreams Collection #1",
          artist: "CryptoArtist",
          type: "NFT",
          downloadUrl: "/downloads/cosmic-dreams-nft.zip",
        },
        {
          id: "canvas-001",
          title: "Mountain Landscape Canvas",
          artist: "NaturePainter",
          type: "Physical",
          trackingNumber: "EMC123456789",
        },
      ],
      customerEmail: "customer@example.com",
      estimatedDelivery: "5-7 business days",
      paymentDate: new Date().toISOString(),
    }
    setOrderDetails(mockOrderDetails)
  }, [searchParams])

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Store
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50 mb-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
                <p className="text-green-700">
                  Your XRPL payment has been confirmed and your order is being processed.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="outline" className="bg-white">
                  Order #{orderDetails.orderId}
                </Badge>
                <Badge variant="outline" className="bg-white">
                  Transaction: {orderDetails.transactionId.slice(0, 10)}...
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails.items.map((item: any, index: number) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">by {item.artist}</p>
                    <Badge variant="outline" className="mt-1">
                      {item.type}
                    </Badge>
                  </div>
                  {item.type === "NFT" && (
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  )}
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total (USD)</span>
                  <span>${orderDetails.totalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Paid (XRP)</span>
                  <span>{orderDetails.totalXRP.toFixed(6)} XRP</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Status</span>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="space-y-6">
            {/* Digital Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Digital Downloads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your digital items are ready for download. Links have been sent to {orderDetails.customerEmail}
                </p>
                {orderDetails.items
                  .filter((item: any) => item.type === "NFT")
                  .map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">High-resolution files</p>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Physical Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Physical items will be shipped within 1-2 business days.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Delivery</span>
                    <span>{orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tracking</span>
                    <span className="text-muted-foreground">Will be provided via email</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2 bg-transparent" variant="outline">
                  <Share2 className="h-4 w-4" />
                  Share Your Purchase
                </Button>
                <Link href="/" className="block">
                  <Button className="w-full">Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction Details */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Transaction ID:</span>
                <p className="font-mono break-all">{orderDetails.transactionId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Payment Date:</span>
                <p>{new Date(orderDetails.paymentDate).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Payment Method:</span>
                <p>XRPL Blockchain (XUMM Wallet)</p>
              </div>
              <div>
                <span className="text-muted-foreground">Order Status:</span>
                <Badge className="bg-green-100 text-green-800">Processing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
