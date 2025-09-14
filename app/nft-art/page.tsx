"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Users, Zap, Crown, Gem } from "lucide-react"

interface NFTCollection {
  id: string
  name: string
  description: string
  totalItems: number
  traits: number
  rarity: string
  price: number
  originalPrice?: number
  image: string
  gradient: string
  category: string
  isAvailable: boolean
  downloads: number
  rating: number
}

const nftCollections: NFTCollection[] = [
  {
    id: "1",
    name: "Pixel Dogs Collection",
    description: "10K unique pixel art dogs with rare traits and accessories",
    totalItems: 10000,
    traits: 150,
    rarity: "Ultra Rare",
    price: 2.500,
    originalPrice: 5.000,
    image: "/api/placeholder/300/300",
    gradient: "from-purple-400 via-pink-500 to-red-500",
    category: "Animals",
    isAvailable: true,
    downloads: 1247,
    rating: 4.9
  },
  {
    id: "2",
    name: "Crypto Punks Reimagined",
    description: "Modern take on classic punks with 8K unique characters",
    totalItems: 8000,
    traits: 200,
    rarity: "Legendary",
    price: 15.000,
    originalPrice: 25.000,
    image: "/api/placeholder/300/300",
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    category: "Characters",
    isAvailable: true,
    downloads: 892,
    rating: 4.8
  },
  {
    id: "3",
    name: "Bored Ape Variants",
    description: "5K unique ape variations with exclusive traits",
    totalItems: 5000,
    traits: 120,
    rarity: "Epic",
    price: 8.500,
    image: "/api/placeholder/300/300",
    gradient: "from-green-400 via-blue-500 to-purple-600",
    category: "Animals",
    isAvailable: true,
    downloads: 2156,
    rating: 4.7
  },
  {
    id: "4",
    name: "Azuki Inspired Art",
    description: "Anime-style collection with 7K unique characters",
    totalItems: 7000,
    traits: 180,
    rarity: "Rare",
    price: 3.200,
    originalPrice: 4.500,
    image: "/api/placeholder/300/300",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    category: "Anime",
    isAvailable: true,
    downloads: 1678,
    rating: 4.6
  },
  {
    id: "5",
    name: "Doodles Collection",
    description: "Colorful doodle art with 6K unique pieces",
    totalItems: 6000,
    traits: 95,
    rarity: "Common",
    price: 1.200,
    image: "/api/placeholder/300/300",
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    category: "Art",
    isAvailable: true,
    downloads: 3421,
    rating: 4.5
  },
  {
    id: "6",
    name: "Cool Cats Remix",
    description: "Cool cat variations with 4K unique designs",
    totalItems: 4000,
    traits: 110,
    rarity: "Rare",
    price: 2800,
    image: "/api/placeholder/300/300",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    category: "Animals",
    isAvailable: true,
    downloads: 987,
    rating: 4.4
  },
  {
    id: "7",
    name: "Mutant Ape Yacht Club",
    description: "Mutant variations with 12K unique specimens",
    totalItems: 12000,
    traits: 250,
    rarity: "Mythic",
    price: 35000,
    originalPrice: 50000,
    image: "/api/placeholder/300/300",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    category: "Animals",
    isAvailable: true,
    downloads: 456,
    rating: 4.9
  },
  {
    id: "8",
    name: "World of Women",
    description: "Empowering women NFT collection with 8K pieces",
    totalItems: 8000,
    traits: 160,
    rarity: "Epic",
    price: 6500,
    image: "/api/placeholder/300/300",
    gradient: "from-pink-400 via-purple-500 to-indigo-600",
    category: "Characters",
    isAvailable: true,
    downloads: 1834,
    rating: 4.8
  }
]

export default function NFTArtPage() {
  const [purchasedCollections, setPurchasedCollections] = useState<string[]>([])
  const [filter, setFilter] = useState<string>("all")

  const handlePurchase = (collectionId: string) => {
    const collection = nftCollections.find(c => c.id === collectionId)
    if (!collection) return
    
    // Simulate purchase confirmation
    const confirmed = window.confirm(
      `Purchase "${collection.name}" for ${collection.price.toLocaleString()} XRP?\n\n` +
      `This collection will be removed from the store after purchase and you'll receive:\n` +
      `• ${collection.totalItems.toLocaleString()} unique NFT images\n` +
      `• Complete JSON metadata with ${collection.traits} traits\n` +
      `• Full commercial license\n` +
      `• Instant download access`
    )
    
    if (confirmed) {
      // Add to purchased collections (removes from available list)
      setPurchasedCollections(prev => [...prev, collectionId])
      
      // Show success message with download simulation
      alert(
        `🎉 Purchase Successful!\n\n` +
        `"${collection.name}" has been purchased and removed from the store.\n` +
        `Download started automatically...\n\n` +
        `You now have exclusive rights to this collection!`
      )
      
      // Simulate download process
      console.log(`Downloading collection ${collectionId}...`)
      console.log(`Collection "${collection.name}" removed from marketplace`)
      
      // In real app, this would:
      // 1. Process XRP payment
      // 2. Generate download links
      // 3. Remove collection from database
      // 4. Transfer license ownership
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "Mythic": return <Crown className="h-4 w-4 text-yellow-500" />
      case "Legendary": return <Gem className="h-4 w-4 text-purple-500" />
      case "Ultra Rare": return <Zap className="h-4 w-4 text-orange-500" />
      case "Epic": return <Star className="h-4 w-4 text-blue-500" />
      case "Rare": return <Star className="h-4 w-4 text-green-500" />
      default: return <Star className="h-4 w-4 text-gray-500" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mythic": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Legendary": return "bg-purple-100 text-purple-800 border-purple-200"
      case "Ultra Rare": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Epic": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Rare": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const availableCollections = nftCollections.filter(collection => 
    !purchasedCollections.includes(collection.id) && collection.isAvailable
  )

  const filteredCollections = filter === "all" 
    ? availableCollections 
    : availableCollections.filter(collection => collection.category.toLowerCase() === filter)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              NFT Art Collections
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Complete NFT collections with 10K images, JSON metadata, and rarity traits. 
              Perfect for creators who want ready-to-launch collections.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <Download className="h-3 w-3 mr-1" />
                Instant Download
              </Badge>
              <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                <Zap className="h-3 w-3 mr-1" />
                Full License
              </Badge>
              <Badge variant="secondary" className="bg-orange-300 text-orange-900">
                <Users className="h-3 w-3 mr-1" />
                Commercial Use
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-600 hover:bg-orange-100"}
            >
              All Collections
            </Button>
            <Button 
              variant={filter === "animals" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("animals")}
              className={filter === "animals" ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-600 hover:bg-orange-100"}
            >
              Animals
            </Button>
            <Button 
              variant={filter === "characters" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("characters")}
              className={filter === "characters" ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-600 hover:bg-orange-100"}
            >
              Characters
            </Button>
            <Button 
              variant={filter === "art" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("art")}
              className={filter === "art" ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-600 hover:bg-orange-100"}
            >
              Art
            </Button>
            <Button 
              variant={filter === "anime" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("anime")}
              className={filter === "anime" ? "bg-orange-600 hover:bg-orange-700" : "border-orange-200 text-orange-600 hover:bg-orange-100"}
            >
              Anime
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Stats Bar */}
          <div className="bg-white border-y border-orange-200 py-4 mb-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{availableCollections.length}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">{purchasedCollections.length}</div>
                  <div className="text-sm text-gray-600">Sold</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{nftCollections.reduce((sum, c) => sum + c.totalItems, 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total NFTs</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCollections.map((collection) => (
              <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${collection.gradient} relative`}>
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getRarityColor(collection.rarity)} border`}>
                      {getRarityIcon(collection.rarity)}
                      <span className="ml-1">{collection.rarity}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/20 text-white border-white/20">
                      ⭐ {collection.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      <Download className="h-3 w-3 mr-1" />
                      {collection.downloads.toLocaleString()}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{collection.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {collection.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items:</span>
                      <span className="font-medium">{collection.totalItems.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Traits:</span>
                      <span className="font-medium">{collection.traits}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {collection.price.toLocaleString()} XRP
                        </div>
                        {collection.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {collection.originalPrice.toLocaleString()} XRP
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      onClick={() => handlePurchase(collection.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Purchase & Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCollections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No collections available in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">Complete Collection</h3>
                <p className="text-sm text-gray-600">
                  High-resolution images, JSON metadata, and rarity traits for every NFT
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">Full Commercial License</h3>
                <p className="text-sm text-gray-600">
                  Use for your own NFT project, modify, and sell without restrictions
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">Exclusive Access</h3>
                <p className="text-sm text-gray-600">
                  Once purchased, collection is removed from store ensuring uniqueness
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}