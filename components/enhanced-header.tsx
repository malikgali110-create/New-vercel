"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Palette, User, Bell, Settings, LogOut, CreditCard, Heart, ShoppingBag, Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { CartSidebar } from "@/components/cart-sidebar"
import { AdvancedSearch } from "@/components/advanced-search"

export function EnhancedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const notifications = [
    { id: 1, message: "New artwork from Sarah Chen", time: "2m ago", unread: true },
    { id: 2, message: "Your order has shipped", time: "1h ago", unread: true },
    { id: 3, message: "Price drop on saved item", time: "3h ago", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="border-b border-gradient-to-r from-orange-200/30 via-pink-200/30 to-red-200/30 bg-gradient-to-r from-white/98 via-gray-50/95 to-white/98 backdrop-blur-xl sticky top-12 z-40 shadow-lg shadow-orange-500/5">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative p-4 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-red-500/20 rounded-2xl group-hover:shadow-2xl group-hover:shadow-orange-500/25 transition-all duration-500 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-2xl animate-pulse"></div>
              <Palette className="h-9 w-9 text-orange-600 group-hover:text-red-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 bg-clip-text text-transparent font-serif group-hover:from-orange-700 group-hover:to-red-700 transition-all duration-500">
                EMC Store
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide group-hover:text-gray-700 transition-colors duration-300">
                store.emotioncapsules.art
              </p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/digital-arts"
              className="relative px-4 py-2 text-gray-700 hover:text-white font-semibold flex items-center group transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <span className="relative z-10">
                Digital Arts
              </span>
              <Badge className="ml-2 text-xs bg-orange-100 text-orange-700 group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                2.8K
              </Badge>
            </Link>
            <Link
              href="/physical-arts"
              className="relative px-4 py-2 text-gray-700 hover:text-white font-semibold flex items-center group transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-500/25"
            >
              <span className="relative z-10">
                Physical Arts
              </span>
              <Badge className="ml-2 text-xs bg-pink-100 text-pink-700 group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                1.9K
              </Badge>
            </Link>
            <Link
              href="/handmade-arts"
              className="relative px-4 py-2 text-gray-700 hover:text-white font-semibold flex items-center group transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <span className="relative z-10">
                Handmade Arts
              </span>
              <Badge className="ml-2 text-xs bg-emerald-100 text-emerald-700 group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                856
              </Badge>
            </Link>
            <Link
              href="/artists"
              className="relative px-4 py-2 text-gray-700 hover:text-white font-semibold group transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10">
                Artists
              </span>
            </Link>
            <Link
              href="/collections"
              className="relative px-4 py-2 text-gray-700 hover:text-white font-semibold group flex items-center transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="relative z-10">
                Collections
              </span>
              <Sparkles className="h-4 w-4 ml-2 text-purple-500 group-hover:text-white group-hover:animate-spin transition-all duration-300" />
            </Link>
            <Link
              href="/nft-collections"
              className="text-foreground hover:text-purple-600 transition-all duration-300 font-medium group flex items-center"
            >
              <span className="relative">
                NFT Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse bg-purple-100 text-purple-800">
                NEW
              </Badge>
            </Link>
            <Link
              href="/print-products"
              className="text-foreground hover:text-orange-600 transition-all duration-300 font-medium group flex items-center"
            >
              <span className="relative">
                Print Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse bg-orange-100 text-orange-800">
                HOT
              </Badge>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="rounded-full relative micro-bounce">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-heartbeat bg-primary">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Wallet Connect */}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent hidden md:flex micro-bounce hover:scale-105 transition-all duration-300"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>

            {/* Cart */}
            <CartSidebar />

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full micro-bounce"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-accent/10 text-primary font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-card/95 backdrop-blur-md border rounded-xl shadow-2xl p-2 z-50 animate-in slide-in-from-top-2 duration-200 gallery-blur">
                  <div className="p-3 border-b border-border/50">
                    <p className="font-medium text-foreground font-serif">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <Heart className="h-4 w-4 mr-3" />
                      Favorites
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <ShoppingBag className="h-4 w-4 mr-3" />
                      Orders
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Button>
                  </div>
                  <div className="border-t border-border/50 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-destructive hover:bg-destructive/10 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden rounded-full micro-bounce"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <AdvancedSearch />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 pt-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="space-y-2">
              <Link
                href="/digital-arts"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
              >
                Digital Arts
                <Badge variant="secondary" className="ml-2 text-xs">
                  2.8K
                </Badge>
              </Link>
              <Link
                href="/physical-arts"
                className="block py-3 px-4 text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-200 font-medium"
              >
                Physical Arts
                <Badge variant="secondary" className="ml-2 text-xs">
                  1.9K
                </Badge>
              </Link>
              <Link
                href="/handmade-arts"
                className="block py-3 px-4 text-foreground hover:text-chart-3 hover:bg-chart-3/5 rounded-lg transition-all duration-200 font-medium"
              >
                Handmade Arts
                <Badge variant="secondary" className="ml-2 text-xs">
                  856
                </Badge>
              </Link>
              <Link
                href="/artists"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
              >
                Artists
              </Link>
              <Link
                href="/collections"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium flex items-center"
              >
                Collections
                <Sparkles className="h-3 w-3 ml-1 text-chart-3" />
              </Link>
              <Link
                href="/nft-collections"
                className="block py-3 px-4 text-foreground hover:text-purple-600 hover:bg-purple-600/5 rounded-lg transition-all duration-200 font-medium"
              >
                NFT Collections
                <Badge variant="secondary" className="ml-2 text-xs bg-purple-100 text-purple-800">
                  NEW
                </Badge>
              </Link>
              <Link
                href="/print-products"
                className="block py-3 px-4 text-foreground hover:text-orange-600 hover:bg-orange-600/5 rounded-lg transition-all duration-200 font-medium"
              >
                Print Products
                <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-800">
                  HOT
                </Badge>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
