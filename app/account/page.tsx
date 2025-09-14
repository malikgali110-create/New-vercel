"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Download,
  Heart,
  ShoppingBag,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Eye,
  Calendar,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface DownloadItem {
  id: string
  title: string
  artist: string
  type: string
  license: string
  image: string
  downloadUrl: string
  bundleContents?: string
}

interface PurchaseItem {
  id: string
  title: string
  artist: string
  type: string
  price: number
  date: string
  status: string
  image: string
  bundleContents?: string
}

interface FavoriteItem {
  id: string
  title: string
  artist: string
  price: number
  image: string
  type?: string
  bundleContents?: string
}

const mockDownloads: DownloadItem[] = [
  {
    id: "1",
    title: "Abstract Digital Art Collection",
    artist: "AI Creator",
    type: "bundle",
    license: "Commercial",
    image: "/abstract-preview-1.jpg",
    downloadUrl: "/downloads/abstract-collection.zip",
    bundleContents: "5 high-res images, PSD files, AI vectors"
  },
  {
    id: "2",
    title: "Cyber Punk Artwork",
    artist: "Cyber Artist",
    type: "single",
    license: "Personal",
    image: "/cyber-preview-1.jpg",
    downloadUrl: "/downloads/cyber-punk.jpg"
  },
  {
    id: "3",
    title: "NFT Art Print Bundle",
    artist: "NFT Pioneer",
    type: "print",
    license: "Commercial",
    image: "/nft-preview-1.jpg",
    downloadUrl: "/downloads/nft-prints.zip"
  }
]

const mockPurchases: PurchaseItem[] = [
  {
    id: "1",
    title: "Digital Landscape",
    artist: "Digital Master",
    type: "Digital Art",
    price: 29.99,
    date: "2024-01-15",
    status: "Completed",
    image: "/digital-landscape.png"
  },
  {
    id: "2",
    title: "Abstract Collection",
    artist: "AI Creator",
    type: "Bundle",
    price: 49.99,
    date: "2024-01-10",
    status: "Completed",
    image: "/abstract-preview-2.jpg"
  }
]

const mockFavorites: FavoriteItem[] = [
  {
    id: "1",
    title: "Mystic Forest",
    artist: "Mystic Painter",
    price: 24.99,
    image: "/placeholder.jpg"
  },
  {
    id: "2",
    title: "Urban Dreams",
    artist: "City Artist",
    price: 34.99,
    image: "/placeholder.jpg"
  }
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("downloads")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">John Doe</h1>
              <p className="text-muted-foreground">Member since January 2024</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary">
                  <Mail className="h-3 w-3 mr-1" />
                  john.doe@example.com
                </Badge>
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 mr-1" />
                  New York, USA
                </Badge>
              </div>
            </div>
            <div className="ml-auto">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="downloads" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Downloads Tab */}
          <TabsContent value="downloads" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Downloads</h2>
              <Badge variant="secondary">{mockDownloads.length} items</Badge>
            </div>
            
            <div className="grid gap-4">
              {mockDownloads.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">by {item.artist}</p>
                        {item.type === "bundle" && item.bundleContents && (
                          <p className="text-xs text-muted-foreground mt-1">{item.bundleContents}</p>
                        )}
                        {item.type === "print" && (
                          <Badge variant="outline" className="mt-1">
                            Print Ready
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.license === "Commercial" ? "default" : "secondary"}>
                          {item.license}
                        </Badge>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Purchase History</h2>
              <Badge variant="secondary">{mockPurchases.length} orders</Badge>
            </div>
            
            <div className="grid gap-4">
              {mockPurchases.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">by {item.artist}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${item.price}</p>
                        <Badge variant="outline" className="mt-1">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Favorite Items</h2>
              <Badge variant="secondary">{mockFavorites.length} items</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockFavorites.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">by {item.artist}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-foreground">${item.price}</span>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Notification Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Manage Payments
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Control your privacy and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div>
                <h3 className="font-semibold text-foreground">Delete Account</h3>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}