"use client"

import React, { useState, useEffect } from "react"
import { DemoPopup } from "@/components/demo-popup"
import Link from "next/link"
import { ArrowLeft, Package, Star, Eye, ShoppingCart, Zap, Award, FileText, Layers, Settings, Download, Shield, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductFilters } from "@/components/product-filters"
import { useCart } from "@/contexts/cart-context"
import { useHolder } from "@/contexts/holder-context"
// Import demo data
import demoData from "@/data/demo-products.json"

const nftBundles = demoData.nftBundles

const availableTags = [
  "PFP",
  "Utility",
  "Traits",
  "10K",
  "5K",
  "1K",
  "Ready-to-Launch",
  "Metadata",
  "Layers",
  "Gaming",
  "Community",
  "Exclusive"
]

export default function NFTBundlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [bundleCount, setBundleCount] = useState(nftBundles.length)
  const [isClient, setIsClient] = useState(false)
  const { dispatch } = useCart()
  const { isHolder } = useHolder()

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setPriceRange("all")
    setSelectedTags([])
  }

  const addToCart = (bundle: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: bundle.id,
        title: bundle.title,
        artist: bundle.creator,
        price: bundle.priceXRP,
        priceUSD: bundle.priceUSD,
        currency: "XRP",
        image: bundle.images[0],
        category: "Bundle",
        productType: "bundle",
        licenseType: "commercial",
        isNFT: true,
        files: bundle.files
      },
    })
  }

  // Filter and sort bundles
  const filteredBundles = nftBundles
    .filter((bundle) => {
      const matchesSearch =
        bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bundle.creator.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => bundle.tags.includes(tag))
      const matchesPrice =
        priceRange === "all" ||
        (() => {
          const price = bundle.priceUSD
          switch (priceRange) {
            case "0-50":
              return price <= 50
            case "50-100":
              return price > 50 && price <= 100
            case "100-500":
              return price > 100 && price <= 500
            case "500+":
              return price > 500
            default:
              return true
          }
        })()

      return matchesSearch && matchesTags && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceXRP - b.priceXRP
        case "price-high":
          return b.priceXRP - a.priceXRP
        case "rating":
          return b.rating - a.rating
        case "oldest":
          return a.id.localeCompare(b.id)
        default:
          return b.id.localeCompare(a.id) // newest first
      }
    })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      setBundleCount(filteredBundles.length)
    }
  }, [filteredBundles.length, isClient])

  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">NFT Bundles</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isHolder && (
                <Badge className="bg-gold/10 text-gold border-gold/20">
                  <Star className="h-3 w-3 mr-1" />
                  Holder Benefits Active
                </Badge>
              )}
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {bundleCount} bundles
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="mb-16 text-center relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5 rounded-3xl animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-3xl p-12 mb-8 border border-purple-200/30">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-gold-500 to-yellow-500 text-black px-4 py-2 text-sm font-bold animate-bounce">
                🔥 HOT COLLECTIONS
              </Badge>
            </div>
            
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
              💎 Premium NFT Bundles
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Complete NFT collection packages with <span className="text-purple-400 font-bold">10K+ unique traits</span>, 
              JSON metadata, rarity charts, and comprehensive launch guides. 
              Perfect for creators ready to mint and launch their projects instantly on any blockchain.
            </p>
            
            {/* Enhanced Feature Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 text-base font-bold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                ⚡ Instant Download
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 text-base font-bold rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                🚀 Launch Ready
              </Badge>
              <Badge className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 text-base font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                💼 Commercial License
              </Badge>
              <Badge className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-3 text-base font-bold rounded-full shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105">
                🎨 High Quality Art
              </Badge>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{bundleCount}+</div>
                <div className="text-sm text-muted-foreground">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">100K+</div>
                <div className="text-sm text-muted-foreground">Total NFTs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">500+</div>
                <div className="text-sm text-muted-foreground">Unique Traits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          
          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Instant ZIP Download</h3>
                <p className="text-sm text-muted-foreground">Complete package with all files ready to use immediately</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Launch Ready</h3>
                <p className="text-sm text-muted-foreground">Metadata, traits, rarity charts & launch guide included</p>
              </CardContent>
            </Card>
            
            <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Commercial License</h3>
                <p className="text-sm text-muted-foreground">Full rights to mint, sell & create derivatives</p>
              </CardContent>
            </Card>
            
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Community Support</h3>
                <p className="text-sm text-muted-foreground">Discord access & launch strategy guidance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedTags={selectedTags}
            availableTags={availableTags}
            onTagToggle={handleTagToggle}
            onClearFilters={handleClearFilters}
            itemCount={bundleCount}
            itemType="bundles"
          />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBundles.map((bundle) => (
            <CollectionCard key={bundle.id} bundle={bundle} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Collection Card Component
function CollectionCard({ bundle, onAddToCart }: { bundle: any; onAddToCart: (bundle: any) => void }) {
  const [selectedPreview, setSelectedPreview] = useState(0)
  const { isHolder } = useHolder()

  const getCollectionImage = (bundleTitle: string) => {
    const imageMap: { [key: string]: string } = {
      "Mystic Realms 5K Pack": "/nft-preview-1.jpg",
      "Cyber Punks Collection": "/cyber-preview-1.jpg",
      "Abstract Dreams Bundle": "/abstract-preview-1.jpg",
      "Digital Landscapes Pro": "/digital-landscape.png",
      "Fantasy Warriors Pack": "/nft-preview-3.jpg",
      "Retro Gaming NFTs": "/nft-preview-5.jpg"
    }
    return imageMap[bundleTitle] || "/placeholder.jpg"
  }

  return (
    <Card className="group relative overflow-hidden border-2 border-purple-200/50 hover:border-purple-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2">
      {/* Collection Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={getCollectionImage(bundle.title)}
          alt={bundle.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Enhanced Supply Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-bold shadow-lg backdrop-blur-sm">
            📦 {bundle.supply} Supply
          </Badge>
        </div>
        
        {/* Enhanced Exclusive Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-bold animate-pulse shadow-lg">
            🔥 Exclusive
          </Badge>
        </div>
        
        {/* Rarity Badge */}
        <div className="absolute top-16 right-4">
          <Badge className="bg-gradient-to-r from-yellow-500 to-gold-500 text-black px-3 py-1 text-xs font-bold">
            ⭐ {bundle.rarity || 'Rare'}
          </Badge>
        </div>
        
        {/* Enhanced Limited Slots */}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 text-sm font-bold animate-bounce shadow-lg">
            ⏰ {bundle.slotsRemaining} Slots Left
          </Badge>
        </div>
        
        {/* Preview Gallery Indicator */}
        <div className="absolute bottom-4 right-4">
          <Badge className="bg-black/50 text-white px-3 py-1 text-xs backdrop-blur-sm">
            🖼️ {bundle.images?.length || 4} Previews
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title & Creator */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2">{bundle.title}</h3>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">👤</span>
            </div>
            <p className="text-purple-600 font-medium">by {bundle.creator}</p>
          </div>
        </div>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {bundle.tags?.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} className="bg-purple-100 text-purple-700 text-xs px-2 py-1">
              {tag}
            </Badge>
          ))}
          {bundle.tags?.length > 3 && (
            <Badge className="bg-gray-100 text-gray-600 text-xs px-2 py-1">
              +{bundle.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{bundle.totalTraits}</div>
            <div className="text-xs text-gray-600">Total Traits</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{bundle.categories}</div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{bundle.supply}</div>
            <div className="text-xs text-gray-600">Collection Size</div>
          </div>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {bundle.priceXRP} XRP
            </div>
            <div className="text-sm text-muted-foreground">
              ≈ ${bundle.priceUSD} USD
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{bundle.rating || '4.8'}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              ({bundle.reviews || '127'} reviews)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => onAddToCart(bundle)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            💎 Add to Cart - {bundle.priceXRP} XRP
          </Button>
          
          <Link href={`/product/${bundle.id}`}>
            <Button
              variant="outline"
              className="w-full border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-700 font-semibold py-3 rounded-xl transition-all duration-300"
            >
              📋 View Full Details & Previews
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>


      </CardContent>
    </Card>
  )
}

const CollectionCardMemo = React.memo(CollectionCard)