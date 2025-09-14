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
    <header className="border-b border-border/50 bg-white/95 backdrop-blur-md sticky top-12 z-40 gallery-blur shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 micro-bounce group">
            <div className="p-3 bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl group-hover:shadow-lg transition-all duration-300">
              <Palette className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground font-serif group-hover:text-primary transition-colors duration-300">EMC Store</h1>
              <p className="text-xs text-muted-foreground font-medium">store.emotioncapsules.art</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/digital-arts"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium flex items-center group"
            >
              <span className="relative">
                Digital Arts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                2.8K
              </Badge>
            </Link>
            <Link
              href="/physical-arts"
              className="text-foreground hover:text-accent transition-all duration-300 font-medium flex items-center group"
            >
              <span className="relative">
                Physical Arts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </span>
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                1.9K
              </Badge>
            </Link>
            <Link
              href="/handmade-arts"
              className="text-foreground hover:text-chart-3 transition-all duration-300 font-medium flex items-center group"
            >
              <span className="relative">
                Handmade Arts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-chart-3 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <Badge variant="secondary" className="ml-2 text-xs animate-pulse">
                856
              </Badge>
            </Link>
            <Link
              href="/artists"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium group"
            >
              <span className="relative">
                Artists
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link
              href="/collections"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium group flex items-center"
            >
              <span className="relative">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
              <Sparkles className="h-3 w-3 ml-1 text-chart-3 animate-pulse" />
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
