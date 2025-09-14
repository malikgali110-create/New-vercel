"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  ShoppingCart,
  Eye,
  Heart,
  Zap,
  Users,
  TrendingUp,
  Gift,
  Percent,
  Crown,
  Sparkles,
  Paintbrush,
  Feather,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CollectionItem {
  id: string
  title: string
  artist: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  likes: number
  views: number
  rarity: "common" | "rare" | "epic" | "legendary"
  traits: { [key: string]: string }
}

interface CollectionPack {
  id: string
  name: string
  description: string
  artist: string
  artistAvatar: string
  coverImage: string
  items: CollectionItem[]
  totalValue: number
  packPrice: number
  discount: number
  category: string
  tags: string[]
  packType: "curated" | "complete" | "themed" | "artist"
  exclusiveItems?: number
  limitedEdition?: boolean
  totalSupply?: number
  soldCount?: number
}

const mockCollectionPacks: CollectionPack[] = [
  {
    id: "1",
    name: "Mystic Animals Complete Collection",
    description:
      "The entire Mystic Animals NFT collection featuring 100 unique digital creatures with magical powers and rare traits.",
    artist: "Sarah Chen",
    artistAvatar: "/artist-sarah-chen.jpg",
    coverImage: "/mystic-animals-collection.jpg",
    totalValue: 2500,
    packPrice: 1800,
    discount: 28,
    category: "NFT Collections",
    tags: ["Animals", "Fantasy", "Complete Set", "Limited Edition"],
    packType: "complete",
    exclusiveItems: 5,
    limitedEdition: true,
    totalSupply: 50,
    soldCount: 23,
    items: [
      {
        id: "ma-1",
        title: "Mystic Wolf Alpha",
        artist: "Sarah Chen",
        image: "/mystic-wolf-alpha.jpg",
        price: 45,
        originalPrice: 60,
        rating: 4.9,
        likes: 234,
        views: 1567,
        rarity: "legendary",
        traits: { Element: "Fire", Power: "Leadership", Rarity: "Legendary" },
      },
      {
        id: "ma-2",
        title: "Crystal Dragon",
        artist: "Sarah Chen",
        image: "/crystal-dragon.jpg",
        price: 38,
        rating: 4.8,
        likes: 189,
        views: 1234,
        rarity: "epic",
        traits: { Element: "Crystal", Power: "Magic", Rarity: "Epic" },
      },
      {
        id: "ma-3",
        title: "Shadow Panther",
        artist: "Sarah Chen",
        image: "/shadow-panther.jpg",
        price: 25,
        rating: 4.7,
        likes: 156,
        views: 987,
        rarity: "rare",
        traits: { Element: "Shadow", Power: "Stealth", Rarity: "Rare" },
      },
    ],
  },
  {
    id: "2",
    name: "Abstract Dreams Bundle",
    description: "A curated selection of abstract digital artworks perfect for modern spaces and digital galleries.",
    artist: "Multiple Artists",
    artistAvatar: "/multiple-artists.jpg",
    coverImage: "/abstract-dreams-bundle.jpg",
    totalValue: 890,
    packPrice: 650,
    discount: 27,
    category: "Digital Arts",
    tags: ["Abstract", "Curated", "Multi-Artist", "Gallery Ready"],
    packType: "curated",
    items: [
      {
        id: "ad-1",
        title: "Flowing Emotions",
        artist: "Alex Rivera",
        image: "/flowing-emotions.jpg",
        price: 120,
        rating: 4.8,
        likes: 298,
        views: 1876,
        rarity: "rare",
        traits: { Style: "Abstract", Medium: "Digital", Mood: "Emotional" },
      },
      {
        id: "ad-2",
        title: "Geometric Harmony",
        artist: "Maya Patel",
        image: "/geometric-harmony.jpg",
        price: 95,
        rating: 4.6,
        likes: 167,
        views: 1234,
        rarity: "common",
        traits: { Style: "Geometric", Medium: "Vector", Mood: "Balanced" },
      },
    ],
  },
  {
    id: "3",
    name: "Cyberpunk City Starter Pack",
    description:
      "Essential cyberpunk-themed digital assets for creators and collectors entering the futuristic art scene.",
    artist: "Digital Collective",
    artistAvatar: "/digital-collective.jpg",
    coverImage: "/cyberpunk-starter-pack.jpg",
    totalValue: 450,
    packPrice: 299,
    discount: 34,
    category: "Digital Arts",
    tags: ["Cyberpunk", "Starter", "Futuristic", "Beginner Friendly"],
    packType: "themed",
    items: [
      {
        id: "cp-1",
        title: "Neon Streets",
        artist: "Cyber Artist",
        image: "/neon-streets.jpg",
        price: 85,
        rating: 4.5,
        likes: 145,
        views: 876,
        rarity: "common",
        traits: { Theme: "Cyberpunk", Setting: "Urban", Time: "Night" },
      },
      {
        id: "cp-2",
        title: "Digital Rain",
        artist: "Matrix Creator",
        image: "/digital-rain.jpg",
        price: 65,
        rating: 4.4,
        likes: 123,
        views: 654,
        rarity: "common",
        traits: { Theme: "Matrix", Effect: "Rain", Color: "Green" },
      },
    ],
  },
]

export function CollectionPack() {
  const [selectedPacks, setSelectedPacks] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("discount")
  const [filterBy, setFilterBy] = useState("all")

  const handlePackSelection = (packId: string) => {
    setSelectedPacks((prev) => (prev.includes(packId) ? prev.filter((id) => id !== packId) : [...prev, packId]))
  }

  const calculateBulkDiscount = () => {
    if (selectedPacks.length >= 3) return 15
    if (selectedPacks.length >= 2) return 10
    return 0
  }

  const getTotalPrice = () => {
    const baseTotal = selectedPacks.reduce((total, packId) => {
      const pack = mockCollectionPacks.find((p) => p.id === packId)
      return total + (pack?.packPrice || 0)
    }, 0)
    const bulkDiscount = calculateBulkDiscount()
    return Math.round(baseTotal * (1 - bulkDiscount / 100))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getPackTypeIcon = (type: string) => {
    switch (type) {
      case "complete":
        return <Crown className="h-4 w-4" />
      case "curated":
        return <Sparkles className="h-4 w-4" />
      case "themed":
        return <Package className="h-4 w-4" />
      case "artist":
        return <Users className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const sortedPacks = [...mockCollectionPacks].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discount - a.discount
      case "price":
        return a.packPrice - b.packPrice
      case "value":
        return b.totalValue - a.totalValue
      case "popularity":
        return (b.soldCount || 0) - (a.soldCount || 0)
      default:
        return 0
    }
  })

  const filteredPacks = sortedPacks.filter((pack) => {
    if (filterBy === "all") return true
    if (filterBy === "limited") return pack.limitedEdition
    if (filterBy === "complete") return pack.packType === "complete"
    if (filterBy === "curated") return pack.packType === "curated"
    return true
  })

  return (
    <div className="space-y-8 relative">
      <div className="absolute top-20 left-10 opacity-10 rotate-12 animate-float">
        <Paintbrush className="h-16 w-16 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 -rotate-12 animate-float">
        <Feather className="h-12 w-12 text-accent" />
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative z-10">
        <div className="animate-in slide-in-from-bottom-4 duration-1000">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 animate-pulse">
            <Package className="h-3 w-3 mr-1" />
            Collection Packs
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground animate-in slide-in-from-bottom-4 duration-1000 delay-200 text-balance">
          Curated Art Collections
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-400 text-pretty">
          Discover exclusive bundles and complete collections at special prices. Save more when you buy in bulk.
        </p>
        <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-600">
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="font-medium">Limited time offers available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Purchase Summary */}
      {selectedPacks.length > 0 && (
        <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-chart-3/5 border-primary/20 product-card-hover animate-in slide-in-from-top-4 duration-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 font-serif text-lg">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Bulk Purchase ({selectedPacks.length} packs selected)
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-muted-foreground">
                    Original Total:{" "}
                    {selectedPacks.reduce((total, packId) => {
                      const pack = mockCollectionPacks.find((p) => p.id === packId)
                      return total + (pack?.totalValue || 0)
                    }, 0)}{" "}
                    XRP
                  </span>
                  {calculateBulkDiscount() > 0 && (
                    <Badge className="bg-green-500 text-white animate-pulse">
                      <Percent className="h-3 w-3 mr-1" />
                      Additional {calculateBulkDiscount()}% Bulk Discount
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-foreground font-serif">{getTotalPrice()} XRP</div>
                <Button className="mt-2 bg-gradient-to-r from-primary to-chart-4 hover:from-chart-4 hover:to-primary text-white border-0 rounded-full micro-bounce hover:scale-105 transition-all duration-300">
                  <Zap className="h-4 w-4 mr-2" />
                  Buy All Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between animate-in slide-in-from-bottom-4 duration-1000 delay-800">
        <div className="flex gap-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48 rounded-full border-2 hover:border-primary/30 transition-colors duration-200">
              <SelectValue placeholder="Filter packs..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Packs</SelectItem>
              <SelectItem value="limited">Limited Edition</SelectItem>
              <SelectItem value="complete">Complete Collections</SelectItem>
              <SelectItem value="curated">Curated Bundles</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 rounded-full border-2 hover:border-primary/30 transition-colors duration-200">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="discount">Highest Discount</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
              <SelectItem value="value">Highest Value</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-medium">{filteredPacks.length} packs available</span>
        </div>
      </div>

      {/* Collection Packs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPacks.map((pack, index) => (
          <Card
            key={pack.id}
            className="overflow-hidden product-card-hover rounded-2xl bg-card border-2 hover:border-primary/30 transition-all duration-500 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                  src={pack.coverImage || "/placeholder.svg"}
                  alt={pack.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Pack Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`${getRarityColor(pack.packType)} rounded-full px-3 py-1 animate-pulse`}>
                    {getPackTypeIcon(pack.packType)}
                    <span className="ml-1 capitalize font-medium">{pack.packType}</span>
                  </Badge>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-3 py-1 animate-bounce">
                    <Percent className="h-3 w-3 mr-1" />
                    {pack.discount}% OFF
                  </Badge>
                </div>

                {/* Limited Edition Badge */}
                {pack.limitedEdition && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-3 py-1 animate-pulse">
                      <Crown className="h-3 w-3 mr-1" />
                      Limited ({pack.soldCount}/{pack.totalSupply})
                    </Badge>
                  </div>
                )}

                {/* Selection Checkbox */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200">
                    <Checkbox
                      checked={selectedPacks.includes(pack.id)}
                      onCheckedChange={() => handlePackSelection(pack.id)}
                      className="border-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-serif line-clamp-2 text-balance">{pack.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">by {pack.artist}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {pack.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{pack.description}</p>

              {/* Pack Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground block text-xs">Items:</span>
                  <span className="font-semibold text-foreground text-lg">{pack.items.length}</span>
                  {pack.exclusiveItems && (
                    <span className="text-xs text-blue-600 block">(+{pack.exclusiveItems} exclusive)</span>
                  )}
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground block text-xs">Value:</span>
                  <span className="font-semibold text-foreground text-lg">{pack.totalValue} XRP</span>
                </div>
              </div>

              {/* Preview Items */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Preview Items</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {pack.items.slice(0, 3).map((item, itemIndex) => (
                    <div key={item.id} className="relative group">
                      <div className="relative h-16 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                      </div>
                      <Badge
                        className={`absolute -top-1 -right-1 text-xs ${getRarityColor(item.rarity)} rounded-full px-1 py-0`}
                      >
                        {item.rarity[0].toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
                {pack.items.length > 3 && (
                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    +{pack.items.length - 3} more items included
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                <div>
                  <div className="text-2xl font-bold text-foreground font-serif">{pack.packPrice} XRP</div>
                  <div className="text-sm text-muted-foreground line-through">{pack.totalValue} XRP</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">
                    Save {pack.totalValue - pack.packPrice} XRP
                  </div>
                  <div className="text-xs text-muted-foreground">{pack.discount}% discount</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-chart-4 rounded-full micro-bounce hover:scale-105 transition-all duration-300">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Link href={`/collection/${pack.id}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Discount Info */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200 animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <div className="p-3 bg-green-100 rounded-full">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">Bulk Purchase Rewards</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-600 font-serif mb-2">10%</div>
                <div className="text-sm text-muted-foreground font-medium">Additional discount on 2+ packs</div>
              </div>
              <div className="p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-600 font-serif mb-2">15%</div>
                <div className="text-sm text-muted-foreground font-medium">Additional discount on 3+ packs</div>
              </div>
              <div className="p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-600 font-serif mb-2">Free</div>
                <div className="text-sm text-muted-foreground font-medium">Exclusive bonus items on large orders</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
