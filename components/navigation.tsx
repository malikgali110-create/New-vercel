"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Palette,
  Brush,
  Sparkles,
  Package,
  Heart,
  Settings,
  Gem,
  Zap
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const connectWallet = async () => {
    try {
      // Demo wallet connection - in real app, integrate with XUMM or other XRPL wallet
      const demoAddress = "rDemoWallet123456789ABCDEF"
      setWalletAddress(demoAddress)
      setIsWalletConnected(true)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setIsWalletConnected(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-orange-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 transition-all duration-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">EMC Store</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-50 to-orange-100 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Palette className="h-6 w-6 text-orange-600" />
                          <div className="mb-2 mt-4 text-lg font-medium text-gray-800">
                            EMC Store
                          </div>
                          <p className="text-sm leading-tight text-gray-600">
                            Discover unique art pieces from talented creators worldwide
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid gap-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/digital-art"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                              <Palette className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-orange-700 dark:text-orange-400">🎨 Digital Art</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            High-quality digital artworks and NFTs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/print-products"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <Brush className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-green-700 dark:text-green-400">🖼️ Print Products</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Custom prints, apparel, and merchandise
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/handmade-art"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sky-50 hover:text-sky-600 focus:bg-sky-50 focus:text-sky-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-sky-700 dark:text-sky-400">✋ Handmade Art</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Unique handcrafted pieces from artisans
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/nft-art"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-50 hover:text-purple-600 focus:bg-purple-50 focus:text-purple-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-purple-700 dark:text-purple-400">🎨 NFT Art</div>
                            <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-bold ml-2">Exclusive</span>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Digital collectibles and blockchain art
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/nft-bundles"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-orange-700 dark:text-orange-400">💎 NFT Bundles</div>
                            <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-bold ml-2">Premium</span>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Curated NFT collections with exclusive benefits
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/characters"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600 focus:bg-pink-50 focus:text-pink-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-pink-700 dark:text-pink-400">🎭 Characters</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Animated and illustrated character designs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/abstract"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-indigo-700 dark:text-indigo-400">🌟 Abstract</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Modern abstract and conceptual artwork
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/landscape"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-teal-700 dark:text-teal-400">🏞️ Landscape</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
                            Beautiful nature and scenic landscapes
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/portrait"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-amber-50 hover:text-amber-600 focus:bg-amber-50 focus:text-amber-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-amber-600">👤 Portrait</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Professional and artistic portrait photography
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/pop-art"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-red-600">🎪 Pop Art</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Vibrant pop art and contemporary designs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/fantasy"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-violet-50 hover:text-violet-600 focus:bg-violet-50 focus:text-violet-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-violet-600">🔮 Fantasy</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Magical and fantasy-themed artwork
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories/sci-fi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyan-50 hover:text-cyan-600 focus:bg-cyan-50 focus:text-cyan-600"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <div className="text-sm font-medium leading-none text-cyan-600">🤖 Sci-Fi</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Futuristic and science fiction artwork
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories/digital-art" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Digital Art
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories/print-products" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Print Products
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories/handmade-art" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Handmade Art
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/nft-art" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    NFT Art
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/nft-bundles" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-medium transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-1">
                      💎 NFT Bundles
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artworks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Wallet Connect/Disconnect */}
            {isWalletConnected ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnectWallet}
                className="hidden md:flex border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                </div>
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={connectWallet}
                className="hidden md:flex bg-orange-600 hover:bg-orange-700 text-white"
              >
                Connect Wallet
              </Button>
            )}

            {/* User Account */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-orange-600 hover:bg-orange-50">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    EMC Store
                  </SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  <Link
                     href="/digital-art"
                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                     onClick={() => setIsOpen(false)}
                   >
                     <Palette className="h-5 w-5" />
                     <div>
                       <div className="font-medium">Digital Art</div>
                       <div className="text-sm text-gray-500">Digital artworks & NFTs</div>
                     </div>
                   </Link>
                   <Link
                     href="/print-products"
                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                     onClick={() => setIsOpen(false)}
                   >
                     <Brush className="h-5 w-5" />
                     <div>
                       <div className="font-medium">Print Products</div>
                       <div className="text-sm text-gray-500">Custom prints & merchandise</div>
                     </div>
                   </Link>
                   <Link
                     href="/handmade-art"
                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                     onClick={() => setIsOpen(false)}
                   >
                     <Sparkles className="h-5 w-5" />
                     <div>
                       <div className="font-medium">Handmade Art</div>
                       <div className="text-sm text-gray-500">Unique handcrafted pieces</div>
                     </div>
                   </Link>
                   <Link
                     href="/nft-art"
                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                     onClick={() => setIsOpen(false)}
                   >
                     <Gem className="h-5 w-5" />
                     <div>
                       <div className="font-medium">NFT Art</div>
                       <div className="text-sm text-gray-500">Downloadable NFT collections</div>
                     </div>
                   </Link>

                  <div className="border-t border-orange-200 pt-4 mt-4">
                    {/* Mobile Wallet Connect */}
                    {isWalletConnected ? (
                      <Button 
                        variant="outline" 
                        onClick={disconnectWallet}
                        className="w-full justify-start gap-3 p-3 h-auto border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="text-left">
                          <div className="font-medium">Wallet Connected</div>
                          <div className="text-sm text-muted-foreground">{walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}</div>
                        </div>
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        onClick={connectWallet}
                        className="w-full justify-start gap-3 p-3 h-auto bg-orange-600 hover:bg-orange-700"
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="text-left">
                          <div className="font-medium text-white">Connect Wallet</div>
                          <div className="text-sm text-white/80">Connect your XRPL wallet</div>
                        </div>
                      </Button>
                    )}
                    
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors mt-2"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      href="/account"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Account Settings</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artworks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}