"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, Smartphone, QrCode, CheckCircle, XCircle, Clock } from "lucide-react"
import { convertUSDToXRP, createXUMMPayload, createXUMMTransaction, checkPaymentStatus } from "@/lib/xrpl-utils"

interface XRPLPaymentProps {
  orderData: {
    orderId: string
    totalUSD: number
    items: any[]
    customerInfo: any
  }
  onPaymentSuccess: (transactionId: string) => void
  onPaymentError: (error: string) => void
}

export function XRPLPayment({ orderData, onPaymentSuccess, onPaymentError }: XRPLPaymentProps) {
  const [paymentState, setPaymentState] = useState<"idle" | "creating" | "waiting" | "success" | "error">("idle")
  const [xummData, setXummData] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  const xrpAmount = convertUSDToXRP(orderData.totalUSD)
  const destinationAddress = "rEMCStoreDestinationAddress123456789" // EMC Store XRPL address

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (paymentState === "waiting" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && paymentState === "waiting") {
      setPaymentState("error")
      setErrorMessage("Payment request expired. Please try again.")
    }
    return () => clearInterval(interval)
  }, [paymentState, timeLeft])

  useEffect(() => {
    let pollInterval: NodeJS.Timeout
    if (paymentState === "waiting" && xummData?.uuid) {
      pollInterval = setInterval(async () => {
        try {
          const status = await checkPaymentStatus(xummData.uuid)
          if (status.meta.signed && status.response?.txid) {
            setPaymentState("success")
            onPaymentSuccess(status.response.txid)
            clearInterval(pollInterval)
          } else if (status.meta.cancelled || status.meta.expired) {
            setPaymentState("error")
            setErrorMessage("Payment was cancelled or expired.")
            clearInterval(pollInterval)
          }
        } catch (error) {
          console.error("Error checking payment status:", error)
        }
      }, 3000) // Check every 3 seconds
    }
    return () => clearInterval(pollInterval)
  }, [paymentState, xummData, onPaymentSuccess])

  const initiatePayment = async () => {
    setPaymentState("creating")
    setErrorMessage("")

    try {
      const payload = createXUMMPayload(destinationAddress, xrpAmount, orderData)
      const xummResponse = await createXUMMTransaction(payload)

      setXummData(xummResponse)
      setPaymentState("waiting")
      setTimeLeft(300) // Reset timer
    } catch (error) {
      setPaymentState("error")
      setErrorMessage("Failed to create payment request. Please try again.")
      onPaymentError("Failed to create payment request")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (paymentState === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold text-green-800">Payment Successful!</h3>
            <p className="text-green-700">Your XRPL payment has been confirmed and your order is being processed.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (paymentState === "error") {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <XCircle className="h-16 w-16 text-red-600 mx-auto" />
            <h3 className="text-xl font-semibold text-red-800">Payment Failed</h3>
            <p className="text-red-700">{errorMessage}</p>
            <Button onClick={() => setPaymentState("idle")} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          XRPL Blockchain Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Order Total (USD)</span>
              <span className="font-medium">${orderData.totalUSD.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Amount in XRP</span>
              <span className="font-medium">{xrpAmount.toFixed(6)} XRP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Destination</span>
              <span className="font-mono text-xs">
                {destinationAddress.slice(0, 10)}...{destinationAddress.slice(-6)}
              </span>
            </div>
          </div>
        </div>

        {paymentState === "idle" && (
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Secure payment powered by XRPL blockchain technology. Your transaction will be processed instantly and
                securely.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-semibold">How it works:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                  <span>Click "Pay with XUMM" to create a payment request</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </div>
                  <span>Open XUMM app on your phone or scan the QR code</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </div>
                  <span>Confirm the payment in your XUMM wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                    4
                  </div>
                  <span>Your order will be confirmed automatically</span>
                </div>
              </div>
            </div>

            <Button onClick={initiatePayment} className="w-full bg-primary hover:bg-primary/90" size="lg">
              <Shield className="h-4 w-4 mr-2" />
              Pay {xrpAmount.toFixed(6)} XRP with XUMM
            </Button>
          </div>
        )}

        {paymentState === "creating" && (
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Creating secure payment request...</p>
          </div>
        )}

        {paymentState === "waiting" && xummData && (
          <div className="space-y-6">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                <Clock className="h-3 w-3 mr-1" />
                Expires in {formatTime(timeLeft)}
              </Badge>
              <h4 className="font-semibold mb-2">Complete Payment in XUMM</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Open the XUMM app on your phone or scan the QR code below
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* QR Code */}
              <Card className="p-4">
                <div className="text-center space-y-3">
                  <QrCode className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="w-32 h-32 bg-white mx-auto rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">QR Code</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Scan with XUMM app</p>
                </div>
              </Card>

              {/* Mobile Link */}
              <Card className="p-4">
                <div className="text-center space-y-3">
                  <Smartphone className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Open on Mobile</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => window.open(xummData.next.always, "_blank")}
                    >
                      Open XUMM App
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Tap to open XUMM directly</p>
                </div>
              </Card>
            </div>

            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>Waiting for payment confirmation... Do not close this page.</AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
