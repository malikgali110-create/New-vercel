"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCart } from "@/contexts/cart-context"
import { useHolder } from "@/contexts/holder-context"
import demoProducts from "@/data/demo-products.json"
import {
  Heart,
  Share2,
  Eye,
  Bookmark,
  Star,
  ShoppingCart,
  Download,
  Shield,
  Truck,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  MessageCircle,
  ThumbsUp,
  Flag,
  Calendar,
  FileImage,
  Printer,
  Shirt,
  Coffee,
  Palette,
  Package,
  CreditCard,
  Clock,
  CheckCircle,
  User,
  Award,
  Globe,
  Layers,
} from "lucide-react"
import { DownloadUtility } from "@/components/download-utility"
import { DirectPurchaseModal } from "@/components/direct-purchase-modal"
import Image from "next/image"
import Link from "next/link"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"
import { useParams } from "next/navigation"

interface ProductOption {
  type: "digital" | "print"
  name: string
  description: string
  basePrice: number
  sizes?: {
    name: string
    dimensions: string
    price: number
  }[]
  materials?: {
    name: string
    description: string
    priceMultiplier: number
  }[]
  printItems?: {
    name: string
    description: string
    basePrice: number
    sizes: {
      name: string
      price: number
    }[]
  }[]
}

const productOptions: ProductOption[] = [
  {
    type: "digital",
    name: "Digital Download",
    description: "High-resolution files for personal use",
    basePrice: 0,
    sizes: [
      { name: "Web Resolution (1920x1080)", dimensions: "1920 x 1080 px", price: 0 },
      { name: "Print Ready (300 DPI)", dimensions: "3000 x 4000 px", price: 20 },
      { name: "Ultra HD (8K)", dimensions: "7680 x 4320 px", price: 50 },
    ],
  },
  {
    type: "print",
    name: "Wall Art Prints",
    description: "Professional gallery-quality prints",
    basePrice: 25,
    sizes: [
      { name: 'Small (8x10")', dimensions: "8 x 10 inches", price: 25 },
      { name: 'Medium (11x14")', dimensions: "11 x 14 inches", price: 35 },
      { name: 'Large (16x20")', dimensions: "16 x 20 inches", price: 55 },
      { name: 'Extra Large (24x36")', dimensions: "24 x 36 inches", price: 85 },
      { name: 'Poster (36x48")', dimensions: "36 x 48 inches", price: 120 },
    ],
    materials: [
      { name: "Premium Paper", description: "Matte finish, archival quality", priceMultiplier: 1.0 },
      { name: "Canvas", description: "Textured canvas, gallery wrapped", priceMultiplier: 1.5 },
      { name: "Metal Print", description: "Aluminum, vibrant colors", priceMultiplier: 2.0 },
      { name: "Acrylic Glass", description: "Modern, glossy finish", priceMultiplier: 2.5 },
      { name: "Wood Print", description: "Natural wood grain texture", priceMultiplier: 1.8 },
    ],
  },
  {
    type: "print",
    name: "Apparel & Accessories",
    description: "Wearable art and lifestyle products",
    basePrice: 20,
    printItems: [
      {
        name: "T-Shirts",
        description: "100% cotton, premium quality",
        basePrice: 25,
        sizes: [
          { name: "S", price: 25 },
          { name: "M", price: 25 },
          { name: "L", price: 25 },
          { name: "XL", price: 28 },
          { name: "XXL", price: 30 },
        ],
      },
      {
        name: "Hoodies",
        description: "Soft fleece, comfortable fit",
        basePrice: 45,
        sizes: [
          { name: "S", price: 45 },
          { name: "M", price: 45 },
          { name: "L", price: 45 },
          { name: "XL", price: 48 },
          { name: "XXL", price: 50 },
        ],
      },
      {
        name: "Caps/Hats",
        description: "Adjustable, embroidered design",
        basePrice: 22,
        sizes: [
          { name: "One Size", price: 22 },
          { name: "Fitted S/M", price: 25 },
          { name: "Fitted L/XL", price: 25 },
        ],
      },
      {
        name: "Mugs",
        description: "Ceramic, dishwasher safe",
        basePrice: 18,
        sizes: [
          { name: "11oz Standard", price: 18 },
          { name: "15oz Large", price: 22 },
          { name: "Travel Mug", price: 28 },
        ],
      },
      {
        name: "Phone Cases",
        description: "Durable, custom fit",
        basePrice: 20,
        sizes: [
          { name: "iPhone 15", price: 20 },
          { name: "iPhone 15 Pro", price: 20 },
          { name: "Samsung Galaxy S24", price: 20 },
          { name: "Universal", price: 18 },
        ],
      },
      {
        name: "Tote Bags",
        description: "Canvas, eco-friendly",
        basePrice: 16,
        sizes: [
          { name: "Standard", price: 16 },
          { name: "Large", price: 20 },
          { name: "Premium Canvas", price: 25 },
        ],
      },
    ],
  },
]

interface ProductData {
  id: string
  title: string
  artist: {
    name: string
    avatar: string
    verified: boolean
    followers: number
    artworks: number
    joinDate: string
    bio: string
  }
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  images: string[]
  description: string
  specifications: {
    dimensions: string
    medium: string
    year: string
    edition: string
    authenticity: string
  }
  tags: string[]
  likes: number
  views: number
  isLiked: boolean
  isBookmarked: boolean
  rating: number
  reviews: number
  availability: "available" | "limited" | "sold_out"
  shipping: {
    free: boolean
    estimatedDays: string
    worldwide: boolean
  }
  blockchain: {
    verified: boolean
    tokenId?: string
    contract?: string
  }
}

// Mock product data
// Get all products from demo data
const allProducts = [
  ...demoProducts.digitalArts,
  ...demoProducts.nftBundles,
  ...demoProducts.printProducts
]

const reviews = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar: "/user-1.jpg",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Absolutely stunning piece! The colors are even more vibrant than expected. Sarah's technique is incredible.",
    helpful: 12,
  },
  {
    id: 2,
    user: "Maria Rodriguez",
    avatar: "/user-2.jpg",
    rating: 5,
    date: "2024-01-10",
    comment: "Perfect for my living room. The quality is exceptional and the download was instant. Highly recommend!",
    helpful: 8,
  },
  {
    id: 3,
    user: "David Kim",
    avatar: "/user-3.jpg",
    rating: 4,
    date: "2024-01-05",
    comment:
      "Beautiful artwork with great attention to detail. The blockchain verification gives me confidence in authenticity.",
    helpful: 5,
  },
]

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const { isHolder } = useHolder()
  
  // Find product by ID from demo data
  const productData = allProducts.find(p => p.id === params.id)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [showZipContents, setShowZipContents] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const [selectedOption, setSelectedOption] = useState<"digital" | "print">("digital")
  const [selectedPrintType, setSelectedPrintType] = useState("Wall Art Prints")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedPrintItem, setSelectedPrintItem] = useState("")
  const [selectedItemSize, setSelectedItemSize] = useState("")
  const [selectedLicense, setSelectedLicense] = useState<"personal" | "commercial">("personal")
  const [quantity, setQuantity] = useState(1)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  
  // If product not found, show error
  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const calculatePrice = () => {
    let basePrice = 0
    
    if (selectedOption === "digital") {
      // Use product's base price for digital - handle different data structures
      basePrice = productData?.priceUSD || productData?.price || productData?.pricing?.bundle?.usd || 0
      
      // Add license premium for commercial use
      if (selectedLicense === "commercial") {
        basePrice = basePrice * 2.5 // Commercial license is 2.5x personal price
      }
      
      // Add format premium
      const digitalOption = productOptions.find((opt) => opt.type === "digital")
      const sizeOption = digitalOption?.sizes?.find((size) => size.name === selectedSize)
      basePrice += (sizeOption?.price || 0)
    } else {
      const printOption = productOptions.find((opt) => opt.name === selectedPrintType)
      if (selectedPrintType === "Wall Art Prints") {
        const sizePrice = printOption?.sizes?.find((size) => size.name === selectedSize)?.price || 0
        const materialMultiplier =
          printOption?.materials?.find((mat) => mat.name === selectedMaterial)?.priceMultiplier || 1
        basePrice = Math.round(sizePrice * materialMultiplier)
      } else {
        const printItem = printOption?.printItems?.find((item) => item.name === selectedPrintItem)
        const itemPrice = printItem?.sizes?.find((size) => size.name === selectedItemSize)?.price || 0
        basePrice = itemPrice
      }
      
      // Apply quantity
      basePrice = basePrice * quantity
      
      // Apply holder discount for prints
      if (isHolder) {
        basePrice = basePrice * 0.5 // 50% off for holders
      }
    }
    
    return basePrice
  }

  const currentPrice = calculatePrice()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <EnhancedHeader />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/digital-arts" className="hover:text-primary transition-colors">
            {productData.category}
          </Link>
          <span>/</span>
          <Link href="/digital-arts/abstract" className="hover:text-primary transition-colors">
            {productData.subcategory}
          </Link>
          <span>/</span>
          <span className="text-foreground">{productData.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* Left Column - Product Images */}
          <div className="xl:col-span-2">
            <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden rounded-2xl">
              <div className="relative h-96 md:h-[600px] bg-card">
                <Image
                  src={(productData.images?.gallery || [productData.images?.hero || productData.images?.thumbnail])[selectedImage] || "/placeholder.svg"}
                  alt={productData.title}
                  fill
                  className="object-contain transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                />

                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/80 hover:bg-white rounded-full"
                    onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/80 hover:bg-white rounded-full"
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-white/80 hover:bg-white rounded-full"
                    onClick={() => setZoom(1)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`
                    ${productData.availability === "available" ? "bg-green-500" : ""}
                    ${productData.availability === "limited" ? "bg-yellow-500" : ""}
                    ${productData.availability === "sold_out" ? "bg-red-500" : ""}
                    text-white rounded-full px-3 py-1
                  `}
                  >
                    {productData.availability === "available" && "Available"}
                    {productData.availability === "limited" && "Limited Stock"}
                    {productData.availability === "sold_out" && "Sold Out"}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {(productData.images?.gallery || [productData.images?.hero || productData.images?.thumbnail]).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${productData.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary border-primary">
                  {productData.category}
                </Badge>
                {productData.subcategory && (
                  <Badge variant="outline">{productData.subcategory}</Badge>
                )}
                {productData.isLimited && (
                  <Badge variant="destructive" className="bg-orange-50 text-orange-700 border-orange-200">
                    Limited Edition
                  </Badge>
                )}
                {productData.isNew && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    NEW
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{productData.title}</h1>

              {/* Artist Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={productData.creator?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {(productData.creator?.name || productData.artist || "Unknown")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/artist/${(productData.creator?.name || productData.artist || "unknown").toLowerCase().replace(" ", "-")}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {productData.creator?.name || productData.artist || "Unknown Artist"}
                    </Link>
                    {productData.creator?.verified && (
                      <Badge className="bg-blue-500 text-white text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(productData.creator?.followers || 0).toLocaleString()} followers • {productData.creator?.artworks || 0} artworks
                  </p>
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{productData.rating}</span>
                  <span className="text-muted-foreground">({productData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {productData.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {productData.views}
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Choose Your Option
              </h3>

              {/* Digital vs Print Toggle */}
              <Tabs value={selectedOption} onValueChange={(value) => setSelectedOption(value as "digital" | "print")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="digital" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Digital Download
                  </TabsTrigger>
                  <TabsTrigger value="print" className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Print on Demand
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="digital" className="mt-0">

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">License Type</Label>
                      <RadioGroup value={selectedLicense} onValueChange={(value) => setSelectedLicense(value as "personal" | "commercial")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="personal" id="personal" />
                          <Label htmlFor="personal">Personal Use - Standard Price</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="commercial" id="commercial" />
                          <Label htmlFor="commercial">Commercial Use - 2.5x Price</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Resolution & Format</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select resolution..." />
                        </SelectTrigger>
                        <SelectContent>
                          {productOptions[0].sizes?.map((size) => (
                            <SelectItem key={size.name} value={size.name}>
                              {size.name} - {size.dimensions} {size.price > 0 && `(+${size.price} XRP)`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Download className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Instant Download</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        High-quality files delivered immediately after purchase. Includes JPG, PNG, and PDF formats.
                      </p>
                    </div>
                    <DownloadUtility 
                      itemId={productData.id}
                      itemName={productData.title}
                      itemType="digital-art"
                      downloadFiles={[]}
                      printOptions={[]}
                      productId={productData.id}
                      productTitle={productData.title}
                      selectedFormat={selectedSize}
                      price={currentPrice}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="print" className="mt-0">

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Print Type</Label>
                      <Select value={selectedPrintType} onValueChange={setSelectedPrintType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select print type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wall Art Prints">
                            <div className="flex items-center gap-2">
                              <Palette className="h-4 w-4" />
                              Wall Art Prints
                            </div>
                          </SelectItem>
                          <SelectItem value="Apparel & Accessories">
                            <div className="flex items-center gap-2">
                              <Shirt className="h-4 w-4" />
                              Apparel & Accessories
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Wall Art Options */}
                    {selectedPrintType === "Wall Art Prints" && (
                      <>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Size</Label>
                          <Select value={selectedSize} onValueChange={setSelectedSize}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size..." />
                            </SelectTrigger>
                            <SelectContent>
                              {productOptions[1].sizes?.map((size) => (
                                <SelectItem key={size.name} value={size.name}>
                                  {size.name} - {size.dimensions} ({size.price} XRP)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Material</Label>
                          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select material..." />
                            </SelectTrigger>
                            <SelectContent>
                              {productOptions[1].materials?.map((material) => (
                                <SelectItem key={material.name} value={material.name}>
                                  {material.name} - {material.description}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {/* Apparel Options */}
                    {selectedPrintType === "Apparel & Accessories" && (
                      <>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Product</Label>
                          <Select value={selectedPrintItem} onValueChange={setSelectedPrintItem}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product..." />
                            </SelectTrigger>
                            <SelectContent>
                              {productOptions[2].printItems?.map((item) => (
                                <SelectItem key={item.name} value={item.name}>
                                  <div className="flex items-center gap-2">
                                    {item.name === "T-Shirts" && <Shirt className="h-4 w-4" />}
                                    {item.name === "Mugs" && <Coffee className="h-4 w-4" />}
                                    {item.name !== "T-Shirts" && item.name !== "Mugs" && <Package className="h-4 w-4" />}
                                    {item.name} - {item.description}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedPrintItem && (
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Size</Label>
                            <Select value={selectedItemSize} onValueChange={setSelectedItemSize}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size..." />
                              </SelectTrigger>
                              <SelectContent>
                                {productOptions[2].printItems
                                  ?.find((item) => item.name === selectedPrintItem)
                                  ?.sizes.map((size) => (
                                    <SelectItem key={size.name} value={size.name}>
                                      {size.name} ({size.price} XRP)
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </>
                    )}

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">Worldwide Shipping</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Professional printing and shipping. Estimated delivery: 7-14 business days.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Price Display */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-foreground font-serif">
                  {productData.category === "NFT Bundle" 
                    ? `${productData.pricing?.bundle?.xrp || 0} XRP`
                    : `${(productData.priceXRP || (currentPrice * 0.5)).toFixed(2)} XRP`
                  }
                </div>
                <div className="text-lg text-muted-foreground">
                  ≈ ${productData.category === "NFT Bundle" 
                    ? (productData.pricing?.bundle?.usd || 0).toFixed(2)
                    : currentPrice.toFixed(2)
                  } USD
                </div>
                {productData.originalPrice && selectedOption === "digital" && (
                  <>
                    <div className="text-xl text-muted-foreground line-through">
                      {((productData.originalPrice * 0.5) || 0).toFixed(2)} XRP
                    </div>
                    <Badge className="bg-red-500 text-white">
                      Save{" "}
                      {(((productData.originalPrice - (productData.priceUSD || productData.price || 0)) / productData.originalPrice) * 100).toFixed(0)}%
                    </Badge>
                  </>
                )}
              </div>
              
              {/* Holder Benefits */}
              {isHolder && selectedOption === "print" && (
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Holder Benefit Active</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    50% discount applied to all print products!
                  </p>
                </div>
              )}
              
              {/* License Premium Notice */}
              {selectedOption === "digital" && selectedLicense === "commercial" && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Commercial License</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    2.5x premium for commercial usage rights included.
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{productData.description}</p>
            </div>

            {/* Tags */}
            {productData.tags && productData.tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced NFT Bundle Specific Sections */}
            {productData.category === "NFT Bundle" && (
              <>
                {/* Collection Overview */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">NFT Collection Overview</h3>
                      <p className="text-sm text-muted-foreground">Complete package ready for minting</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg border">
                      <div className="text-3xl font-bold text-purple-600">{productData.contents?.totalItems?.toLocaleString() || '10,000'}</div>
                      <div className="text-sm text-muted-foreground">Unique NFTs</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg border">
                      <div className="text-3xl font-bold text-blue-600">{productData.contents?.traits || '150+'}</div>
                      <div className="text-sm text-muted-foreground">Total Traits</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg border">
                      <div className="text-3xl font-bold text-cyan-600">{productData.contents?.layers || '8'}</div>
                      <div className="text-sm text-muted-foreground">Art Layers</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg border">
                      <div className="text-3xl font-bold text-teal-600">{productData.contents?.zipSize || '2.5GB'}</div>
                      <div className="text-sm text-muted-foreground">Package Size</div>
                    </div>
                  </div>
                </div>

                {/* Rarity & Traits Breakdown */}
                <div className="space-y-4">
                  <div className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowZipContents(!showZipContents)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors bg-gradient-to-r from-purple-50/50 to-blue-50/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3">
                          <Layers className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">Rarity & Traits Breakdown</h3>
                          <p className="text-sm text-muted-foreground">
                            Detailed trait distribution • Rarity charts • Metadata files
                          </p>
                        </div>
                      </div>
                      <div className={`transform transition-transform ${showZipContents ? 'rotate-180' : ''}`}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {showZipContents && (
                      <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50/30 to-blue-50/30">
                        <Separator className="bg-gradient-to-r from-purple-200 to-blue-200" />
                        
                        {/* Trait Categories */}
                        <div>
                          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-purple-600" />
                            Trait Categories & Rarity
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { name: 'Background', count: 25, rarest: 'Cosmic Void (0.5%)', color: 'purple' },
                              { name: 'Body', count: 30, rarest: 'Diamond Skin (0.3%)', color: 'blue' },
                              { name: 'Eyes', count: 40, rarest: 'Laser Eyes (0.2%)', color: 'cyan' },
                              { name: 'Accessories', count: 35, rarest: 'Crown of Kings (0.1%)', color: 'teal' },
                              { name: 'Clothing', count: 45, rarest: 'Royal Armor (0.4%)', color: 'indigo' },
                              { name: 'Special Effects', count: 15, rarest: 'Aura of Power (0.05%)', color: 'pink' }
                            ].map((trait, index) => (
                              <div key={index} className={`p-4 rounded-lg border bg-gradient-to-r from-${trait.color}-50 to-${trait.color}-100 border-${trait.color}-200`}>
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-foreground">{trait.name}</h5>
                                  <Badge className={`bg-${trait.color}-500 text-white`}>{trait.count} variants</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Rarest: <span className="font-medium text-foreground">{trait.rarest}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rarity Distribution */}
                        <div>
                          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Rarity Distribution
                          </h4>
                          <div className="space-y-3">
                            {[
                              { tier: 'Legendary', percentage: '1%', count: '100', color: 'from-yellow-400 to-orange-500' },
                              { tier: 'Epic', percentage: '5%', count: '500', color: 'from-purple-400 to-pink-500' },
                              { tier: 'Rare', percentage: '15%', count: '1,500', color: 'from-blue-400 to-cyan-500' },
                              { tier: 'Uncommon', percentage: '30%', count: '3,000', color: 'from-green-400 to-teal-500' },
                              { tier: 'Common', percentage: '49%', count: '4,900', color: 'from-gray-400 to-gray-500' }
                            ].map((rarity, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border">
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${rarity.color}`}></div>
                                  <span className="font-medium">{rarity.tier}</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold">{rarity.percentage}</div>
                                  <div className="text-sm text-muted-foreground">{rarity.count} NFTs</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* What's Included */}
                        <div>
                          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5 text-green-600" />
                            What's Included in This Bundle
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { item: '10,000 Unique NFT Images (PNG)', size: '2.5GB', icon: '🖼️' },
                              { item: 'Metadata JSON Files', size: '50MB', icon: '📄' },
                              { item: 'Trait Rarity Chart (Excel)', size: '5MB', icon: '📊' },
                              { item: 'Smart Contract Template', size: '2MB', icon: '📜' },
                              { item: 'Marketing Assets Pack', size: '500MB', icon: '🎨' },
                              { item: 'Launch Guide & Documentation', size: '10MB', icon: '📚' }
                            ].map((item, index) => (
                              <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="text-2xl">{item.icon}</div>
                                <div className="flex-1">
                                  <div className="font-medium text-foreground">{item.item}</div>
                                  <div className="text-sm text-muted-foreground">{item.size}</div>
                                </div>
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Compatible Marketplaces */}
                        <div>
                          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-600" />
                            Compatible Marketplaces & Platforms
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { name: 'OpenSea', logo: '🌊', status: 'Verified', color: 'blue' },
                              { name: 'Rarible', logo: '💎', status: 'Partner', color: 'purple' },
                              { name: 'SuperRare', logo: '⭐', status: 'Curated', color: 'yellow' },
                              { name: 'Foundation', logo: '🏛️', status: 'Approved', color: 'gray' },
                              { name: 'Async Art', logo: '🎭', status: 'Featured', color: 'pink' },
                              { name: 'KnownOrigin', logo: '🔮', status: 'Listed', color: 'indigo' },
                              { name: 'Mintable', logo: '🪙', status: 'Active', color: 'green' },
                              { name: 'Nifty Gateway', logo: '🚪', status: 'Premium', color: 'red' }
                            ].map((marketplace, index) => (
                              <div key={index} className={`p-3 bg-gradient-to-br from-${marketplace.color}-50 to-${marketplace.color}-100 border border-${marketplace.color}-200 rounded-lg text-center hover:shadow-md transition-all`}>
                                <div className="text-2xl mb-1">{marketplace.logo}</div>
                                <div className="font-medium text-sm">{marketplace.name}</div>
                                <Badge className={`mt-1 bg-${marketplace.color}-500 text-white text-xs`}>
                                  {marketplace.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Utility Features (if available) */}
                        {productData.utilities && (
                          <div>
                            <h4 className="font-semibold mb-3">Utility Features:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {productData.utilities.map((utility, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                                  <Star className="h-4 w-4 text-purple-500" />
                                  <span className="text-sm text-purple-700">{utility}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Holder Perks for Bundles */}
                {productData.holderPerks && (
                  <div className="p-4 bg-gradient-to-r from-gold/10 to-yellow-50 rounded-lg border border-gold/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gold/20 rounded-full">
                        <Star className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gold-dark">Exclusive Holder Benefits</h3>
                        <p className="text-sm text-gold-dark/80">{productData.holderPerks} on all future print orders</p>
                      </div>
                    </div>
                    {isHolder && (
                      <Badge className="bg-gold/20 text-gold-dark border-gold/30">
                        ✨ Benefits Active - You're a verified holder!
                      </Badge>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 rounded-full"
                  disabled={
                    productData.availability === "sold_out" ||
                    (selectedOption === "digital" && !selectedSize) ||
                    (selectedOption === "print" &&
                      (!selectedSize ||
                        (selectedPrintType === "Wall Art Prints" && !selectedMaterial) ||
                        (selectedPrintType === "Apparel & Accessories" && (!selectedPrintItem || !selectedItemSize))))
                  }
                  onClick={() => {
                    const bundlePrice = productData.category === "NFT Bundle" 
                      ? productData.pricing?.bundle?.usd || 0
                      : currentPrice;
                    
                    addToCart({
                      id: productData.id,
                      title: productData.title,
                      artist: productData.creator?.name || productData.artist || "Unknown Artist",
                      price: bundlePrice,
                      priceXRP: productData.category === "NFT Bundle" 
                        ? productData.pricing?.bundle?.xrp || 0
                        : (productData.priceXRP || (currentPrice * 0.5)),
                      image: productData.images?.hero || productData.images?.thumbnail || "/placeholder.svg",
                      category: productData.category,
                      type: productData.category === "NFT Bundle" ? "bundle" : selectedOption,
                      options: {
                        format: selectedSize,
                        size: selectedOption === "print" ? selectedSize : undefined,
                        material: selectedOption === "print" ? selectedMaterial : undefined,
                        printItem: selectedPrintItem,
                        itemSize: selectedItemSize,
                        license: selectedLicense
                      },
                      quantity: quantity
                    })
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {productData.availability === "sold_out" ? "Sold Out" : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-transparent"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-transparent"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
                onClick={() => setShowPurchaseModal(true)}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay with XUMM Wallet ({(productData.priceXRP || (currentPrice * 0.5)).toFixed(2)} XRP)
              </Button>
            </div>

            {/* Shipping & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    {selectedOption === "digital" ? (
                      <Download className="h-5 w-5 text-green-600" />
                    ) : (
                      <Truck className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {selectedOption === "digital" ? "Instant Download" : "Free Shipping"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedOption === "digital" ? "Immediate access" : "7-14 business days"}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Blockchain Verified</div>
                    <div className="text-sm text-muted-foreground">XRPL Authenticity</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
            </div>
          </div>

          {/* Right Sidebar - Comprehensive Details */}
          <div className="space-y-6">
            {/* Product Specifications Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                Product Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium text-foreground">Category</span>
                  <span className="text-muted-foreground">{productData.category}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium text-foreground">Artist</span>
                  <span className="text-muted-foreground">{productData.artist}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium text-foreground">Resolution</span>
                  <span className="text-muted-foreground">4K Ultra HD</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium text-foreground">File Format</span>
                  <span className="text-muted-foreground">JPG, PNG, SVG</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium text-foreground">License Type</span>
                  <span className="text-muted-foreground">Commercial Use</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-foreground">File Size</span>
                  <span className="text-muted-foreground">15-25 MB</span>
                </div>
              </div>
            </Card>

            {/* Shipping & Return Policy */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping & Returns
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full mt-1">
                    <Download className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Digital Downloads</div>
                    <div className="text-sm text-muted-foreground">Instant access after payment</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full mt-1">
                    <Truck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Print Shipping</div>
                    <div className="text-sm text-muted-foreground">Free worldwide shipping (7-14 days)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-full mt-1">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">30-Day Returns</div>
                    <div className="text-sm text-muted-foreground">Full refund guarantee</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Artist Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                About the Artist
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={productData.creator?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {(productData.creator?.name || productData.artist || "Unknown")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{productData.creator?.name || productData.artist}</div>
                    <div className="text-sm text-muted-foreground">{(productData.creator?.followers || 1250).toLocaleString()} followers</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {productData.creator?.bio || "Professional digital artist specializing in contemporary abstract art and modern design. Creating unique pieces that blend traditional artistic techniques with cutting-edge digital innovation."}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-foreground">Artworks</div>
                    <div className="text-muted-foreground">{productData.creator?.artworks || 45}</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Experience</div>
                    <div className="text-muted-foreground">{productData.creator?.experience || "5+ years"}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Blockchain Verification */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Blockchain Verified
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Authenticated on XRPL</span>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs font-medium text-foreground mb-1">Token ID</div>
                  <div className="text-xs text-muted-foreground font-mono break-all">
                    {productData.blockchain?.tokenId || "0x1a2b3c4d5e6f7890abcdef"}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View on XRPL Explorer
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({productData.reviews || 0})</TabsTrigger>
              <TabsTrigger value="artist">Artist Info</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {productData.specifications ? (
                      Object.entries(productData.specifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-2 border-b border-border last:border-0"
                        >
                          <span className="font-medium text-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-muted-foreground">
                        <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No specifications available for this product.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {review.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-foreground">{review.user}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground mb-3">{review.comment}</p>
                          <div className="flex items-center gap-4">
                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful ({review.helpful})
                            </Button>
                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                              <Flag className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="artist" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={(productData.creator?.avatar || productData.artist?.avatar) || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {(productData.creator?.name || productData.artist?.name || "Unknown")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-serif font-bold text-foreground">{productData.creator?.name || productData.artist?.name || "Unknown Artist"}</h3>
                        {(productData.creator?.verified || productData.artist?.verified) && (
                          <Badge className="bg-blue-500 text-white">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified Artist
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {new Date((productData.creator?.joinDate || productData.artist?.joinDate) || '2024-01-01').toLocaleDateString()}
                        </div>
                        <div>{((productData.creator?.followers || productData.artist?.followers) || 0).toLocaleString()} followers</div>
                        <div>{(productData.creator?.artworks || productData.artist?.artworks) || 0} artworks</div>
                      </div>
                      <p className="text-muted-foreground mb-4">{(productData.creator?.bio || productData.artist?.bio) || "No bio available."}</p>
                      <div className="flex gap-3">
                        <Button className="bg-primary hover:bg-primary/90 rounded-full">Follow Artist</Button>
                        <Button variant="outline" className="rounded-full bg-transparent">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Link href={`/artist/${(productData.creator?.name || productData.artist?.name || 'unknown').toLowerCase().replace(" ", "-")}`}>
                          <Button variant="outline" className="rounded-full bg-transparent">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blockchain" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Blockchain Verified</h3>
                        <p className="text-sm text-muted-foreground">
                          This artwork is authenticated on the XRPL blockchain
                        </p>
                      </div>
                    </div>

                    {productData.blockchain?.tokenId && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-foreground mb-1">Token ID</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {productData.blockchain?.tokenId}
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-foreground mb-1">Contract Address</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {productData.blockchain?.contract}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" className="rounded-full bg-transparent">
                        View on XRPL Explorer
                      </Button>
                      <Button variant="outline" className="rounded-full bg-transparent">
                        Verify Authenticity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <DirectPurchaseModal
         isOpen={showPurchaseModal}
         onClose={() => setShowPurchaseModal(false)}
         product={{
           id: productData.id,
           title: productData.title,
           artist: productData.creator || productData.artist?.name || productData.artist || "Unknown Artist",
           price: currentPrice,
           currency: "USD",
           image: productData.images?.hero || productData.images?.thumbnail || "/placeholder.svg",
           category: productData.category,
           type: selectedOption
         }}
         selectedOptions={{
           format: selectedSize,
           size: selectedOption === "print" ? selectedSize : undefined,
           material: selectedOption === "print" ? selectedMaterial : undefined,
           quantity: quantity
         }}
       />

      <FloatingActionMenu />
    </div>
  )
}
