"use client"

import { useState } from "react"
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
} from "lucide-react"
import { DownloadUtility } from "@/components/download-utility"
import { DirectPurchaseModal } from "@/components/direct-purchase-modal"
import Image from "next/image"
import Link from "next/link"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"

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
const productData: ProductData = {
  id: "1",
  title: "Abstract Watercolor Dreams",
  artist: {
    name: "Sarah Chen",
    avatar: "/artist-sarah-chen.jpg",
    verified: true,
    followers: 2847,
    artworks: 156,
    joinDate: "2022-03-15",
    bio: "Contemporary digital artist specializing in abstract watercolor techniques. Featured in galleries across Asia and Europe.",
  },
  price: 120,
  originalPrice: 150,
  category: "Digital Arts",
  subcategory: "Abstract Digital Art",
  images: ["/abstract-watercolor-painting.jpg", "/abstract-digital-painting.jpg", "/watercolor-landscape-print.jpg"],
  description:
    "A mesmerizing blend of traditional watercolor techniques with modern digital artistry. This piece captures the fluidity of emotions through vibrant color gradients and organic forms. Perfect for contemporary spaces seeking a touch of artistic sophistication.",
  specifications: {
    dimensions: "3000 x 4000 pixels (300 DPI)",
    medium: "Digital Watercolor",
    year: "2024",
    edition: "Limited Edition (1/50)",
    authenticity: "XRPL Blockchain Verified",
  },
  tags: ["Abstract", "Watercolor", "Digital", "Contemporary", "Colorful", "Emotional"],
  likes: 234,
  views: 1567,
  isLiked: false,
  isBookmarked: false,
  rating: 4.8,
  reviews: 47,
  availability: "available",
  shipping: {
    free: true,
    estimatedDays: "Instant Download",
    worldwide: true,
  },
  blockchain: {
    verified: true,
    tokenId: "0x1234...5678",
    contract: "0xabcd...efgh",
  },
}

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
  const [selectedImage, setSelectedImage] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isLiked, setIsLiked] = useState(productData.isLiked)
  const [isBookmarked, setIsBookmarked] = useState(productData.isBookmarked)

  const [selectedOption, setSelectedOption] = useState<"digital" | "print">("digital")
  const [selectedPrintType, setSelectedPrintType] = useState("Wall Art Prints")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedPrintItem, setSelectedPrintItem] = useState("")
  const [selectedItemSize, setSelectedItemSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const calculatePrice = () => {
    const basePrice = productData.price

    if (selectedOption === "digital") {
      const digitalOption = productOptions.find((opt) => opt.type === "digital")
      const sizeOption = digitalOption?.sizes?.find((size) => size.name === selectedSize)
      return basePrice + (sizeOption?.price || 0)
    } else {
      const printOption = productOptions.find((opt) => opt.name === selectedPrintType)
      if (selectedPrintType === "Wall Art Prints") {
        const sizePrice = printOption?.sizes?.find((size) => size.name === selectedSize)?.price || 0
        const materialMultiplier =
          printOption?.materials?.find((mat) => mat.name === selectedMaterial)?.priceMultiplier || 1
        return Math.round(sizePrice * materialMultiplier)
      } else {
        const printItem = printOption?.printItems?.find((item) => item.name === selectedPrintItem)
        const itemPrice = printItem?.sizes?.find((size) => size.name === selectedItemSize)?.price || 0
        return itemPrice
      }
    }
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
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden rounded-2xl">
              <div className="relative h-96 md:h-[600px] bg-card">
                <Image
                  src={productData.images[selectedImage] || "/placeholder.svg"}
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
              {productData.images.map((image, index) => (
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
                <Badge variant="outline">{productData.subcategory}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{productData.title}</h1>

              {/* Artist Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={productData.artist.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {productData.artist.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/artist/${productData.artist.name.toLowerCase().replace(" ", "-")}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {productData.artist.name}
                    </Link>
                    {productData.artist.verified && (
                      <Badge className="bg-blue-500 text-white text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {productData.artist.followers.toLocaleString()} followers • {productData.artist.artworks} artworks
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
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-foreground font-serif">{currentPrice} XRP</div>
              {productData.originalPrice && selectedOption === "digital" && (
                <>
                  <div className="text-xl text-muted-foreground line-through">{productData.originalPrice} XRP</div>
                  <Badge className="bg-red-500 text-white">
                    Save{" "}
                    {(((productData.originalPrice - productData.price) / productData.originalPrice) * 100).toFixed(0)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{productData.description}</p>
            </div>

            {/* Tags */}
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
                Pay with XUMM Wallet ({currentPrice} XRP)
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

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({productData.reviews})</TabsTrigger>
              <TabsTrigger value="artist">Artist Info</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                      >
                        <span className="font-medium text-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
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
                      <AvatarImage src={productData.artist.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {productData.artist.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-serif font-bold text-foreground">{productData.artist.name}</h3>
                        {productData.artist.verified && (
                          <Badge className="bg-blue-500 text-white">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified Artist
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {new Date(productData.artist.joinDate).toLocaleDateString()}
                        </div>
                        <div>{productData.artist.followers.toLocaleString()} followers</div>
                        <div>{productData.artist.artworks} artworks</div>
                      </div>
                      <p className="text-muted-foreground mb-4">{productData.artist.bio}</p>
                      <div className="flex gap-3">
                        <Button className="bg-primary hover:bg-primary/90 rounded-full">Follow Artist</Button>
                        <Button variant="outline" className="rounded-full bg-transparent">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Link href={`/artist/${productData.artist.name.toLowerCase().replace(" ", "-")}`}>
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

                    {productData.blockchain.tokenId && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-foreground mb-1">Token ID</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {productData.blockchain.tokenId}
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-foreground mb-1">Contract Address</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {productData.blockchain.contract}
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
           artist: productData.artist.name,
           price: currentPrice,
           currency: "USD",
           image: productData.images[0],
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
