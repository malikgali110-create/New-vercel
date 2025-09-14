"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import DownloadUtility from "@/components/download-utility"
import { DirectPurchaseModal } from "@/components/direct-purchase-modal"
import {
  Package,
  ShoppingCart,
  Eye,
  Heart,
  Download,
  Zap,
  Users,
  TrendingUp,
  Gift,
  Percent,
  Crown,
  Sparkles,
  Paintbrush,
  FileJson,
  Image as ImageIcon,
  Printer,
  Shirt,
  Coffee,
  Frame,
  Filter,
  Search,
  Grid3X3,
  List,
  Star,
  Coins,
  Calendar,
  Clock,
  Trophy,
  Flame,
  Gem,
  Shield,
  Wallet,
  ExternalLink,
  DollarSign,
  Palette,
  Target
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"

interface NFTTrait {
  trait_type: string
  value: string
  rarity_percentage: number
}

interface NFTCollection {
  id: string
  name: string
  description: string
  creator: string
  creatorAvatar: string
  bannerImage: string
  profileImage: string
  totalSupply: number
  mintedCount: number
  floorPrice: number
  mintPrice: number
  launchingFee: number
  category: string
  blockchain: "XRPL"
  verified: boolean
  featured: boolean
  previewImages: string[]
  traits: NFTTrait[]
  packSizes: {
    "2K": { price: number; items: number }
    "5K": { price: number; items: number }
    "10K": { price: number; items: number }
  }
  downloadableFiles: {
    metadata: string
    originalImages: string[]
  }
  printOptions: {
    wallArt: { sizes: string[]; prices: number[] }
    tshirts: { sizes: string[]; prices: number[] }
    mugs: { sizes: string[]; prices: number[] }
    caps: { sizes: string[]; prices: number[] }
  }
  createdAt: string
  royalties: number
  volume24h: number
  volumeTotal: number
}

const mockNFTCollections: NFTCollection[] = [
  {
    id: "legendary-animals-2024",
    name: "Legendary Animals Kingdom",
    description: "A majestic collection of 10,000 legendary animals with unique powers and rare traits. Each NFT represents a guardian of the ancient world with special abilities and mystical properties.",
    creator: "WildArt Studios",
    creatorAvatar: "/creator-wildart.jpg",
    bannerImage: "/nft-collection-animals-banner.jpg",
    profileImage: "/nft-collection-animals-cover.jpg",
    totalSupply: 10000,
    mintedCount: 7834,
    floorPrice: 25.5,
    mintPrice: 15.0,
    launchingFee: 500,
    category: "Animals",
    blockchain: "XRPL",
    verified: true,
    featured: true,
    previewImages: [
      "/nft-preview-1.jpg",
      "/nft-preview-2.jpg",
      "/nft-preview-3.jpg",
      "/nft-preview-4.jpg",
      "/nft-preview-5.jpg",
      "/nft-preview-6.jpg",
      "/nft-preview-7.jpg",
      "/nft-preview-8.jpg",
      "/nft-preview-9.jpg",
      "/nft-preview-10.jpg",
      "/nft-preview-11.jpg",
      "/nft-preview-12.jpg"
    ],
    traits: [
      { trait_type: "Species", value: "Lion", rarity_percentage: 5.2 },
      { trait_type: "Element", value: "Fire", rarity_percentage: 12.8 },
      { trait_type: "Power Level", value: "Legendary", rarity_percentage: 2.1 },
      { trait_type: "Background", value: "Mystic Forest", rarity_percentage: 8.7 },
      { trait_type: "Accessories", value: "Golden Crown", rarity_percentage: 1.5 }
    ],
    packSizes: {
      "2K": { price: 28000, items: 2000 },
      "5K": { price: 65000, items: 5000 },
      "10K": { price: 120000, items: 10000 }
    },
    downloadableFiles: {
      metadata: "/downloads/legendary-animals-metadata.json",
      originalImages: ["/downloads/legendary-animals-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["12x16", "16x20", "20x24", "24x36"], prices: [25, 35, 45, 65] },
      tshirts: { sizes: ["S", "M", "L", "XL", "XXL"], prices: [20, 20, 20, 22, 24] },
      mugs: { sizes: ["11oz", "15oz"], prices: [15, 18] },
      caps: { sizes: ["One Size"], prices: [18] }
    },
    createdAt: "2024-01-15",
    royalties: 7.5,
    volume24h: 1250.75,
    volumeTotal: 45678.90
  },
  {
    id: "ocean-guardians-2024",
    name: "Ocean Guardians",
    description: "Dive into the depths with 8,000 mystical sea creatures. From majestic whales to colorful coral fish, each guardian protects the ocean's secrets.",
    creator: "AquaArt Collective",
    creatorAvatar: "/creator-aqua.jpg",
    bannerImage: "/nft-collection-ocean-banner.jpg",
    profileImage: "/nft-collection-ocean-cover.jpg",
    totalSupply: 8000,
    mintedCount: 6234,
    floorPrice: 18.5,
    mintPrice: 12.0,
    launchingFee: 400,
    category: "Animals",
    blockchain: "XRPL",
    verified: true,
    featured: true,
    previewImages: [
      "/nft-preview-1.jpg",
      "/nft-preview-2.jpg",
      "/nft-preview-3.jpg",
      "/nft-preview-4.jpg",
      "/nft-preview-5.jpg",
      "/nft-preview-6.jpg"
    ],
    traits: [
      { trait_type: "Species", value: "Whale", rarity_percentage: 4.2 },
      { trait_type: "Habitat", value: "Deep Ocean", rarity_percentage: 8.9 },
      { trait_type: "Power", value: "Tsunami Control", rarity_percentage: 2.8 },
      { trait_type: "Color", value: "Bioluminescent", rarity_percentage: 6.5 }
    ],
    packSizes: {
      "2K": { price: 22000, items: 2000 },
      "5K": { price: 55000, items: 5000 },
      "10K": { price: 95000, items: 8000 }
    },
    downloadableFiles: {
      metadata: "/downloads/ocean-guardians-metadata.json",
      originalImages: ["/downloads/ocean-guardians-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["12x16", "16x20", "20x24"], prices: [22, 32, 42] },
      tshirts: { sizes: ["S", "M", "L", "XL"], prices: [18, 18, 18, 20] },
      mugs: { sizes: ["11oz", "15oz"], prices: [14, 17] },
      caps: { sizes: ["One Size"], prices: [16] }
    },
    createdAt: "2024-02-10",
    royalties: 6.0,
    volume24h: 890.25,
    volumeTotal: 28456.70
  },
  {
    id: "safari-kings-collection",
    name: "Safari Kings",
    description: "Meet the rulers of the African savanna! 6,000 majestic big cats, elephants, and exotic wildlife with stunning tribal art influences.",
    creator: "Safari Studios",
    creatorAvatar: "/creator-safari.jpg",
    bannerImage: "/nft-collection-safari-banner.jpg",
    profileImage: "/nft-collection-safari-cover.jpg",
    totalSupply: 6000,
    mintedCount: 4892,
    floorPrice: 32.0,
    mintPrice: 20.0,
    launchingFee: 600,
    category: "Animals",
    blockchain: "XRPL",
    verified: true,
    featured: false,
    previewImages: [
      "/nft-preview-3.jpg",
      "/nft-preview-4.jpg",
      "/nft-preview-5.jpg",
      "/nft-preview-6.jpg",
      "/nft-preview-7.jpg",
      "/nft-preview-8.jpg"
    ],
    traits: [
      { trait_type: "Species", value: "Lion", rarity_percentage: 8.5 },
      { trait_type: "Pattern", value: "Tribal Marks", rarity_percentage: 12.3 },
      { trait_type: "Territory", value: "Pride Rock", rarity_percentage: 5.7 },
      { trait_type: "Mane Style", value: "Golden Flowing", rarity_percentage: 3.2 }
    ],
    packSizes: {
      "2K": { price: 38000, items: 2000 },
      "5K": { price: 90000, items: 5000 },
      "10K": { price: 115000, items: 6000 }
    },
    downloadableFiles: {
      metadata: "/downloads/safari-kings-metadata.json",
      originalImages: ["/downloads/safari-kings-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["16x20", "20x24", "24x36"], prices: [30, 40, 60] },
      tshirts: { sizes: ["S", "M", "L", "XL", "XXL"], prices: [22, 22, 22, 24, 26] },
      mugs: { sizes: ["11oz", "15oz"], prices: [16, 19] },
      caps: { sizes: ["One Size"], prices: [20] }
    },
    createdAt: "2024-01-28",
    royalties: 8.0,
    volume24h: 1456.80,
    volumeTotal: 38924.15
  },
  {
    id: "arctic-wolves-pack",
    name: "Arctic Wolves Pack",
    description: "Howl with the pack! 4,000 fierce arctic wolves with ice powers and winter survival traits. Each wolf has unique pack dynamics and hunting abilities.",
    creator: "Frozen Wilderness",
    creatorAvatar: "/creator-arctic.jpg",
    bannerImage: "/nft-collection-arctic-banner.jpg",
    profileImage: "/nft-collection-arctic-cover.jpg",
    totalSupply: 4000,
    mintedCount: 3456,
    floorPrice: 28.7,
    mintPrice: 18.5,
    launchingFee: 450,
    category: "Animals",
    blockchain: "XRPL",
    verified: true,
    featured: false,
    previewImages: [
      "/nft-preview-2.jpg",
      "/nft-preview-5.jpg",
      "/nft-preview-8.jpg",
      "/nft-preview-9.jpg",
      "/nft-preview-10.jpg"
    ],
    traits: [
      { trait_type: "Pack Role", value: "Alpha", rarity_percentage: 2.5 },
      { trait_type: "Fur Color", value: "Silver White", rarity_percentage: 7.8 },
      { trait_type: "Ice Power", value: "Blizzard Howl", rarity_percentage: 4.1 },
      { trait_type: "Eyes", value: "Glacier Blue", rarity_percentage: 9.6 }
    ],
    packSizes: {
      "2K": { price: 35000, items: 2000 },
      "5K": { price: 70000, items: 4000 },
      "10K": { price: 0, items: 0 }
    },
    downloadableFiles: {
      metadata: "/downloads/arctic-wolves-metadata.json",
      originalImages: ["/downloads/arctic-wolves-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["12x16", "16x20", "20x24"], prices: [28, 38, 48] },
      tshirts: { sizes: ["S", "M", "L", "XL"], prices: [20, 20, 20, 22] },
      mugs: { sizes: ["11oz", "15oz"], prices: [15, 18] },
      caps: { sizes: ["One Size"], prices: [18] }
    },
    createdAt: "2024-03-05",
    royalties: 7.0,
    volume24h: 734.50,
    volumeTotal: 19876.40
  },
  {
    id: "cyber-warriors-genesis",
    name: "Cyber Warriors Genesis",
    description: "The first generation of cybernetic warriors from the future. 5,000 unique digital soldiers with advanced AI and combat capabilities.",
    creator: "FutureTech Labs",
    creatorAvatar: "/creator-cyber.jpg",
    bannerImage: "/nft-collection-cyber-banner.jpg",
    profileImage: "/nft-collection-cyber-cover.jpg",
    totalSupply: 5000,
    mintedCount: 4567,
    floorPrice: 42.8,
    mintPrice: 28.0,
    launchingFee: 750,
    category: "Sci-Fi",
    blockchain: "XRPL",
    verified: true,
    featured: true,
    previewImages: [
      "/cyber-preview-1.jpg",
      "/cyber-preview-2.jpg",
      "/cyber-preview-3.jpg",
      "/cyber-preview-4.jpg",
      "/cyber-preview-5.jpg",
      "/cyber-preview-6.jpg",
      "/cyber-preview-7.jpg",
      "/cyber-preview-8.jpg",
      "/cyber-preview-9.jpg",
      "/cyber-preview-10.jpg"
    ],
    traits: [
      { trait_type: "Armor Type", value: "Quantum", rarity_percentage: 3.8 },
      { trait_type: "Weapon", value: "Plasma Rifle", rarity_percentage: 7.2 },
      { trait_type: "AI Level", value: "Advanced", rarity_percentage: 15.6 },
      { trait_type: "Faction", value: "Neo Tokyo", rarity_percentage: 22.4 }
    ],
    packSizes: {
      "2K": { price: 52000, items: 2000 },
      "5K": { price: 125000, items: 5000 },
      "10K": { price: 0, items: 0 }
    },
    downloadableFiles: {
      metadata: "/downloads/cyber-warriors-metadata.json",
      originalImages: ["/downloads/cyber-warriors-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["12x16", "16x20", "20x24", "24x36"], prices: [30, 40, 50, 70] },
      tshirts: { sizes: ["S", "M", "L", "XL", "XXL"], prices: [25, 25, 25, 27, 29] },
      mugs: { sizes: ["11oz", "15oz"], prices: [18, 22] },
      caps: { sizes: ["One Size"], prices: [22] }
    },
    createdAt: "2024-02-01",
    royalties: 10.0,
    volume24h: 2150.25,
    volumeTotal: 78945.60
  },
  {
    id: "abstract-dreams-collection",
    name: "Abstract Dreams",
    description: "A mesmerizing collection of 2,000 abstract artworks that blend reality with imagination. Each piece tells a unique story through colors and forms.",
    creator: "DreamArt Collective",
    creatorAvatar: "/creator-ai.jpg",
    bannerImage: "/nft-collection-abstract-banner.jpg",
    profileImage: "/nft-collection-abstract-cover.jpg",
    totalSupply: 2000,
    mintedCount: 1876,
    floorPrice: 18.5,
    mintPrice: 12.0,
    launchingFee: 300,
    category: "Abstract",
    blockchain: "XRPL",
    verified: true,
    featured: false,
    previewImages: [
      "/abstract-preview-1.jpg",
      "/abstract-preview-2.jpg",
      "/abstract-preview-3.jpg",
      "/abstract-preview-4.jpg",
      "/abstract-preview-5.jpg",
      "/abstract-preview-6.jpg",
      "/abstract-preview-7.jpg",
      "/abstract-preview-8.jpg"
    ],
    traits: [
      { trait_type: "Color Palette", value: "Vibrant", rarity_percentage: 25.5 },
      { trait_type: "Style", value: "Fluid", rarity_percentage: 18.7 },
      { trait_type: "Mood", value: "Energetic", rarity_percentage: 12.3 },
      { trait_type: "Complexity", value: "High", rarity_percentage: 8.9 }
    ],
    packSizes: {
      "2K": { price: 22000, items: 2000 },
      "5K": { price: 0, items: 0 },
      "10K": { price: 0, items: 0 }
    },
    downloadableFiles: {
      metadata: "/downloads/abstract-dreams-metadata.json",
      originalImages: ["/downloads/abstract-dreams-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["12x16", "16x20", "20x24", "24x36"], prices: [22, 32, 42, 62] },
      tshirts: { sizes: ["S", "M", "L", "XL", "XXL"], prices: [18, 18, 18, 20, 22] },
      mugs: { sizes: ["11oz", "15oz"], prices: [12, 15] },
      caps: { sizes: ["One Size"], prices: [15] }
    },
    createdAt: "2024-03-10",
    royalties: 5.0,
    volume24h: 890.50,
    volumeTotal: 23456.78
  },
  {
    id: "neon-dreamscape-art",
    name: "Neon Dreamscape",
    description: "Vibrant digital art collection featuring 3,000 psychedelic landscapes and abstract compositions. Each piece pulses with electric energy and cosmic vibes.",
    creator: "Digital Visions",
    creatorAvatar: "/creator-neon.jpg",
    bannerImage: "/nft-collection-neon-banner.jpg",
    profileImage: "/nft-collection-neon-cover.jpg",
    totalSupply: 3000,
    mintedCount: 2789,
    floorPrice: 45.2,
    mintPrice: 35.0,
    launchingFee: 800,
    category: "Art",
    blockchain: "XRPL",
    verified: true,
    featured: true,
    previewImages: [
      "/neon-preview-1.jpg",
      "/neon-preview-2.jpg",
      "/neon-preview-3.jpg",
      "/neon-preview-4.jpg",
      "/neon-preview-5.jpg"
    ],
    traits: [
      { trait_type: "Color Scheme", value: "Electric Purple", rarity_percentage: 5.8 },
      { trait_type: "Pattern", value: "Fractal Spiral", rarity_percentage: 8.2 },
      { trait_type: "Energy Level", value: "Maximum", rarity_percentage: 3.1 },
      { trait_type: "Dimension", value: "4D Portal", rarity_percentage: 1.9 }
    ],
    packSizes: {
      "2K": { price: 68000, items: 2000 },
      "5K": { price: 105000, items: 3000 },
      "10K": { price: 0, items: 0 }
    },
    downloadableFiles: {
      metadata: "/downloads/neon-dreamscape-metadata.json",
      originalImages: ["/downloads/neon-dreamscape-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["16x20", "20x24", "24x36", "30x40"], prices: [40, 55, 75, 120] },
      tshirts: { sizes: ["S", "M", "L", "XL"], prices: [25, 25, 25, 27] },
      mugs: { sizes: ["11oz", "15oz"], prices: [18, 22] },
      caps: { sizes: ["One Size"], prices: [22] }
    },
    createdAt: "2024-02-20",
    royalties: 7.5,
    volume24h: 1890.45,
    volumeTotal: 52341.80
  },
  {
    id: "pixel-heroes-gaming",
    name: "Pixel Heroes",
    description: "Retro 8-bit gaming characters come to life! 7,500 pixelated warriors, mages, and adventurers with classic RPG stats and abilities.",
    creator: "Retro Game Studios",
    creatorAvatar: "/creator-pixel.jpg",
    bannerImage: "/nft-collection-pixel-banner.jpg",
    profileImage: "/nft-collection-pixel-cover.jpg",
    totalSupply: 7500,
    mintedCount: 5643,
    floorPrice: 24.8,
    mintPrice: 16.0,
    launchingFee: 500,
    category: "Gaming",
    blockchain: "XRPL",
    verified: true,
    featured: false,
    previewImages: [
      "/pixel-preview-1.jpg",
      "/pixel-preview-2.jpg",
      "/pixel-preview-3.jpg",
      "/pixel-preview-4.jpg",
      "/pixel-preview-5.jpg",
      "/pixel-preview-6.jpg"
    ],
    traits: [
      { trait_type: "Class", value: "Legendary Mage", rarity_percentage: 2.4 },
      { trait_type: "Weapon", value: "Crystal Staff", rarity_percentage: 6.7 },
      { trait_type: "Level", value: "99", rarity_percentage: 1.2 },
      { trait_type: "Element", value: "Lightning", rarity_percentage: 11.5 }
    ],
    packSizes: {
      "2K": { price: 30000, items: 2000 },
      "5K": { price: 75000, items: 5000 },
      "10K": { price: 120000, items: 7500 }
    },
    downloadableFiles: {
      metadata: "/downloads/pixel-heroes-metadata.json",
      originalImages: ["/downloads/pixel-heroes-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["12x16", "16x20", "20x24"], prices: [25, 35, 45] },
      tshirts: { sizes: ["S", "M", "L", "XL", "XXL"], prices: [19, 19, 19, 21, 23] },
      mugs: { sizes: ["11oz", "15oz"], prices: [15, 18] },
      caps: { sizes: ["One Size"], prices: [17] }
    },
    createdAt: "2024-03-12",
    royalties: 6.5,
    volume24h: 1234.67,
    volumeTotal: 31245.90
  },
  {
    id: "mystic-dragons-fantasy",
    name: "Mystic Dragons",
    description: "Ancient dragons awaken! 5,500 legendary beasts with elemental powers, treasure hoards, and magical abilities from forgotten realms.",
    creator: "Fantasy Forge",
    creatorAvatar: "/creator-fantasy.jpg",
    bannerImage: "/nft-collection-dragons-banner.jpg",
    profileImage: "/nft-collection-dragons-cover.jpg",
    totalSupply: 5500,
    mintedCount: 4321,
    floorPrice: 58.9,
    mintPrice: 42.0,
    launchingFee: 900,
    category: "Fantasy",
    blockchain: "XRPL",
    verified: true,
    featured: true,
    previewImages: [
      "/dragon-preview-1.jpg",
      "/dragon-preview-2.jpg",
      "/dragon-preview-3.jpg",
      "/dragon-preview-4.jpg",
      "/dragon-preview-5.jpg"
    ],
    traits: [
      { trait_type: "Element", value: "Ancient Fire", rarity_percentage: 4.5 },
      { trait_type: "Wings", value: "Crystalline", rarity_percentage: 7.8 },
      { trait_type: "Breath", value: "Plasma Storm", rarity_percentage: 2.1 },
      { trait_type: "Hoard", value: "Legendary Gems", rarity_percentage: 3.6 }
    ],
    packSizes: {
      "2K": { price: 82000, items: 2000 },
      "5K": { price: 200000, items: 5000 },
      "10K": { price: 230000, items: 5500 }
    },
    downloadableFiles: {
      metadata: "/downloads/mystic-dragons-metadata.json",
      originalImages: ["/downloads/mystic-dragons-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["16x20", "20x24", "24x36", "30x40"], prices: [45, 60, 85, 140] },
      tshirts: { sizes: ["S", "M", "L", "XL", "XXL"], prices: [28, 28, 28, 30, 32] },
      mugs: { sizes: ["11oz", "15oz"], prices: [20, 24] },
      caps: { sizes: ["One Size"], prices: [25] }
    },
    createdAt: "2024-01-08",
    royalties: 8.5,
    volume24h: 2890.75,
    volumeTotal: 67432.20
  },
  {
    id: "synthwave-beats-music",
    name: "Synthwave Beats",
    description: "Feel the rhythm! 4,500 animated music visualizers with exclusive synthwave tracks. Each NFT includes high-quality audio and mesmerizing visuals.",
    creator: "Neon Soundscape",
    creatorAvatar: "/creator-synthwave.jpg",
    bannerImage: "/nft-collection-synthwave-banner.jpg",
    profileImage: "/nft-collection-synthwave-cover.jpg",
    totalSupply: 4500,
    mintedCount: 3876,
    floorPrice: 38.4,
    mintPrice: 25.0,
    launchingFee: 650,
    category: "Music",
    blockchain: "XRPL",
    verified: true,
    featured: false,
    previewImages: [
      "/synthwave-preview-1.jpg",
      "/synthwave-preview-2.jpg",
      "/synthwave-preview-3.jpg",
      "/synthwave-preview-4.jpg"
    ],
    traits: [
      { trait_type: "BPM", value: "140", rarity_percentage: 8.9 },
      { trait_type: "Visualizer", value: "Neon Grid", rarity_percentage: 12.4 },
      { trait_type: "Duration", value: "Epic (5+ min)", rarity_percentage: 4.7 },
      { trait_type: "Mood", value: "Cyberpunk Chase", rarity_percentage: 6.2 }
    ],
    packSizes: {
      "2K": { price: 48000, items: 2000 },
      "5K": { price: 112000, items: 4500 },
      "10K": { price: 0, items: 0 }
    },
    downloadableFiles: {
      metadata: "/downloads/synthwave-beats-metadata.json",
      originalImages: ["/downloads/synthwave-beats-images.zip"]
    },
    printOptions: {
      wallArt: { sizes: ["16x20", "20x24", "24x36"], prices: [35, 48, 68] },
      tshirts: { sizes: ["S", "M", "L", "XL"], prices: [24, 24, 24, 26] },
      mugs: { sizes: ["11oz", "15oz"], prices: [17, 21] },
      caps: { sizes: ["One Size"], prices: [21] }
    },
    createdAt: "2024-02-28",
    royalties: 7.0,
    volume24h: 1567.30,
    volumeTotal: 41890.60
  }
]

export default function NFTCollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<NFTCollection | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPackSize, setSelectedPackSize] = useState<"2K" | "5K" | "10K">("2K")
  const [selectedPrintOption, setSelectedPrintOption] = useState<"digital" | "print">("digital")
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [purchaseType, setPurchaseType] = useState<"mint" | "pack">("mint")

  const filteredCollections = mockNFTCollections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || collection.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })



  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <EnhancedHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            NFT Collections Marketplace
          </h1>
          <p className="text-xl mb-8 text-purple-100">
            Discover, collect, and trade exclusive NFT collections on XRPL blockchain
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-purple-200">Collections</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100K+</div>
              <div className="text-purple-200">NFTs</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5K+</div>
              <div className="text-purple-200">Collectors</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search collections, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="animals">Animals</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="music">Music</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Collections Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <Image
                  src={collection.bannerImage}
                  alt={collection.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {collection.verified && (
                  <Badge className="absolute top-2 left-2 bg-blue-500">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {collection.featured && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {collection.creator}</p>
                  </div>
                  <Image
                    src={collection.profileImage}
                    alt={collection.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {collection.description}
                </p>

                {/* Preview Images */}
                <div className="grid grid-cols-6 gap-1 mb-4">
                  {collection.previewImages.slice(0, 6).map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover aspect-square hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Floor Price</div>
                    <div className="font-bold text-lg">{collection.floorPrice} XRP</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Mint Price</div>
                    <div className="font-bold text-lg text-green-600">{collection.mintPrice} XRP</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Supply</div>
                    <div className="font-semibold">{collection.mintedCount.toLocaleString()} / {collection.totalSupply.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">24h Volume</div>
                    <div className="font-semibold">{collection.volume24h.toLocaleString()} XRP</div>
                  </div>
                </div>

                {/* Traits Preview */}
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Top Traits:</div>
                  <div className="flex flex-wrap gap-1">
                    {collection.traits.slice(0, 3).map((trait, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {trait.trait_type}: {trait.value} ({trait.rarity_percentage}%)
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pack Sizes */}
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Collection Packs:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(collection.packSizes).map(([size, pack]) => (
                      pack.items > 0 && (
                        <div key={size} className="text-center p-2 border rounded">
                          <div className="font-bold text-sm">{size}</div>
                          <div className="text-xs text-muted-foreground">{pack.price.toLocaleString()} XRP</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedCollection(collection)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={() => setSelectedCollection(collection)}
                     >
                       <Download className="h-4 w-4 mr-1" />
                       Downloads
                     </Button>
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={() => setSelectedCollection(collection)}
                     >
                       <Printer className="h-4 w-4 mr-1" />
                       Print
                     </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collection Detail Modal */}
        {selectedCollection && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedCollection.name}</h2>
                    <p className="text-muted-foreground">by {selectedCollection.creator}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedCollection(null)}
                  >
                    ×
                  </Button>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="traits">Traits</TabsTrigger>
                    <TabsTrigger value="packs">Collection Packs</TabsTrigger>
                    <TabsTrigger value="downloads">Downloads</TabsTrigger>
                    <TabsTrigger value="print">Print Options</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <Image
                          src={selectedCollection.bannerImage}
                          alt={selectedCollection.name}
                          width={500}
                          height={300}
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <p>{selectedCollection.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{selectedCollection.mintPrice} XRP</div>
                            <div className="text-sm text-muted-foreground">Mint Price</div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="text-2xl font-bold">{selectedCollection.floorPrice} XRP</div>
                            <div className="text-sm text-muted-foreground">Floor Price</div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="text-2xl font-bold">{selectedCollection.launchingFee} XRP</div>
                            <div className="text-sm text-muted-foreground">Launching Fee</div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="text-2xl font-bold">{selectedCollection.royalties}%</div>
                            <div className="text-sm text-muted-foreground">Royalties</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            className="w-full" 
                            size="lg"
                            onClick={() => {
                              setPurchaseType("mint")
                              setShowPurchaseModal(true)
                            }}
                          >
                            <Wallet className="h-4 w-4 mr-2" />
                            Connect XUMM Wallet to Mint
                          </Button>
                          <div className="text-sm text-muted-foreground">
                             Use the Downloads tab above for complete file access and print options.
                           </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="traits" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedCollection.traits.map((trait, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="text-sm text-muted-foreground">{trait.trait_type}</div>
                            <div className="font-semibold">{trait.value}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Rarity: {trait.rarity_percentage}%
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${100 - trait.rarity_percentage}%` }}
                              ></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="packs" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(selectedCollection.packSizes).map(([size, pack]) => (
                        pack.items > 0 && (
                          <Card key={size} className={`cursor-pointer transition-all ${
                            selectedPackSize === size ? 'ring-2 ring-primary' : ''
                          }`} onClick={() => setSelectedPackSize(size as "2K" | "5K" | "10K")}>
                            <CardHeader>
                              <CardTitle className="text-center">
                                {size} Collection Pack
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-4">
                              <div className="text-3xl font-bold text-primary">
                                {pack.price.toLocaleString()} XRP
                              </div>
                              <div className="text-muted-foreground">
                                {pack.items.toLocaleString()} NFTs included
                              </div>
                              <div className="text-sm text-green-600">
                                Save {Math.round((1 - (pack.price / (pack.items * selectedCollection.mintPrice))) * 100)}%
                              </div>
                              <Button className="w-full" disabled={selectedPackSize !== size}>
                                <Package className="h-4 w-4 mr-2" />
                                {selectedPackSize === size ? 'Selected' : 'Select Pack'}
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      ))}
                    </div>
                    
                    {selectedPackSize && selectedCollection.packSizes[selectedPackSize].items > 0 && (
                      <Card className="mt-6">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4">Purchase {selectedPackSize} Collection Pack</h3>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-muted-foreground">Pack Size</div>
                              <div className="font-semibold">{selectedCollection.packSizes[selectedPackSize].items.toLocaleString()} NFTs</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Total Price</div>
                              <div className="font-semibold text-lg">{selectedCollection.packSizes[selectedPackSize].price.toLocaleString()} XRP</div>
                            </div>
                          </div>
                          <Button 
                            className="w-full" 
                            size="lg"
                            onClick={() => {
                              setPurchaseType("pack")
                              setShowPurchaseModal(true)
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Purchase with XUMM Wallet
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="downloads" className="space-y-4">
                    <DownloadUtility
                      itemId={selectedCollection.id}
                      itemName={selectedCollection.name}
                      itemType="nft"
                      printOptions={[]}
                      downloadFiles={[
                        {
                          id: "metadata",
                          name: "Collection Metadata",
                          type: "metadata",
                          format: "json",
                          size: "2.5 MB",
                          url: selectedCollection.downloadableFiles.metadata,
                          description: "Complete NFT metadata with traits and attributes"
                        },
                        {
                          id: "images-hd",
                          name: "High Resolution Images",
                          type: "images",
                          format: "zip",
                          size: "450 MB",
                          url: selectedCollection.downloadableFiles.originalImages[0],
                          description: "4K PNG files with transparent backgrounds"
                        },
                        {
                          id: "license",
                          name: "Commercial License",
                          type: "license",
                          format: "pdf",
                          size: "125 KB",
                          url: "/downloads/commercial-license.pdf",
                          description: "Full commercial usage rights documentation"
                        },
                        {
                          id: "certificate",
                          name: "Authenticity Certificate",
                          type: "certificate",
                          format: "pdf",
                          size: "89 KB",
                          url: "/downloads/authenticity-certificate.pdf",
                          description: "Blockchain verification and ownership certificate",
                          premium: true
                        }
                      ]}
                      isPremium={true}
                    />
                  </TabsContent>

                  <TabsContent value="print" className="space-y-4">
                    <div className="mb-4">
                      <div className="flex space-x-4 mb-4">
                        <Button 
                          variant={selectedPrintOption === "digital" ? "default" : "outline"}
                          onClick={() => setSelectedPrintOption("digital")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Digital Download
                        </Button>
                        <Button 
                          variant={selectedPrintOption === "print" ? "default" : "outline"}
                          onClick={() => setSelectedPrintOption("print")}
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print on Demand
                        </Button>
                      </div>
                    </div>

                    {selectedPrintOption === "digital" && (
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4">Digital Files Available</h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div className="text-sm">
                                  <div className="font-medium text-blue-900">Digital Files Available</div>
                                  <div className="text-blue-700 mt-1">
                                    All original images and metadata files are available in the Downloads tab above. 
                                    Includes 4K PNG files and complete trait data with commercial license.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {selectedPrintOption === "print" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Wall Art */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Frame className="h-5 w-5 mr-2" />
                              Wall Art Prints
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedCollection.printOptions.wallArt.sizes.map((size, index) => (
                                <div key={size} className="flex justify-between items-center p-3 border rounded">
                                  <span>{size} inches</span>
                                  <span className="font-semibold">${selectedCollection.printOptions.wallArt.prices[index]}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* T-Shirts */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Shirt className="h-5 w-5 mr-2" />
                              T-Shirt Prints
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedCollection.printOptions.tshirts.sizes.map((size, index) => (
                                <div key={size} className="flex justify-between items-center p-3 border rounded">
                                  <span>Size {size}</span>
                                  <span className="font-semibold">${selectedCollection.printOptions.tshirts.prices[index]}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Mugs */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Coffee className="h-5 w-5 mr-2" />
                              Coffee Mugs
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedCollection.printOptions.mugs.sizes.map((size, index) => (
                                <div key={size} className="flex justify-between items-center p-3 border rounded">
                                  <span>{size}</span>
                                  <span className="font-semibold">${selectedCollection.printOptions.mugs.prices[index]}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Caps */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Crown className="h-5 w-5 mr-2" />
                              Caps & Hats
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {selectedCollection.printOptions.caps.sizes.map((size, index) => (
                                <div key={size} className="flex justify-between items-center p-3 border rounded">
                                  <span>{size}</span>
                                  <span className="font-semibold">${selectedCollection.printOptions.caps.prices[index]}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedCollection && (
        <DirectPurchaseModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          product={{
            id: selectedCollection.id,
            title: purchaseType === "mint" ? `${selectedCollection.name} NFT` : `${selectedCollection.name} ${selectedPackSize} Pack`,
            artist: selectedCollection.creator,
            price: purchaseType === "mint" ? selectedCollection.mintPrice : selectedCollection.packSizes[selectedPackSize].price,
            currency: "XRP",
            image: selectedCollection.previewImages[0],
            category: selectedCollection.category,
            type: "nft"
          }}
          selectedOptions={{
            quantity: purchaseType === "mint" ? 1 : selectedCollection.packSizes[selectedPackSize].items,
            format: purchaseType === "pack" ? `${selectedPackSize} Collection Pack` : "Single NFT Mint"
          }}
        />
      )}

      <FloatingActionMenu />
    </div>
  )
}