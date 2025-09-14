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
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">EMC Store</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover unique art pieces from talented creators worldwide. From digital art to handmade crafts, find the perfect piece for your collection.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/digital-art" className="text-muted-foreground hover:text-foreground transition-colors">
                  Digital Art
                </Link>
              </li>
              <li>
                <Link href="/print-products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Print Products
                </Link>
              </li>
              <li>
                <Link href="/handmade-art" className="text-muted-foreground hover:text-foreground transition-colors">
                  Handmade Art
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-muted-foreground hover:text-foreground transition-colors">
                  Featured Artists
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-muted-foreground hover:text-foreground transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to get updates on new arrivals, exclusive offers, and artist spotlights.
            </p>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1"
                  type="email"
                />
                <Button size="sm">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@emcstore.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Art Street, Creative City, CC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <p>&copy; 2024 EMC Store. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for artists and art lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}