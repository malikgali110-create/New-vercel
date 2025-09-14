"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Download, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  Settings,
  CreditCard,
  FileText,
  Image,
  Archive,
  Printer,
  Eye
} from "lucide-react"
import { useHolder } from "@/contexts/holder-context"

// Type definitions for discriminated union
type DigitalItem = {
  id: string;
  title: string;
  artist: string;
  type: "digital";
  license: string;
  image: string;
  downloadUrl: string;
}

type BundleItem = {
  id: string;
  title: string;
  artist: string;
  type: "bundle";
  license: string;
  image: string;
  downloadUrl: string;
  bundleContents?: string;
}

type PrintItem = {
  id: string;
  title: string;
  artist: string;
  type: "print";
  size: string;
  material: string;
  frame?: string;
  image: string;
}

type OrderItem = DigitalItem | BundleItem | PrintItem;

type Order = {
  id: string;
  date: string;
  status: "completed" | "shipped" | "processing";
  total: number;
  totalXRP: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// Type guard function
function isPrintItem(item: OrderItem): item is PrintItem {
  return item.type === "print";
}

// Mock order data
const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "completed",
    total: 45.99,
    totalXRP: 89.2,
    items: [
      {
        id: "1",
        title: "Ethereal Landscapes Collection",
        artist: "Maya Chen",
        type: "digital",
        license: "commercial",
        image: "/api/placeholder/100/100",
        downloadUrl: "#"
      }
    ]
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-12",
    status: "completed",
    total: 299.99,
    totalXRP: 580.5,
    items: [
      {
        id: "2",
        title: "10K PFP Genesis Collection",
        artist: "Digital Collective",
        type: "bundle",
        license: "commercial",
        image: "/api/placeholder/100/100",
        downloadUrl: "#",
        bundleContents: "10,000 unique PFPs + traits + metadata"
      }
    ]
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-10",
    status: "shipped",
    total: 89.99,
    totalXRP: 174.2,
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-18",
    items: [
      {
        id: "3",
        title: "Abstract Minimalism Poster",
        artist: "Alex Rivera",
        type: "print",
        size: "A2",
        material: "Premium Matte",
        image: "/api/placeholder/100/100"
      }
    ]
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-08",
    status: "processing",
    total: 129.99,
    totalXRP: 251.8,
    items: [
      {
        id: "4",
        title: "Nature's Symphony Canvas",
        artist: "Sarah Johnson",
        type: "print",
        size: "16x20",
        material: "Canvas",
        frame: "Black Frame",
        image: "/api/placeholder/100/100"
      }
    ]
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "processing":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "shipped":
      return <Truck className="h-4 w-4 text-blue-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "processing":
      return "bg-yellow-100 text-yellow-800"
    case "shipped":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "digital":
      return <Image className="h-4 w-4" />
    case "bundle":
      return <Archive className="h-4 w-4" />
    case "print":
      return <Printer className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function AccountPage() {
  const { state } = useHolder()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const digitalDownloads = mockOrders
    .filter(order => order.status === "completed")
    .flatMap(order => 
      order.items.filter(item => item.type === "digital" || item.type === "bundle")
    )

  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {state.walletAddress ? state.walletAddress.slice(1, 3).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="text-muted-foreground">
                {state.isConnected ? (
                  <span className="font-mono text-sm">{state.walletAddress}</span>
                ) : (
                  "Manage your orders, downloads, and account settings"
                )}
              </p>
            </div>
          </div>
          
          {state.isHolder && (
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Verified Holder</span>
              <Badge className="bg-green-100 text-green-800 ml-auto">Premium Benefits Active</Badge>
            </div>
          )}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Order History</h2>
              <Badge variant="outline">{mockOrders.length} orders</Badge>
            </div>
            
            <div className="grid gap-4">
              {mockOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{order.totalXRP.toFixed(2)} XRP</div>
                        <div className="text-sm text-muted-foreground">${order.total}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(item.type)}
                              <h4 className="font-medium">{item.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">by {item.artist}</p>
                            {item.type === "bundle" && "bundleContents" in item && item.bundleContents && (
                              <p className="text-xs text-muted-foreground mt-1">{item.bundleContents}</p>
                            )}
                            {isPrintItem(item) && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.size} • {item.material} {item.frame && `• ${item.frame}`}
                              </p>
                            )}
                          </div>
                          {(item.type === "digital" || item.type === "bundle") && order.status === "completed" && (
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.status === "shipped" && order.trackingNumber && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-800">Tracking Number</p>
                            <p className="text-sm text-blue-600 font-mono">{order.trackingNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-blue-800">Estimated Delivery</p>
                            <p className="text-sm text-blue-600">{new Date(order.estimatedDelivery!).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Digital Downloads</h2>
              <Badge variant="outline">{digitalDownloads.length} items</Badge>
            </div>
            
            {digitalDownloads.length > 0 ? (
              <div className="grid gap-4">
                {digitalDownloads.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(item.type)}
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {item.license} license
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">by {item.artist}</p>
                          {item.type === "bundle" && item.bundleContents && (
                            <p className="text-xs text-muted-foreground">{item.bundleContents}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Download className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Downloads Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your digital art and NFT bundle downloads will appear here after purchase.
                  </p>
                  <Button>
                    Browse Digital Arts
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Wallet Address</label>
                      <p className="text-sm text-muted-foreground font-mono mt-1">
                        {state.walletAddress || "Not connected"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Account Type</label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {state.isHolder ? "Premium Holder" : "Standard"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">XRPL Payments</p>
                        <p className="text-sm text-muted-foreground">Pay with XRP via XUMM wallet</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Download Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-download after purchase</p>
                        <p className="text-sm text-muted-foreground">Automatically start downloads for digital items</p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified when downloads are ready</p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
