"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Frame, Shirt, Coffee, Crown, Package, Palette, Search, Filter, Star, Truck, Shield, Clock } from "lucide-react"
import Image from "next/image"
import { DirectPurchaseModal } from "@/components/direct-purchase-modal"

interface PrintProduct {
  id: string
  name: string
  category: "wall-art" | "apparel" | "home-decor" | "accessories"
  description: string
  basePrice: number
  image: string
  sizes: {
    name: string
    dimensions?: string
    price: number
    popular?: boolean
  }[]
  materials?: {
    name: string
    description: string
    priceMultiplier: number
    premium?: boolean
  }[]
  features: string[]
  estimatedDelivery: string
  rating: number
  reviewCount: number
}

const printProducts: PrintProduct[] = [
  {
    id: "canvas-wall-art",
    name: "Canvas Wall Art",
    category: "wall-art",
    description: "Premium gallery-wrapped canvas prints with vibrant colors and museum-quality materials",
    basePrice: 0.035,
    image: "/placeholder.jpg",
    sizes: [
      { name: "8x10 inches", dimensions: "8 x 10 in", price: 0.035 },
      { name: "11x14 inches", dimensions: "11 x 14 in", price: 0.045, popular: true },
      { name: "16x20 inches", dimensions: "16 x 20 in", price: 0.065 },
      { name: "20x24 inches", dimensions: "20 x 24 in", price: 0.085 },
      { name: "24x36 inches", dimensions: "24 x 36 in", price: 0.120 },
      { name: "30x40 inches", dimensions: "30 x 40 in", price: 0.180 }
    ],
    materials: [
      { name: "Standard Canvas", description: "Cotton blend, matte finish", priceMultiplier: 1.0 },
      { name: "Premium Canvas", description: "100% cotton, archival quality", priceMultiplier: 1.3, premium: true },
      { name: "Fine Art Paper", description: "Museum-grade paper", priceMultiplier: 1.1 },
      { name: "Metal Print", description: "Aluminum with vibrant colors", priceMultiplier: 2.0, premium: true }
    ],
    features: ["Gallery wrapped", "Ready to hang", "Fade resistant", "30-day guarantee"],
    estimatedDelivery: "5-7 business days",
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: "premium-tshirts",
    name: "Premium T-Shirts",
    category: "apparel",
    description: "100% organic cotton t-shirts with eco-friendly printing and comfortable fit",
    basePrice: 0.025,
    image: "/placeholder.jpg",
    sizes: [
      { name: "XS", price: 0.025 },
      { name: "S", price: 0.025 },
      { name: "M", price: 0.025, popular: true },
      { name: "L", price: 0.025, popular: true },
      { name: "XL", price: 0.028 },
      { name: "XXL", price: 0.030 },
      { name: "XXXL", price: 0.032 }
    ],
    materials: [
      { name: "Organic Cotton", description: "Soft, breathable, eco-friendly", priceMultiplier: 1.0 },
      { name: "Cotton Blend", description: "Durable, wrinkle-resistant", priceMultiplier: 0.9 },
      { name: "Premium Tri-Blend", description: "Ultra-soft, vintage feel", priceMultiplier: 1.2, premium: true }
    ],
    features: ["Pre-shrunk", "Double-stitched", "Tagless comfort", "Machine washable"],
    estimatedDelivery: "7-10 business days",
    rating: 4.7,
    reviewCount: 892
  },
  {
    id: "ceramic-mugs",
    name: "Ceramic Coffee Mugs",
    category: "home-decor",
    description: "High-quality ceramic mugs with vibrant, dishwasher-safe prints perfect for daily use",
    basePrice: 0.018,
    image: "/placeholder.jpg",
    sizes: [
      { name: "11oz Standard", dimensions: "3.8 x 3.2 in", price: 0.018, popular: true },
      { name: "15oz Large", dimensions: "4.5 x 3.7 in", price: 0.022 },
      { name: "20oz Travel Mug", dimensions: "6.8 x 3.5 in", price: 0.032 }
    ],
    materials: [
      { name: "Standard Ceramic", description: "Durable, microwave safe", priceMultiplier: 1.0 },
      { name: "Premium Ceramic", description: "Extra thick, chip resistant", priceMultiplier: 1.3, premium: true },
      { name: "Stainless Steel", description: "Insulated, travel-friendly", priceMultiplier: 1.8, premium: true }
    ],
    features: ["Dishwasher safe", "Microwave safe", "Scratch resistant", "Comfortable handle"],
    estimatedDelivery: "5-7 business days",
    rating: 4.6,
    reviewCount: 634
  },
  {
    id: "custom-caps",
    name: "Custom Caps & Hats",
    category: "accessories",
    description: "Stylish caps and hats with embroidered or printed designs, adjustable for perfect fit",
    basePrice: 0.022,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Adjustable Cap", price: 0.022, popular: true },
      { name: "Fitted S/M", price: 0.025 },
      { name: "Fitted L/XL", price: 0.025 },
      { name: "Snapback", price: 0.028 },
      { name: "Beanie", price: 0.020 }
    ],
    materials: [
      { name: "Cotton Twill", description: "Classic, breathable", priceMultiplier: 1.0 },
      { name: "Performance Mesh", description: "Moisture-wicking, athletic", priceMultiplier: 1.2 },
      { name: "Premium Wool", description: "Luxury feel, winter-ready", priceMultiplier: 1.5, premium: true }
    ],
    features: ["Adjustable strap", "Curved brim", "Embroidered design", "One size fits most"],
    estimatedDelivery: "7-10 business days",
    rating: 4.5,
    reviewCount: 423
  },
  {
    id: "poster-prints",
    name: "Poster Prints",
    category: "wall-art",
    description: "High-quality paper posters perfect for dorms, offices, and casual spaces",
    basePrice: 0.015,
    image: "/placeholder.jpg",
    sizes: [
      { name: "12x18 inches", dimensions: "12 x 18 in", price: 0.015 },
      { name: "18x24 inches", dimensions: "18 x 24 in", price: 0.022, popular: true },
      { name: "24x36 inches", dimensions: "24 x 36 in", price: 0.035 },
      { name: "27x40 inches", dimensions: "27 x 40 in", price: 0.045 }
    ],
    materials: [
      { name: "Matte Paper", description: "No glare, classic look", priceMultiplier: 1.0 },
      { name: "Glossy Paper", description: "Vibrant colors, photo-like", priceMultiplier: 1.1 },
      { name: "Canvas Paper", description: "Textured, artistic feel", priceMultiplier: 1.3, premium: true }
    ],
    features: ["High resolution", "Fade resistant", "Easy to frame", "Affordable pricing"],
    estimatedDelivery: "3-5 business days",
    rating: 4.4,
    reviewCount: 756
  },
  {
    id: "hoodies-sweatshirts",
    name: "Hoodies & Sweatshirts",
    category: "apparel",
    description: "Cozy hoodies and sweatshirts with soft fleece lining and custom artwork",
    basePrice: 0.045,
    image: "/placeholder.jpg",
    sizes: [
      { name: "XS", price: 0.045 },
      { name: "S", price: 0.045 },
      { name: "M", price: 0.045, popular: true },
      { name: "L", price: 0.045, popular: true },
      { name: "XL", price: 0.048 },
      { name: "XXL", price: 0.052 }
    ],
    materials: [
      { name: "Cotton Blend", description: "Soft, comfortable", priceMultiplier: 1.0 },
      { name: "Premium Fleece", description: "Extra warm, plush interior", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Kangaroo pocket", "Drawstring hood", "Ribbed cuffs", "Machine washable"],
    estimatedDelivery: "7-10 business days",
    rating: 4.7,
    reviewCount: 512
  },
  {
    id: "phone-cases",
    name: "Custom Phone Cases",
    category: "accessories",
    description: "Protective phone cases with vibrant custom designs for all major phone models",
    basePrice: 0.020,
    image: "/placeholder.jpg",
    sizes: [
      { name: "iPhone 15", price: 0.020, popular: true },
      { name: "iPhone 14", price: 0.020 },
      { name: "Samsung Galaxy S24", price: 0.022 },
      { name: "Google Pixel 8", price: 0.021 }
    ],
    materials: [
      { name: "Silicone", description: "Flexible, shock-absorbing", priceMultiplier: 1.0 },
      { name: "Hard Plastic", description: "Durable, lightweight", priceMultiplier: 1.1 },
      { name: "Premium Leather", description: "Luxury feel, wallet style", priceMultiplier: 1.8, premium: true }
    ],
    features: ["Drop protection", "Wireless charging compatible", "Precise cutouts", "Easy grip"],
    estimatedDelivery: "5-7 business days",
    rating: 4.5,
    reviewCount: 789
  },
  {
    id: "tote-bags",
    name: "Canvas Tote Bags",
    category: "accessories",
    description: "Eco-friendly canvas tote bags perfect for shopping and daily use",
    basePrice: 0.018,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 15x16 inches", price: 0.018, popular: true },
      { name: "Large 18x20 inches", price: 0.025 },
      { name: "Mini 12x12 inches", price: 0.015 }
    ],
    materials: [
      { name: "Cotton Canvas", description: "Natural, durable", priceMultiplier: 1.0 },
      { name: "Organic Cotton", description: "Eco-friendly, soft", priceMultiplier: 1.2, premium: true }
    ],
    features: ["Reinforced handles", "Machine washable", "Eco-friendly", "Large capacity"],
    estimatedDelivery: "5-7 business days",
    rating: 4.6,
    reviewCount: 456
  },
  {
    id: "laptop-sleeves",
    name: "Laptop Sleeves",
    category: "accessories",
    description: "Padded laptop sleeves with custom artwork for protection and style",
    basePrice: 0.028,
    image: "/placeholder.jpg",
    sizes: [
      { name: "13 inch", price: 0.028, popular: true },
      { name: "15 inch", price: 0.032 },
      { name: "17 inch", price: 0.038 }
    ],
    materials: [
      { name: "Neoprene", description: "Water-resistant, padded", priceMultiplier: 1.0 },
      { name: "Premium Leather", description: "Luxury, professional", priceMultiplier: 1.6, premium: true }
    ],
    features: ["Padded protection", "Water-resistant", "Slim profile", "Easy access"],
    estimatedDelivery: "7-10 business days",
    rating: 4.7,
    reviewCount: 234
  },
  {
    id: "mouse-pads",
    name: "Gaming Mouse Pads",
    category: "accessories",
    description: "High-precision gaming mouse pads with custom designs and smooth surface",
    basePrice: 0.012,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 9x8 inches", price: 0.012 },
      { name: "Large 12x10 inches", price: 0.018, popular: true },
      { name: "XL 15x12 inches", price: 0.025 }
    ],
    materials: [
      { name: "Rubber Base", description: "Non-slip, durable", priceMultiplier: 1.0 },
      { name: "Premium Fabric", description: "Smooth glide, washable", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Non-slip base", "Smooth surface", "Stitched edges", "Machine washable"],
    estimatedDelivery: "3-5 business days",
    rating: 4.4,
    reviewCount: 567
  },
  {
    id: "stickers",
    name: "Vinyl Stickers",
    category: "accessories",
    description: "Waterproof vinyl stickers perfect for laptops, water bottles, and more",
    basePrice: 0.005,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small 2x2 inches", price: 0.005, popular: true },
      { name: "Medium 4x4 inches", price: 0.008 },
      { name: "Large 6x6 inches", price: 0.012 },
      { name: "Pack of 10", price: 0.035 }
    ],
    materials: [
      { name: "Standard Vinyl", description: "Waterproof, removable", priceMultiplier: 1.0 },
      { name: "Premium Vinyl", description: "Extra durable, UV resistant", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Waterproof", "UV resistant", "Easy application", "Removable"],
    estimatedDelivery: "3-5 business days",
    rating: 4.3,
    reviewCount: 892
  },
  {
    id: "pillows",
    name: "Throw Pillows",
    category: "home-decor",
    description: "Comfortable throw pillows with beautiful custom designs for home decoration",
    basePrice: 0.025,
    image: "/placeholder.jpg",
    sizes: [
      { name: "16x16 inches", price: 0.025, popular: true },
      { name: "18x18 inches", price: 0.030 },
      { name: "20x20 inches", price: 0.035 }
    ],
    materials: [
      { name: "Polyester Fill", description: "Soft, hypoallergenic", priceMultiplier: 1.0 },
      { name: "Memory Foam", description: "Supportive, premium comfort", priceMultiplier: 1.5, premium: true }
    ],
    features: ["Machine washable cover", "Hidden zipper", "Fade resistant", "Hypoallergenic"],
    estimatedDelivery: "7-10 business days",
    rating: 4.6,
    reviewCount: 345
  },
  {
    id: "coasters",
    name: "Ceramic Coasters",
    category: "home-decor",
    description: "Absorbent ceramic coasters with custom designs to protect your furniture",
    basePrice: 0.015,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 4x4 inches", price: 0.015, popular: true },
      { name: "Set of 4", price: 0.045 },
      { name: "Set of 6", price: 0.065 }
    ],
    materials: [
      { name: "Ceramic", description: "Absorbent, durable", priceMultiplier: 1.0 },
      { name: "Cork Back", description: "Non-slip, protective", priceMultiplier: 1.2, premium: true }
    ],
    features: ["Absorbent surface", "Heat resistant", "Easy to clean", "Non-slip base"],
    estimatedDelivery: "5-7 business days",
    rating: 4.4,
    reviewCount: 278
  },
  {
    id: "keychains",
    name: "Acrylic Keychains",
    category: "accessories",
    description: "Durable acrylic keychains with vibrant custom designs and sturdy rings",
    basePrice: 0.008,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small 2x2 inches", price: 0.008, popular: true },
      { name: "Medium 3x3 inches", price: 0.012 },
      { name: "Large 4x4 inches", price: 0.018 }
    ],
    materials: [
      { name: "Clear Acrylic", description: "Transparent, lightweight", priceMultiplier: 1.0 },
      { name: "Colored Acrylic", description: "Vibrant, opaque", priceMultiplier: 1.1 },
      { name: "Premium Metal", description: "Durable, professional", priceMultiplier: 1.8, premium: true }
    ],
    features: ["Durable material", "Vibrant colors", "Strong key ring", "Lightweight"],
    estimatedDelivery: "3-5 business days",
    rating: 4.2,
    reviewCount: 634
  },
  {
    id: "magnets",
    name: "Fridge Magnets",
    category: "home-decor",
    description: "Strong refrigerator magnets with custom artwork perfect for home decoration",
    basePrice: 0.006,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small 2x2 inches", price: 0.006 },
      { name: "Medium 3x3 inches", price: 0.010, popular: true },
      { name: "Large 4x4 inches", price: 0.015 },
      { name: "Set of 6", price: 0.035 }
    ],
    materials: [
      { name: "Paper Laminated", description: "Affordable, colorful", priceMultiplier: 1.0 },
      { name: "Vinyl", description: "Waterproof, durable", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Strong magnetic hold", "Fade resistant", "Easy to clean", "Vibrant colors"],
    estimatedDelivery: "3-5 business days",
    rating: 4.1,
    reviewCount: 445
  },
  {
    id: "bookmarks",
    name: "Custom Bookmarks",
    category: "accessories",
    description: "Beautiful custom bookmarks with tassel and protective lamination",
    basePrice: 0.004,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 2x6 inches", price: 0.004, popular: true },
      { name: "Large 3x8 inches", price: 0.007 },
      { name: "Set of 5", price: 0.018 }
    ],
    materials: [
      { name: "Cardstock", description: "Sturdy, affordable", priceMultiplier: 1.0 },
      { name: "Laminated", description: "Water-resistant, durable", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Decorative tassel", "Laminated finish", "Rounded corners", "Fade resistant"],
    estimatedDelivery: "3-5 business days",
    rating: 4.3,
    reviewCount: 189
  },
  {
    id: "calendars",
    name: "Wall Calendars",
    category: "home-decor",
    description: "12-month wall calendars featuring your custom artwork for each month",
    basePrice: 0.035,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 11x8.5 inches", price: 0.035, popular: true },
      { name: "Large 12x12 inches", price: 0.045 },
      { name: "XL 16x20 inches", price: 0.065 }
    ],
    materials: [
      { name: "Glossy Paper", description: "Vibrant colors, smooth finish", priceMultiplier: 1.0 },
      { name: "Matte Paper", description: "Premium feel, no glare", priceMultiplier: 1.2, premium: true }
    ],
    features: ["12 custom pages", "Spiral binding", "High-quality printing", "Durable paper"],
    estimatedDelivery: "7-10 business days",
    rating: 4.5,
    reviewCount: 156
  },
  {
    id: "notebooks",
    name: "Custom Notebooks",
    category: "accessories",
    description: "Spiral-bound notebooks with custom cover designs and quality paper",
    basePrice: 0.022,
    image: "/placeholder.jpg",
    sizes: [
      { name: "A5 5.8x8.3 inches", price: 0.022, popular: true },
      { name: "A4 8.3x11.7 inches", price: 0.032 },
      { name: "Pocket 3.5x5.5 inches", price: 0.018 }
    ],
    materials: [
      { name: "Standard Paper", description: "70gsm, smooth writing", priceMultiplier: 1.0 },
      { name: "Premium Paper", description: "90gsm, extra smooth", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Spiral binding", "100 pages", "Perforated pages", "Durable cover"],
    estimatedDelivery: "5-7 business days",
    rating: 4.4,
    reviewCount: 367
  },
  {
    id: "water-bottles",
    name: "Insulated Water Bottles",
    category: "accessories",
    description: "Double-wall insulated water bottles with custom designs that keep drinks cold or hot",
    basePrice: 0.045,
    image: "/placeholder.jpg",
    sizes: [
      { name: "16 oz", price: 0.045, popular: true },
      { name: "20 oz", price: 0.055 },
      { name: "32 oz", price: 0.075 }
    ],
    materials: [
      { name: "Stainless Steel", description: "Durable, rust-resistant", priceMultiplier: 1.0 },
      { name: "Premium Steel", description: "Extra insulation, premium finish", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Double-wall insulation", "Leak-proof cap", "BPA-free", "24-hour temperature retention"],
    estimatedDelivery: "7-10 business days",
    rating: 4.7,
    reviewCount: 523
  },
  {
    id: "aprons",
    name: "Kitchen Aprons",
    category: "apparel",
    description: "Adjustable kitchen aprons with custom designs perfect for cooking and crafting",
    basePrice: 0.028,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Adult One Size", price: 0.028, popular: true },
      { name: "Child Size", price: 0.022 },
      { name: "XL Adult", price: 0.035 }
    ],
    materials: [
      { name: "Cotton Blend", description: "Comfortable, machine washable", priceMultiplier: 1.0 },
      { name: "Premium Canvas", description: "Heavy-duty, stain-resistant", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Adjustable neck strap", "Large front pocket", "Machine washable", "Fade resistant"],
    estimatedDelivery: "5-7 business days",
    rating: 4.5,
    reviewCount: 298
  },
  {
    id: "placemats",
    name: "Custom Placemats",
    category: "home-decor",
    description: "Wipeable placemats with beautiful custom designs for dining table protection",
    basePrice: 0.018,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 12x18 inches", price: 0.018, popular: true },
      { name: "Large 14x20 inches", price: 0.025 },
      { name: "Set of 4", price: 0.065 }
    ],
    materials: [
      { name: "Vinyl", description: "Wipeable, durable", priceMultiplier: 1.0 },
      { name: "Premium Fabric", description: "Soft touch, washable", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Easy to clean", "Heat resistant", "Non-slip backing", "Fade resistant"],
    estimatedDelivery: "5-7 business days",
    rating: 4.3,
    reviewCount: 187
  },
  {
    id: "desk-mats",
    name: "Desk Mats",
    category: "accessories",
    description: "Large desk mats with custom artwork perfect for office and gaming setups",
    basePrice: 0.038,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Medium 24x12 inches", price: 0.038, popular: true },
      { name: "Large 36x18 inches", price: 0.055 },
      { name: "XL 48x24 inches", price: 0.085 }
    ],
    materials: [
      { name: "Rubber Base", description: "Non-slip, durable", priceMultiplier: 1.0 },
      { name: "Premium Fabric", description: "Smooth surface, stitched edges", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Non-slip base", "Stitched edges", "Water-resistant", "Large workspace"],
    estimatedDelivery: "7-10 business days",
    rating: 4.6,
    reviewCount: 412
  },
  {
    id: "wall-clocks",
    name: "Wall Clocks",
    category: "home-decor",
    description: "Silent wall clocks with custom face designs and reliable quartz movement",
    basePrice: 0.055,
    image: "/placeholder.jpg",
    sizes: [
      { name: "10 inch diameter", price: 0.055, popular: true },
      { name: "12 inch diameter", price: 0.075 },
      { name: "14 inch diameter", price: 0.095 }
    ],
    materials: [
      { name: "Plastic Frame", description: "Lightweight, affordable", priceMultiplier: 1.0 },
      { name: "Wood Frame", description: "Premium look, durable", priceMultiplier: 1.5, premium: true }
    ],
    features: ["Silent movement", "Easy to hang", "Battery included", "Accurate timekeeping"],
    estimatedDelivery: "7-10 business days",
    rating: 4.4,
    reviewCount: 234
  },
  {
    id: "garden-flags",
    name: "Garden Flags",
    category: "home-decor",
    description: "Weather-resistant garden flags with vibrant custom designs for outdoor decoration",
    basePrice: 0.025,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 12x18 inches", price: 0.025, popular: true },
      { name: "Large 18x24 inches", price: 0.038 },
      { name: "Mini 8x12 inches", price: 0.018 }
    ],
    materials: [
      { name: "Polyester", description: "Weather-resistant, lightweight", priceMultiplier: 1.0 },
      { name: "Premium Canvas", description: "Heavy-duty, fade-resistant", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Weather-resistant", "Double-sided printing", "Pole sleeve", "Fade-resistant"],
    estimatedDelivery: "5-7 business days",
    rating: 4.2,
    reviewCount: 156
  },
  {
    id: "car-decals",
    name: "Car Decals",
    category: "accessories",
    description: "Weatherproof vinyl car decals with custom designs for vehicle personalization",
    basePrice: 0.015,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small 4x4 inches", price: 0.015, popular: true },
      { name: "Medium 6x6 inches", price: 0.025 },
      { name: "Large 8x8 inches", price: 0.038 },
      { name: "XL 12x12 inches", price: 0.065 }
    ],
    materials: [
      { name: "Standard Vinyl", description: "Durable, removable", priceMultiplier: 1.0 },
      { name: "Premium Vinyl", description: "Extra durable, UV resistant", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Weatherproof", "UV resistant", "Easy application", "Removable adhesive"],
    estimatedDelivery: "3-5 business days",
    rating: 4.3,
    reviewCount: 389
  },
  {
    id: "pet-accessories",
    name: "Pet Bandanas",
    category: "accessories",
    description: "Comfortable pet bandanas with custom designs perfect for dogs and cats",
    basePrice: 0.018,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small (Cats/Small Dogs)", price: 0.018 },
      { name: "Medium (Medium Dogs)", price: 0.022, popular: true },
      { name: "Large (Large Dogs)", price: 0.028 }
    ],
    materials: [
      { name: "Cotton", description: "Soft, breathable", priceMultiplier: 1.0 },
      { name: "Premium Cotton", description: "Extra soft, organic", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Adjustable fit", "Machine washable", "Soft fabric", "Secure closure"],
    estimatedDelivery: "5-7 business days",
    rating: 4.5,
    reviewCount: 267
  },
  {
    id: "yoga-mats",
    name: "Yoga Mats",
    category: "accessories",
    description: "Non-slip yoga mats with custom designs for meditation and exercise",
    basePrice: 0.065,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 68x24 inches", price: 0.065, popular: true },
      { name: "Extra Long 72x24 inches", price: 0.085 },
      { name: "Wide 68x30 inches", price: 0.095 }
    ],
    materials: [
      { name: "PVC", description: "Durable, easy to clean", priceMultiplier: 1.0 },
      { name: "Natural Rubber", description: "Eco-friendly, superior grip", priceMultiplier: 1.5, premium: true }
    ],
    features: ["Non-slip surface", "Lightweight", "Easy to clean", "Carrying strap included"],
    estimatedDelivery: "7-10 business days",
    rating: 4.6,
    reviewCount: 445
  },
  {
    id: "beach-towels",
    name: "Beach Towels",
    category: "apparel",
    description: "Large absorbent beach towels with vibrant custom designs perfect for beach and pool",
    basePrice: 0.048,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 30x60 inches", price: 0.048, popular: true },
      { name: "Large 36x72 inches", price: 0.065 },
      { name: "XL 40x80 inches", price: 0.085 }
    ],
    materials: [
      { name: "Cotton Terry", description: "Absorbent, soft", priceMultiplier: 1.0 },
      { name: "Premium Cotton", description: "Extra absorbent, luxury feel", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Quick-dry", "Sand-resistant", "Fade-resistant", "Machine washable"],
    estimatedDelivery: "7-10 business days",
    rating: 4.5,
    reviewCount: 378
  },
  {
    id: "cutting-boards",
    name: "Bamboo Cutting Boards",
    category: "home-decor",
    description: "Eco-friendly bamboo cutting boards with custom engraved designs",
    basePrice: 0.035,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small 8x10 inches", price: 0.035 },
      { name: "Medium 10x14 inches", price: 0.048, popular: true },
      { name: "Large 12x18 inches", price: 0.065 }
    ],
    materials: [
      { name: "Bamboo", description: "Eco-friendly, antimicrobial", priceMultiplier: 1.0 },
      { name: "Premium Bamboo", description: "Extra thick, oil-finished", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Antimicrobial surface", "Knife-friendly", "Easy to clean", "Sustainable material"],
    estimatedDelivery: "7-10 business days",
    rating: 4.7,
    reviewCount: 289
  },
  {
    id: "wine-glasses",
    name: "Custom Wine Glasses",
    category: "home-decor",
    description: "Elegant wine glasses with custom etched designs perfect for special occasions",
    basePrice: 0.028,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 12 oz", price: 0.028, popular: true },
      { name: "Large 16 oz", price: 0.035 },
      { name: "Set of 2", price: 0.055 },
      { name: "Set of 4", price: 0.095 }
    ],
    materials: [
      { name: "Standard Glass", description: "Clear, durable", priceMultiplier: 1.0 },
      { name: "Crystal Glass", description: "Premium clarity, elegant", priceMultiplier: 1.6, premium: true }
    ],
    features: ["Dishwasher safe", "Lead-free glass", "Elegant design", "Perfect weight balance"],
    estimatedDelivery: "7-10 business days",
    rating: 4.6,
    reviewCount: 234
  },
  {
    id: "phone-stands",
    name: "Phone Stands",
    category: "accessories",
    description: "Adjustable phone stands with custom designs for desk and bedside use",
    basePrice: 0.022,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard Adjustable", price: 0.022, popular: true },
      { name: "Foldable Travel", price: 0.018 },
      { name: "Premium Metal", price: 0.038 }
    ],
    materials: [
      { name: "Plastic", description: "Lightweight, colorful", priceMultiplier: 1.0 },
      { name: "Bamboo", description: "Eco-friendly, natural", priceMultiplier: 1.3 },
      { name: "Aluminum", description: "Premium, durable", priceMultiplier: 1.7, premium: true }
    ],
    features: ["Adjustable angle", "Non-slip base", "Universal compatibility", "Compact design"],
    estimatedDelivery: "5-7 business days",
    rating: 4.4,
    reviewCount: 567
  },
  {
    id: "greeting-cards",
    name: "Greeting Cards",
    category: "accessories",
    description: "Premium greeting cards with custom designs perfect for any occasion",
    basePrice: 0.008,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Standard 5x7 inches", price: 0.008, popular: true },
      { name: "Large 6x9 inches", price: 0.012 },
      { name: "Square 5x5 inches", price: 0.008 },
      { name: "Pack of 10", price: 0.065 }
    ],
    materials: [
      { name: "Cardstock", description: "Sturdy, matte finish", priceMultiplier: 1.0 },
      { name: "Premium Paper", description: "Textured, luxury feel", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Blank inside", "Envelope included", "High-quality printing", "Rounded corners"],
    estimatedDelivery: "3-5 business days",
    rating: 4.3,
    reviewCount: 445
  },
  {
    id: "laptop-stickers",
    name: "Laptop Sticker Packs",
    category: "accessories",
    description: "Waterproof laptop sticker packs with multiple custom designs",
    basePrice: 0.025,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Pack of 10", price: 0.025, popular: true },
      { name: "Pack of 20", price: 0.045 },
      { name: "Pack of 50", price: 0.095 }
    ],
    materials: [
      { name: "Vinyl", description: "Waterproof, removable", priceMultiplier: 1.0 },
      { name: "Premium Vinyl", description: "Extra durable, UV resistant", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Waterproof", "Fade resistant", "Easy removal", "No residue"],
    estimatedDelivery: "3-5 business days",
    rating: 4.2,
    reviewCount: 678
  },
  {
    id: "wall-decals",
    name: "Wall Decals",
    category: "home-decor",
    description: "Removable wall decals with custom designs perfect for home decoration",
    basePrice: 0.032,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Small 12x12 inches", price: 0.032 },
      { name: "Medium 18x18 inches", price: 0.048, popular: true },
      { name: "Large 24x24 inches", price: 0.075 },
      { name: "XL 36x36 inches", price: 0.125 }
    ],
    materials: [
      { name: "Vinyl", description: "Removable, repositionable", priceMultiplier: 1.0 },
      { name: "Fabric", description: "Textured, premium look", priceMultiplier: 1.4, premium: true }
    ],
    features: ["Easy application", "Removable", "No wall damage", "Repositionable"],
    estimatedDelivery: "5-7 business days",
    rating: 4.4,
    reviewCount: 356
  },
  {
    id: "custom-puzzles",
    name: "Custom Jigsaw Puzzles",
    category: "accessories",
    description: "High-quality jigsaw puzzles featuring your custom artwork",
    basePrice: 0.035,
    image: "/placeholder.jpg",
    sizes: [
      { name: "252 pieces (11x16 inches)", price: 0.035 },
      { name: "500 pieces (16x20 inches)", price: 0.055, popular: true },
      { name: "1000 pieces (20x28 inches)", price: 0.085 }
    ],
    materials: [
      { name: "Cardboard", description: "Standard quality, durable", priceMultiplier: 1.0 },
      { name: "Premium Cardboard", description: "Thick pieces, perfect fit", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Precision cut pieces", "Gift box included", "High-quality printing", "Interlocking pieces"],
    estimatedDelivery: "7-10 business days",
    rating: 4.5,
    reviewCount: 289
  },
  {
    id: "custom-magnets-set",
    name: "Custom Magnet Sets",
    category: "home-decor",
    description: "Decorative magnet sets with matching custom designs for refrigerators",
    basePrice: 0.028,
    image: "/placeholder.jpg",
    sizes: [
      { name: "Set of 4 (3x3 inches each)", price: 0.028, popular: true },
      { name: "Set of 6 (2x2 inches each)", price: 0.035 },
      { name: "Set of 8 (mixed sizes)", price: 0.048 }
    ],
    materials: [
      { name: "Paper Laminated", description: "Colorful, affordable", priceMultiplier: 1.0 },
      { name: "Vinyl", description: "Waterproof, durable", priceMultiplier: 1.3, premium: true }
    ],
    features: ["Strong magnetic hold", "Coordinated designs", "Fade resistant", "Easy to clean"],
    estimatedDelivery: "5-7 business days",
    rating: 4.3,
    reviewCount: 234
  }
]

export default function PrintProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProduct, setSelectedProduct] = useState<PrintProduct | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("")

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "wall-art", name: "Wall Art", icon: Frame },
    { id: "apparel", name: "Apparel", icon: Shirt },
    { id: "home-decor", name: "Home Decor", icon: Coffee },
    { id: "accessories", name: "Accessories", icon: Crown }
  ]

  const filteredProducts = printProducts
    .filter(product => 
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.basePrice - b.basePrice
        case "price-high":
          return b.basePrice - a.basePrice
        case "rating":
          return b.rating - a.rating
        case "popular":
        default:
          return b.reviewCount - a.reviewCount
      }
    })

  const calculatePrice = (product: PrintProduct, size: string, material: string) => {
    const sizeOption = product.sizes.find(s => s.name === size)
    const materialOption = product.materials?.find(m => m.name === material)
    
    if (!sizeOption) return product.basePrice
    
    const basePrice = sizeOption.price
    const multiplier = materialOption?.priceMultiplier || 1
    
    return Math.round(basePrice * multiplier)
  }

  const handlePurchase = (product: PrintProduct) => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    
    setSelectedProduct(product)
    setIsPurchaseModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-4">
              Print Products & Merchandise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your favorite digital art into beautiful physical products. 
              High-quality printing with fast delivery and satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-brand-primary/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-brand-primary/30 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-brand-primary/30 focus:ring-brand-primary focus:border-transparent">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-brand-primary/20">
              <div className="aspect-square relative">
                <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 flex items-center justify-center">
                  <div className="text-brand-primary/60 text-4xl font-bold">
                    {product.name.charAt(0)}
                  </div>
                </div>
                {product.sizes.some(s => s.popular) && (
                  <Badge className="absolute top-3 left-3 bg-brand-accent text-white">
                    Popular
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Size Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size..." />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size.name} value={size.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{size.name}</span>
                            {size.dimensions && (
                              <span className="text-gray-500 ml-2">({size.dimensions})</span>
                            )}
                            <span className="font-semibold ml-auto">${size.price}</span>
                            {size.popular && (
                              <Badge variant="secondary" className="ml-2 text-xs">Popular</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Material Selection */}
                {product.materials && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Material</Label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material..." />
                      </SelectTrigger>
                      <SelectContent>
                        {product.materials.map((material) => (
                          <SelectItem key={material.name} value={material.name}>
                            <div className="flex justify-between items-center w-full">
                              <div>
                                <span>{material.name}</span>
                                {material.premium && (
                                  <Badge variant="outline" className="ml-2 text-xs">Premium</Badge>
                                )}
                              </div>
                              <span className="text-gray-500 text-sm ml-2">
                                {material.priceMultiplier !== 1.0 && 
                                  `+${Math.round((material.priceMultiplier - 1) * 100)}%`
                                }
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    {product.estimatedDelivery}
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    30-day guarantee
                  </div>
                </div>

                <Separator />

                {/* Price and Purchase */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">
                      ${selectedSize && selectedMaterial ? 
                        calculatePrice(product, selectedSize, selectedMaterial) : 
                        product.basePrice
                      }
                    </div>
                    <div className="text-sm text-gray-500">Starting price</div>
                  </div>
                  <Button 
                    onClick={() => handlePurchase(product)}
                    className="bg-brand-primary hover:bg-brand-primary/90"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && selectedProduct && (
        <DirectPurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          product={{
            id: selectedProduct.id,
            title: selectedProduct.name,
            artist: "EMC Store",
            price: selectedSize && selectedMaterial ? 
              calculatePrice(selectedProduct, selectedSize, selectedMaterial) : 
              selectedProduct.basePrice,
            currency: "USD",
            image: selectedProduct.image,
            category: selectedProduct.category,
            type: "print"
          }}
          selectedOptions={{
            size: selectedSize,
            material: selectedMaterial,
            quantity: 1
          }}
        />
      )}
    </div>
  )
}