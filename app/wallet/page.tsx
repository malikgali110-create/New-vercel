"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Wallet, 
  CheckCircle, 
  XCircle, 
  Gift, 
  Shield, 
  Smartphone,
  QrCode,
  Star,
  Percent,
  HeadphonesIcon,
  Download
} from "lucide-react"
import { useHolder } from "@/contexts/holder-context"

export default function WalletPage() {
  const { state, toggleHolderStatus, connectWallet, disconnectWallet } = useHolder()
  const [isConnecting, setIsConnecting] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // Demo wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      connectWallet("rDemoWallet123456789ABCDEF")
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
      setShowQRModal(false)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wallet Connection</h1>
          <p className="text-muted-foreground">
            Connect your XUMM wallet to unlock holder benefits and make purchases
          </p>
        </div>

        <div className="grid gap-6">
          {/* Wallet Connection Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Connect Your Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!state.isConnected ? (
                <div className="text-center space-y-4">
                  {/* XUMM Logo Placeholder */}
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Smartphone className="h-12 w-12 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">XUMM Wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      The secure way to connect to XRPL and manage your digital assets
                    </p>
                  </div>

                  <Button 
                    onClick={() => setShowQRModal(true)}
                    size="lg"
                    className="w-full max-w-sm"
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <QrCode className="h-4 w-4 mr-2" />
                        Connect with XUMM
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Status: Not Connected
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Wallet Connected</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      {state.walletAddress}
                    </p>
                  </div>

                  <Button 
                    onClick={handleDisconnect}
                    variant="outline"
                    size="sm"
                  >
                    Disconnect Wallet
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Status: Connected
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Holder Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Holder Status (Demo)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="holder-toggle" className="text-base font-medium">
                    Holder Status Detection
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle to simulate holder status for demo purposes
                  </p>
                </div>
                <Switch
                  id="holder-toggle"
                  checked={state.isHolder}
                  onCheckedChange={toggleHolderStatus}
                />
              </div>

              <div className="flex items-center gap-2">
                {state.isHolder ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Detected</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-500 font-medium">Not Detected</span>
                  </>
                )}
              </div>

              {state.isHolder && (
                <Alert className="border-green-200 bg-green-50">
                  <Gift className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Holder benefits active!</strong> You're eligible for exclusive discounts and perks.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Eligible Discounts Card */}
          {state.isHolder && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Eligible Discounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Percent className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">50% off all print products</div>
                      <div className="text-sm text-muted-foreground">Lifetime benefit for verified holders</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Percent className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">10% token bonus on purchases</div>
                      <div className="text-sm text-muted-foreground">Additional savings on all items</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <HeadphonesIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Priority customer support</div>
                      <div className="text-sm text-muted-foreground">Faster response times and dedicated help</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Airdrop Badge Card */}
          {state.isHolder && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Airdrop Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-orange-800">Airdrop Badge: ACTIVE</div>
                    <div className="text-sm text-orange-600">You're eligible for future token airdrops and exclusive releases</div>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">ACTIVE</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* QR Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex justify-between items-center">
                  <CardTitle>Connect Your XUMM Wallet</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowQRModal(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {/* QR Code Placeholder */}
                <div className="mx-auto w-48 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <QrCode className="h-12 w-12 mx-auto text-gray-400" />
                    <div className="text-sm text-gray-500">QR Code</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Scan QR in XUMM to complete connection
                </p>
                
                <Button onClick={handleConnect} className="w-full">
                  Simulate Connection (Demo)
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}