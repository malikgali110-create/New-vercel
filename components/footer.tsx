"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Palette,
  Heart
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-gradient-to-r from-purple-200 via-pink-200 to-blue-200 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 dark:to-black/20" />
      <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link href="/" className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105">
                <div className="relative h-10 w-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                  <Palette className="h-6 w-6 text-white relative z-10" />
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">EMC Store</span>
              </Link>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Discover unique art pieces from talented creators worldwide. From digital art to handmade crafts, find the perfect piece for your collection.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 border border-blue-200/50 dark:border-blue-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-800/30 dark:hover:to-sky-700/30 border border-sky-200/50 dark:border-sky-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Twitter className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 hover:from-pink-100 hover:to-pink-200 dark:hover:from-pink-800/30 dark:hover:to-pink-700/30 border border-pink-200/50 dark:border-pink-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Instagram className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/30 dark:hover:to-red-700/30 border border-red-200/50 dark:border-red-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Youtube className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </div>

          {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 relative">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Quick Links</span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/digital-art" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Digital Art
                  </Link>
                </li>
                <li>
                  <Link href="/print-products" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Print Products
                  </Link>
                </li>
                <li>
                  <Link href="/handmade-art" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Handmade Art
                  </Link>
                </li>
                <li>
                  <Link href="/artists" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Featured Artists
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 relative">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Customer Service</span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </h3>
              <ul className="space-y-3 text-sm">
              <li>
                  <Link href="/help" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="group flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Track Your Order
                  </Link>
                </li>
            </ul>
          </div>

          {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 relative">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Stay Connected</span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Subscribe to get updates on new arrivals, exclusive offers, and artist spotlights.
              </p>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-emerald-400/20 dark:focus:ring-emerald-500/20 transition-all duration-300"
                    type="email"
                  />
                  <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
            
            {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 group hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/30 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>support@emcstore.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 group hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/30 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 group hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/30 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>123 Art Street, Creative City, CC 12345</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 mt-12 pt-8 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-600 dark:text-slate-300">
                <p>&copy; 2024 EMC Store. All rights reserved.</p>
                <div className="flex space-x-4">
                  <Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group">
                    <span>Privacy Policy</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                  <Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group">
                    <span>Terms of Service</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                  <Link href="/cookies" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group">
                    <span>Cookie Policy</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
                <span>for artists and art lovers</span>
              </div>
            </div>
          </div>
      </div>
    </footer>
  )
}