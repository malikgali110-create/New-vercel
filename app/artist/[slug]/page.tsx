"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Share2,
  Eye,
  MessageCircle,
  Star,
  Shield,
  Calendar,
  MapPin,
  Globe,
  Instagram,
  Twitter,
  ExternalLink,
  Award,
  TrendingUp,
  Users,
  Palette,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"

interface ArtistData {
  name: string
  slug: string
  avatar: string
  coverImage: string
  verified: boolean
  bio: string
  location: string
  joinDate: string
  followers: number
  following: number
  artworks: number
  totalSales: number
  averageRating: number
  specialties: string[]
  achievements: string[]
  socialLinks: {
    website?: string
    instagram?: string
    twitter?: string
  }
  stats: {
    totalViews: number
    totalLikes: number
    featuredWorks: number
  }
}

interface ArtworkPreview {
  id: string
  title: string
  image: string
  price: number
  category: string
  likes: number
  views: number
  featured: boolean
}

// Mock artist data
const artistData: ArtistData = {
  name: "Sarah Chen",
  slug: "sarah-chen",
  avatar: "/artist-sarah-chen.jpg",
  coverImage: "/artist-cover-sarah.jpg",
  verified: true,
  bio: "Contemporary digital artist specializing in abstract watercolor techniques. My work explores the intersection of traditional art forms with modern digital expression, creating pieces that evoke emotion through color and form. Featured in galleries across Asia and Europe.",
  location: "San Francisco, CA",
  joinDate: "2022-03-15",
  followers: 2847,
  following: 156,
  artworks: 89,
  totalSales: 12400,
  averageRating: 4.8,
  specialties: ["Digital Art", "Abstract", "Watercolor", "Contemporary"],
  achievements: [
    "Featured Artist of the Month - December 2023",
    "Top 10 Digital Artists - Art Weekly 2023",
    "Gallery Exhibition - Modern Art Museum SF",
    "1000+ Sales Milestone",
  ],
  socialLinks: {
    website: "https://sarahchen.art",
    instagram: "@sarahchen_art",
    twitter: "@sarahchenart",
  },
  stats: {
    totalViews: 45678,
    totalLikes: 8934,
    featuredWorks: 12,
  },
}

const artworks: ArtworkPreview[] = [
  {
    id: "1",
    title: "Abstract Watercolor Dreams",
    image: "/abstract-watercolor-painting.jpg",
    price: 120,
    category: "Digital Art",
    likes: 234,
    views: 1567,
    featured: true,
  },
  {
    id: "2",
    title: "Ethereal Landscapes",
    image: "/abstract-digital-painting.jpg",
    price: 95,
    category: "Digital Art",
    likes: 189,
    views: 892,
    featured: false,
  },
  {
    id: "3",
    title: "Color Symphony",
    image: "/watercolor-landscape-print.jpg",
    price: 150,
    category: "Digital Art",
    likes: 298,
    views: 1234,
    featured: true,
  },
  {
    id: "4",
    title: "Digital Harmony",
    image: "/oil-painting-portrait.jpg",
    price: 85,
    category: "Digital Art",
    likes: 167,
    views: 743,
    featured: false,
  },
]

export default function ArtistPage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("artworks")

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <EnhancedHeader />

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={artistData.coverImage || "/placeholder.svg"}
          alt={`${artistData.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Artist Profile Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src={artistData.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-3xl">
              {artistData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-white md:text-foreground">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold">{artistData.name}</h1>
              {artistData.verified && (
                <Badge className="bg-blue-500 text-white">
                  <Shield className="h-4 w-4 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {artistData.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {new Date(artistData.joinDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{artistData.followers.toLocaleString()}</div>
                <div className="text-sm opacity-80">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{artistData.artworks}</div>
                <div className="text-sm opacity-80">Artworks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{artistData.totalSales.toLocaleString()}</div>
                <div className="text-sm opacity-80">XRP Sales</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold">{artistData.averageRating}</span>
                </div>
                <div className="text-sm opacity-80">Rating</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`rounded-full ${isFollowing ? "bg-muted text-foreground hover:bg-muted/80" : "bg-primary hover:bg-primary/90"}`}
            >
              <Users className="h-4 w-4 mr-2" />
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Artist Bio and Specialties */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-serif font-bold text-foreground mb-4">About the Artist</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{artistData.bio}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {artistData.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Connect</h3>
                  <div className="flex gap-3">
                    {artistData.socialLinks.website && (
                      <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </Button>
                    )}
                    {artistData.socialLinks.instagram && (
                      <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </Button>
                    )}
                    {artistData.socialLinks.twitter && (
                      <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Artist Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Views</span>
                    <span className="font-semibold">{artistData.stats.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Likes</span>
                    <span className="font-semibold">{artistData.stats.totalLikes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Featured Works</span>
                    <span className="font-semibold">{artistData.stats.featuredWorks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-chart-3" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {artistData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-1 bg-chart-3/20 rounded-full mt-1">
                        <Award className="h-3 w-3 text-chart-3" />
                      </div>
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Artist Artworks */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="artworks">All Artworks ({artworks.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({artworks.filter((a) => a.featured).length})</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          <TabsContent value="artworks" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="group overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {artwork.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-chart-3 text-white text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold font-serif">{artwork.title}</h3>
                      <div className="flex items-center gap-3 text-xs mt-1">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {artwork.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {artwork.views}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs font-bold text-foreground">{artwork.price} XRP</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{artwork.title}</h3>
                        <p className="text-xs text-muted-foreground">{artwork.category}</p>
                      </div>
                      <Link href={`/product/${artwork.id}`}>
                        <Button size="sm" variant="ghost" className="rounded-full">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks
                .filter((artwork) => artwork.featured)
                .map((artwork) => (
                  <Card
                    key={artwork.id}
                    className="group overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-chart-3 text-white">
                          <Star className="h-4 w-4 mr-1" />
                          Featured
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-bold font-serif text-lg">{artwork.title}</h3>
                        <div className="flex items-center gap-4 text-sm mt-2">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {artwork.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {artwork.views}
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
                          <span className="font-bold text-foreground">{artwork.price} XRP</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="collections" className="mt-8">
            <div className="text-center py-12">
              <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Collections Yet</h3>
              <p className="text-muted-foreground">This artist hasn't created any collections yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <FloatingActionMenu />
    </div>
  )
}
