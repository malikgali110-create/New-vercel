"use client"

import React from "react"
import { DemoPopup } from "@/components/demo-popup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Palette,
  Brush,
  Sparkles,
  Globe,
  Shield,
  Star,
  TrendingUp,
  Mail,
  ArrowRight,
  Clock,
  Filter,
  Grid3X3,
  List,
  Paintbrush,
  Feather,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div>
      <DemoPopup />
      <div className="min-h-screen bg-white relative pt-16">
        <div className="bg-orange-600 text-white py-2 px-4 text-center text-sm font-medium relative z-10">
          Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
        </div>

        {/* Categories Bar */}
        <div className="bg-gray-800 py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-6 overflow-x-auto">
              <div className="flex items-center space-x-1 text-white hover:text-yellow-300 transition-colors px-3 py-1 rounded-lg hover:bg-white/10">
                <span className="font-medium">All Categories</span>
              </div>
              
              <Link href="/nft-bundles" className="text-white hover:text-purple-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30 hover:shadow-lg whitespace-nowrap font-medium border border-purple-400/20 hover:border-purple-300/40">
                <span className="flex items-center space-x-2">
                  <span className="text-purple-200">💎</span>
                  <span>NFT Bundles</span>
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">Premium</span>
                </span>
              </Link>
              <Link href="/nft-art" className="text-white hover:text-yellow-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20 whitespace-nowrap font-medium shadow-sm">🎨 NFT Art</Link>
              <Link href="/digital-art" className="text-white hover:text-blue-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 whitespace-nowrap font-medium shadow-sm">🎨 Digital Art</Link>
              <Link href="/print-products" className="text-white hover:text-green-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 whitespace-nowrap font-medium shadow-sm">🖼️ Print-on-Demand</Link>
              <Link href="/handmade-art" className="text-white hover:text-pink-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 whitespace-nowrap font-medium shadow-sm">✋ Handmade</Link>
              <Link href="/categories/characters" className="text-white hover:text-purple-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-violet-500/20 whitespace-nowrap font-medium shadow-sm">🎭 Characters</Link>
              <Link href="/categories/abstract" className="text-white hover:text-indigo-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-blue-500/20 whitespace-nowrap font-medium shadow-sm">🌟 Abstract</Link>
              <Link href="/categories/landscape" className="text-white hover:text-teal-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 whitespace-nowrap font-medium shadow-sm">🏞️ Landscape</Link>
              <Link href="/categories/portrait" className="text-white hover:text-amber-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 whitespace-nowrap font-medium shadow-sm">👤 Portrait</Link>
              <Link href="/categories/pop-art" className="text-white hover:text-red-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 whitespace-nowrap font-medium shadow-sm">🎪 Pop Art</Link>
              <Link href="/categories/fantasy" className="text-white hover:text-violet-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-violet-500/20 hover:to-purple-500/20 whitespace-nowrap font-medium shadow-sm">🔮 Fantasy</Link>
              <Link href="/categories/sci-fi" className="text-white hover:text-cyan-300 transition-colors px-3 py-1 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 whitespace-nowrap font-medium shadow-sm">🤖 Sci-Fi</Link>
            </div>
          </div>
        </div>



        <main className="relative">
          <section className="relative py-24 px-4 overflow-hidden min-h-[90vh] flex items-center">
            {/* Enhanced Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/30 via-transparent to-green-100/30"></div>
            
            {/* Animated Background Art Icons */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-10 left-10 text-orange-400 animate-pulse"><Palette className="h-12 w-12" /></div>
              <div className="absolute top-20 right-20 text-green-400 animate-bounce"><Brush className="h-8 w-8" /></div>
              <div className="absolute bottom-20 left-20 text-sky-400 animate-pulse"><Sparkles className="h-14 w-14" /></div>
              <div className="absolute top-40 left-1/3 text-orange-300 animate-bounce"><Paintbrush className="h-10 w-10" /></div>
              <div className="absolute bottom-40 right-1/3 text-green-300 animate-pulse"><Feather className="h-12 w-12" /></div>
              <div className="absolute top-60 right-10 text-sky-300 animate-bounce"><Layers className="h-11 w-11" /></div>
              <div className="absolute top-1/2 left-10 text-purple-300 animate-pulse"><Star className="h-9 w-9" /></div>
              <div className="absolute bottom-10 right-1/4 text-pink-300 animate-bounce"><Globe className="h-10 w-10" /></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-200/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-sky-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-5xl mx-auto">
                <div className="flex justify-center mb-8">
                  <Badge className="mb-6 bg-gradient-to-r from-green-100 to-orange-100 text-green-800 border-green-200 hover:bg-green-200 px-6 py-2 text-lg font-semibold animate-pulse">
                    ✨ Premium Creative Marketplace ✨
                  </Badge>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-orange-600 via-green-600 to-sky-600 bg-clip-text text-transparent leading-tight">
                  Emotion Capsules
                </h1>
                
                <div className="mb-8">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    🎨 One Art, Unlimited Formats
                  </p>
                  <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto">
                    Premium Digital Art Collections • NFT Bundles with Commercial Rights • Print-on-Demand
                    <br className="hidden md:block" />
                    💎 Pay in XRP via XUMM • ⚡ Download Instantly • 🔒 Own Forever
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 via-green-600 to-sky-600 hover:from-orange-700 hover:via-green-700 hover:to-sky-700 text-white px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                    <Sparkles className="mr-3 h-6 w-6" />
                    🚀 Explore Premium Bundles
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Globe className="mr-3 h-6 w-6" />
                    💎 Connect XUMM Wallet
                  </Button>
                </div>
                
                {/* Enhanced Feature Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-orange-800 text-sm mb-1">Premium Quality</h3>
                    <p className="text-xs text-orange-700">High-res artworks</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-green-800 text-sm mb-1">XRPL Secure</h3>
                    <p className="text-xs text-green-700">Blockchain payments</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center mb-2">
                      <Globe className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="font-bold text-sky-800 text-sm mb-1">Global Access</h3>
                    <p className="text-xs text-sky-700">Worldwide delivery</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-purple-800 text-sm mb-1">Trending Now</h3>
                    <p className="text-xs text-purple-700">Hot collections</p>
                  </div>
                </div>
                
                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-orange-600 mb-2">10K+</div>
                    <div className="text-sm text-gray-600 font-medium">Digital Assets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">500+</div>
                    <div className="text-sm text-gray-600 font-medium">NFT Bundles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-sky-600 mb-2">50+</div>
                    <div className="text-sm text-gray-600 font-medium">Print Options</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600 font-medium">Instant Access</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Categories</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  From digital masterpieces to handcrafted art, discover the perfect piece for your collection.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Link href="/digital-art" className="group">
                  <Card className="overflow-hidden border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:shadow-lg aspect-square brand-card">
                    <div className="aspect-square bg-gradient-to-br from-brand-light to-brand-secondary/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Palette className="h-8 w-8 text-brand-primary" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">Digital Art</h3>
                      <p className="text-xs text-gray-600">NFT Collections</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/print-products" className="group">
                  <Card className="overflow-hidden border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:shadow-lg aspect-square brand-card">
                    <div className="aspect-square bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="h-8 w-8 text-brand-secondary" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">Print Products</h3>
                      <p className="text-xs text-gray-600">Custom Prints</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/handmade-art" className="group">
                  <Card className="overflow-hidden border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:shadow-lg aspect-square brand-card">
                    <div className="aspect-square bg-gradient-to-br from-brand-accent/20 to-brand-light relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brush className="h-8 w-8 text-brand-accent" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">Handmade Art</h3>
                      <p className="text-xs text-gray-600">Crafted Items</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/custom-art" className="group">
                  <Card className="overflow-hidden border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:shadow-lg aspect-square brand-card">
                    <div className="aspect-square bg-gradient-to-br from-brand-secondary/20 to-brand-light relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Paintbrush className="h-8 w-8 text-brand-secondary" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">Custom Art</h3>
                      <p className="text-xs text-gray-600">Personalized</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/illustrations" className="group">
                  <Card className="overflow-hidden border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:shadow-lg aspect-square brand-card">
                    <div className="aspect-square bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Feather className="h-8 w-8 text-sky-600" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">Illustrations</h3>
                      <p className="text-xs text-gray-600">Vector Art</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/3d-art" className="group">
                  <Card className="overflow-hidden border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg aspect-square">
                    <div className="aspect-square bg-orange-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">3D Art</h3>
                      <p className="text-xs text-gray-600">Sculptures</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 bg-orange-50">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">Featured Collections</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover amazing artworks across different categories
                </p>
              </div>
              
              {/* Carousel Container */}
              <div className="relative">
                <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
                  {[
                  { title: '10K Cyberpunk Warriors Bundle', count: '10,000 items', price: '250 XRP', gradient: 'from-purple-400 to-pink-500', isExclusive: true },
                  { title: '5K Anime Legends Bundle', count: '5,000 items', price: '180 XRP', gradient: 'from-blue-400 to-cyan-500', isExclusive: true },
                  { title: '2K Fantasy Creatures Bundle', count: '2,000 items', price: '120 XRP', gradient: 'from-purple-400 to-indigo-500', isExclusive: true },
                  { title: '1K Pixel Art Heroes Bundle', count: '1,000 items', price: '75 XRP', gradient: 'from-yellow-400 to-orange-500', isExclusive: true },
                  { title: 'Abstract Art Prints', count: '1.2k items', price: '25 XRP', gradient: 'from-green-500 to-teal-400' },
                  { title: 'Digital Landscapes Collection', count: '2.7k items', price: '40 XRP', gradient: 'from-teal-400 to-green-500' },
                  { title: 'Premium Digital Art Bundle', count: '1.9k items', price: '95 XRP', gradient: 'from-orange-600 to-red-500', isExclusive: true },
                  { title: 'Exclusive NFT Masterpieces', count: '1.1k items', price: '200 XRP', gradient: 'from-green-600 to-emerald-500', isExclusive: true }
                ].map((collection, i) => (
                    <Card key={i} className="group flex-shrink-0 w-64 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-0">
                        <div className={`h-40 ${i % 4 === 0 ? 'bg-orange-400' : i % 4 === 1 ? 'bg-green-400' : i % 4 === 2 ? 'bg-sky-400' : 'bg-purple-400'} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="h-8 w-8 text-white opacity-80" />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{collection.title}</h3>
                            {collection.isExclusive && (
                              <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-bold">Exclusive</span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{collection.count}</p>
                          <div className="flex items-center justify-between">
                            <p className={`font-semibold ${
                              collection.price.includes('XRP') ? 'text-orange-600' : 'text-green-600'
                            }`}>{collection.price}</p>
                            {collection.isExclusive && (
                              <div className="text-xs text-purple-600 font-medium">💎 Full Rights</div>
                            )}
                          </div>
                          {collection.isExclusive && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="text-xs text-red-600 font-medium">⚡ Limited Time Offer</div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

            </div>
          </section>

          <section className="py-16 px-4 bg-green-50">
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="bg-white border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Secure Transactions</h3>
                    <p className="text-gray-600">
                      All payments are processed securely through XRPL blockchain technology with XUMM wallet integration.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-sky-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Globe className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Global Marketplace</h3>
                    <p className="text-gray-600">
                      Connect with artists and collectors from around the world in our decentralized marketplace.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-purple-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Quality</h3>
                    <p className="text-gray-600">
                      Every piece is carefully curated and verified to ensure the highest quality and authenticity.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Artists */}
          <section className="py-16 px-4 bg-sky-50">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4">
                  Featured Artists
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Meet the talented creators behind our amazing artworks
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: 'Sarah Chen', specialty: 'Digital Art', works: '127 works', gradient: 'from-orange-400 to-red-400', rating: '4.9' },
                  { name: 'Alex Rivera', specialty: 'NFT Creator', works: '89 works', gradient: 'from-green-400 to-emerald-400', rating: '4.8' },
                  { name: 'Maya Patel', specialty: 'Abstract Art', works: '156 works', gradient: 'from-sky-400 to-cyan-400', rating: '4.9' },
                  { name: 'David Kim', specialty: 'Photography', works: '203 works', gradient: 'from-orange-500 to-red-500', rating: '4.7' },
                  { name: 'Luna Martinez', specialty: 'Illustrations', works: '94 works', gradient: 'from-green-500 to-teal-500', rating: '4.8' },
                  { name: 'James Wilson', specialty: 'Handmade', works: '78 works', gradient: 'from-sky-500 to-blue-500', rating: '4.9' },
                  { name: 'Zara Ahmed', specialty: 'Modern Art', works: '112 works', gradient: 'from-orange-600 to-yellow-500', rating: '4.6' },
                  { name: 'Ryan Foster', specialty: 'Prints', works: '145 works', gradient: 'from-green-600 to-emerald-600', rating: '4.8' },
                  { name: 'Aria Singh', specialty: 'Sculptures', works: '67 works', gradient: 'from-sky-600 to-cyan-600', rating: '4.7' },
                  { name: 'Leo Zhang', specialty: 'Digital NFT', works: '98 works', gradient: 'from-orange-400 to-red-400', rating: '4.9' },
                  { name: 'Emma Brown', specialty: 'Crafts', works: '134 works', gradient: 'from-green-400 to-teal-400', rating: '4.8' },
                  { name: 'Noah Davis', specialty: 'Vintage Art', works: '87 works', gradient: 'from-sky-400 to-blue-400', rating: '4.6' }
                ].map((artist, i) => (
                  <Card key={i} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-4 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${artist.gradient} rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg`}>
                        {artist.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-bold text-sm mb-1">{artist.name}</h3>
                      <p className="text-gray-600 text-xs mb-1">{artist.specialty}</p>
                      <p className="text-gray-500 text-xs mb-2">{artist.works}</p>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold">{artist.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Trending Artists */}
          <section className="py-16 px-4 bg-orange-50">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
                  Trending Artists
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover the most popular creators in our community
                </p>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {[
                  { name: 'Alex Chen', type: 'NFT Creator', followers: '12.5k', artworks: '234', gradient: 'from-orange-400 to-red-400' },
                  { name: 'Sarah Kim', type: 'Digital Artist', followers: '8.9k', artworks: '156', gradient: 'from-green-400 to-emerald-400' },
                  { name: 'Mike Johnson', type: 'Abstract Artist', followers: '15.2k', artworks: '89', gradient: 'from-sky-400 to-cyan-400' },
                  { name: 'Emma Davis', type: 'Portrait Artist', followers: '6.7k', artworks: '178', gradient: 'from-orange-500 to-yellow-400' },
                  { name: 'David Wilson', type: 'Fantasy Artist', followers: '11.3k', artworks: '203', gradient: 'from-green-500 to-teal-400' },
                  { name: 'Lisa Brown', type: 'Pop Artist', followers: '9.8k', artworks: '145', gradient: 'from-sky-500 to-blue-400' },
                  { name: 'Tom Garcia', type: 'Sci-Fi Artist', followers: '7.4k', artworks: '167', gradient: 'from-orange-600 to-red-500' },
                  { name: 'Anna Lee', type: 'Landscape Artist', followers: '13.6k', artworks: '198', gradient: 'from-green-600 to-emerald-500' },
                  { name: 'Chris Taylor', type: 'Character Designer', followers: '10.1k', artworks: '221', gradient: 'from-sky-600 to-cyan-500' },
                  { name: 'Maya Patel', type: 'Handmade Crafts', followers: '5.9k', artworks: '134', gradient: 'from-orange-400 to-yellow-400' },
                  { name: 'Jake Miller', type: 'Print Designer', followers: '8.2k', artworks: '189', gradient: 'from-green-400 to-teal-400' },
                  { name: 'Sophie Clark', type: 'Mixed Media', followers: '14.7k', artworks: '256', gradient: 'from-sky-400 to-blue-400' }
                ].map((artist, i) => (
                  <Card key={i} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 aspect-square">
                    <CardContent className="p-3 text-center h-full flex flex-col justify-center">
                      <div className={`w-8 h-8 bg-gradient-to-br ${artist.gradient} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                        <Palette className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-bold text-xs mb-1">{artist.name}</h3>
                      <p className="text-gray-600 text-xs mb-1">{artist.type}</p>
                      <div className="text-xs text-gray-500 mb-1">
                        <div>{artist.followers}</div>
                        <div>{artist.artworks}</div>
                      </div>
                      <Button size="sm" className="w-full text-xs px-1 py-1" variant="outline">
                        Follow
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* New Arrivals Carousel */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
                  New Arrivals
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Fresh artworks just added to our collection
                </p>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Button variant="outline" size="sm" className="bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200">
                  <Filter className="h-4 w-4 mr-2" />
                  All Categories
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-green-50 hover:text-green-600">
                  Digital Art
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-sky-50 hover:text-sky-600">
                  NFT
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
                  Abstract
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-pink-50 hover:text-pink-600">
                  Fantasy
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-teal-50 hover:text-teal-600">
                  Nature
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-indigo-50 hover:text-indigo-600">
                  Landscape
                </Button>
              </div>
              
              {/* Price Range Filter */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-medium text-gray-600">Price Range:</span>
                  <Button variant="outline" size="sm" className="text-xs">Under 20 XRP</Button>
                  <Button variant="outline" size="sm" className="text-xs">20-50 XRP</Button>
                  <Button variant="outline" size="sm" className="text-xs">50+ XRP</Button>
                </div>
              </div>
              
              {/* Carousel Container */}
              <div className="relative">
                <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
                  {[
                    { title: 'Cosmic Dreams', price: '15 XRP', gradient: 'from-orange-500 to-red-500', rating: '4.9', category: 'Digital Art' },
                    { title: 'Ocean Waves', price: '25 XRP', gradient: 'from-green-500 to-emerald-500', rating: '4.8', category: 'NFT' },
                    { title: 'Forest Spirit', price: '35 XRP', gradient: 'from-sky-500 to-cyan-500', rating: '4.7', category: 'Abstract' },
                    { title: 'Fire Phoenix', price: '55 XRP', gradient: 'from-orange-600 to-red-600', rating: '4.9', category: 'Fantasy' },
                    { title: 'Night Sky', price: '20 XRP', gradient: 'from-green-600 to-teal-600', rating: '4.6', category: 'Photography' },
                    { title: 'Rose Garden', price: '28 XRP', gradient: 'from-sky-600 to-blue-600', rating: '4.8', category: 'Nature' },
                    { title: 'Tech Future', price: '40 XRP', gradient: 'from-orange-400 to-yellow-400', rating: '4.9', category: 'Sci-Fi' },
                    { title: 'Golden Hour', price: '48 XRP', gradient: 'from-green-400 to-emerald-400', rating: '4.7', category: 'Landscape' },
                    { title: 'Crystal Cave', price: '62 XRP', gradient: 'from-sky-400 to-cyan-400', rating: '4.8', category: 'Fantasy' },
                    { title: 'Mint Fresh', price: '18 XRP', gradient: 'from-orange-500 to-red-400', rating: '4.6', category: 'Modern' },
                    { title: 'Cherry Blossom', price: '32 XRP', gradient: 'from-green-500 to-teal-400', rating: '4.9', category: 'Nature' },
                    { title: 'Deep Ocean', price: '38 XRP', gradient: 'from-sky-500 to-blue-400', rating: '4.7', category: 'Abstract' },
                    { title: 'Sunset Glow', price: '45 XRP', gradient: 'from-orange-600 to-yellow-500', rating: '4.8', category: 'Landscape' },
                    { title: 'Lavender Field', price: '12 XRP', gradient: 'from-green-600 to-emerald-500', rating: '4.6', category: 'Nature' },
                    { title: 'Electric Storm', price: '68 XRP', gradient: 'from-sky-600 to-cyan-500', rating: '4.9', category: 'Abstract' },
                    { title: 'Autumn Leaves', price: '35 XRP', gradient: 'from-orange-400 to-red-400', rating: '4.7', category: 'Seasonal' },
                    { title: 'Spring Bloom', price: '22 XRP', gradient: 'from-green-400 to-teal-400', rating: '4.8', category: 'Seasonal' },
                    { title: 'Sky Dance', price: '30 XRP', gradient: 'from-sky-400 to-blue-400', rating: '4.6', category: 'Abstract' },
                    { title: 'Neon Dreams', price: '42 XRP', gradient: 'from-purple-500 to-pink-500', rating: '4.8', category: 'Digital' },
                    { title: 'Mountain Peak', price: '38 XRP', gradient: 'from-gray-500 to-slate-600', rating: '4.7', category: 'Landscape' },
                    { title: 'Urban Jungle', price: '33 XRP', gradient: 'from-green-600 to-lime-500', rating: '4.9', category: 'Modern' },
                    { title: 'Mystic Portal', price: '58 XRP', gradient: 'from-indigo-500 to-purple-600', rating: '4.8', category: 'Fantasy' },
                    { title: 'Desert Mirage', price: '26 XRP', gradient: 'from-yellow-500 to-orange-600', rating: '4.6', category: 'Landscape' },
                    { title: 'Cyber City', price: '52 XRP', gradient: 'from-blue-600 to-cyan-500', rating: '4.9', category: 'Sci-Fi' },
                    { title: 'Floral Symphony', price: '29 XRP', gradient: 'from-pink-500 to-rose-600', rating: '4.7', category: 'Nature' },
                    { title: 'Galactic Voyage', price: '65 XRP', gradient: 'from-purple-600 to-blue-700', rating: '4.8', category: 'Space' },
                    { title: 'Tropical Paradise', price: '34 XRP', gradient: 'from-teal-500 to-green-600', rating: '4.6', category: 'Nature' },
                    { title: 'Arctic Aurora', price: '47 XRP', gradient: 'from-cyan-400 to-blue-600', rating: '4.9', category: 'Nature' },
                    { title: 'Vintage Vibes', price: '24 XRP', gradient: 'from-amber-500 to-orange-600', rating: '4.7', category: 'Retro' },
                    { title: 'Digital Waves', price: '36 XRP', gradient: 'from-blue-500 to-teal-600', rating: '4.8', category: 'Digital' }
                  ].map((item, i) => (
                    <Card key={i} className="group flex-shrink-0 w-56 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardContent className="p-0">
                        <div className={`h-32 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white opacity-80" />
                          </div>
                          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                            <span className="text-white text-xs font-semibold">★ {item.rating}</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                          <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                          <p className="text-orange-600 font-semibold text-sm">{item.price}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* Popular Categories */}
          <section className="py-16 px-4 bg-purple-50">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-4">
                  Popular Categories
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Explore art by style and medium
                </p>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {[
                  { name: 'Abstract Art', count: '2.3k items', icon: '🎨', gradient: 'from-orange-400 to-red-400' },
                  { name: 'Digital Art', count: '1.8k items', icon: '💻', gradient: 'from-green-400 to-emerald-400' },
                  { name: 'Photography', count: '3.1k items', icon: '📸', gradient: 'from-sky-400 to-cyan-400' },
                  { name: 'Illustrations', count: '1.5k items', icon: '✏️', gradient: 'from-orange-500 to-red-500' },
                  { name: 'NFT Collections', count: '892 items', icon: '💎', gradient: 'from-green-500 to-teal-500' },
                  { name: 'Handmade', count: '1.2k items', icon: '✋', gradient: 'from-sky-500 to-blue-500' },
                  { name: 'Prints', count: '2.7k items', icon: '🖼️', gradient: 'from-orange-600 to-yellow-500' },
                  { name: 'Sculptures', count: '456 items', icon: '🗿', gradient: 'from-green-600 to-emerald-600' },
                  { name: 'Paintings', count: '1.9k items', icon: '🎭', gradient: 'from-sky-600 to-cyan-600' },
                  { name: 'Crafts', count: '834 items', icon: '🧵', gradient: 'from-orange-400 to-red-400' },
                  { name: 'Jewelry', count: '567 items', icon: '💍', gradient: 'from-green-400 to-teal-400' },
                  { name: 'Ceramics', count: '723 items', icon: '🏺', gradient: 'from-sky-400 to-blue-400' },
                  { name: 'Textiles', count: '945 items', icon: '🧶', gradient: 'from-orange-500 to-red-500' },
                  { name: 'Vintage', count: '678 items', icon: '🕰️', gradient: 'from-green-500 to-emerald-500' },
                  { name: 'Modern', count: '1.1k items', icon: '🔮', gradient: 'from-sky-500 to-cyan-500' }
                ].map((category, i) => (
                  <Card key={i} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 aspect-square">
                    <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-lg mx-auto mb-3 flex items-center justify-center text-lg shadow-md`}>
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-sm mb-1 text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 text-xs">{category.count}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Custom Art Request Form */}
          <section className="py-16 px-4 bg-teal-500">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Request Custom Art
                  </h2>
                  <p className="text-white/90 mb-8 text-lg">
                    Get personalized NFTs, digital art, handmade crafts, and print products made just for you
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Art Request Form</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/90 text-sm font-medium mb-2 block">Art Type</label>
                          <select className="w-full bg-white/10 border-white/20 text-white rounded-lg p-3">
                            <option value="">Select Art Type</option>
                            <option value="nft">NFT Collection</option>
                            <option value="digital">Digital Art</option>
                            <option value="handmade">Handmade Art</option>
                            <option value="print">Print Products</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-white/90 text-sm font-medium mb-2 block">Description</label>
                          <textarea 
                            placeholder="Describe your vision..." 
                            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-lg p-3 h-24"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-white/90 text-sm font-medium mb-2 block">Budget (XRP)</label>
                            <Input 
                              placeholder="e.g. 10-50" 
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                          </div>
                          <div>
                            <label className="text-white/90 text-sm font-medium mb-2 block">Timeline</label>
                            <Input 
                              placeholder="e.g. 2 weeks" 
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                          </div>
                        </div>
                        <Button className="w-full bg-white text-green-600 hover:bg-white/90 font-semibold">
                          Submit Request
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <Palette className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">NFT Collections</h4>
                            <p className="text-white/70 text-sm">10K unique NFTs with metadata</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Brush className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Digital Art</h4>
                            <p className="text-white/70 text-sm">Custom illustrations & designs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Handmade Crafts</h4>
                            <p className="text-white/70 text-sm">Physical art pieces & sculptures</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Layers className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Print Products</h4>
                            <p className="text-white/70 text-sm">Posters, canvas, merchandise</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-white/5 rounded-lg">
                        <p className="text-white/90 text-sm">
                          <strong>Response Time:</strong> 24-48 hours<br/>
                          <strong>Revisions:</strong> Up to 3 free revisions<br/>
                          <strong>Payment:</strong> 50% upfront, 50% on completion
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Subscription */}
          <section className="py-16 px-4 bg-pink-500">
            <div className="container mx-auto text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stay Updated
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Get notified about new collections, exclusive drops, and special offers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  />
                  <Button className="bg-white text-pink-600 hover:bg-white/90 font-semibold px-8">
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-white/70 text-sm mt-4">
                  Join 10,000+ creators and collectors in our community
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
