"use client"

import { DemoPopup } from "@/components/demo-popup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  Archive, 
  Printer, 
  ArrowRight, 
  CheckCircle, 
  CreditCard,
  Smartphone,
  Shield,
  Truck,
  Globe,
  Clock,
  Star,
  HelpCircle,
  FileText,
  Image,
  Palette,
  Package
} from "lucide-react"
import Link from "next/link"

const workflows = [
  {
    id: "digital",
    title: "Digital Art Download",
    icon: <Download className="h-8 w-8" />,
    description: "Instant access to high-quality digital artwork",
    steps: [
      {
        step: 1,
        title: "Browse & Select",
        description: "Choose from our curated collection of digital artworks",
        icon: <Palette className="h-5 w-5" />
      },
      {
        step: 2,
        title: "Choose License",
        description: "Select Personal or Commercial license based on your needs",
        icon: <FileText className="h-5 w-5" />
      },
      {
        step: 3,
        title: "Pay with XRP",
        description: "Secure payment via XUMM wallet on XRPL blockchain",
        icon: <CreditCard className="h-5 w-5" />
      },
      {
        step: 4,
        title: "Instant Download",
        description: "Immediate access to high-resolution files (JPG, PNG, PDF)",
        icon: <Download className="h-5 w-5" />
      }
    ],
    features: [
      "Instant download after payment",
      "Multiple file formats included",
      "Personal & Commercial licensing",
      "Lifetime access to downloads"
    ]
  },
  {
    id: "bundles",
    title: "NFT Bundle Purchase",
    icon: <Archive className="h-8 w-8" />,
    description: "Complete NFT collections ready for minting",
    steps: [
      {
        step: 1,
        title: "Select Bundle",
        description: "Choose from 2K, 5K, or 10K NFT collection packages",
        icon: <Package className="h-5 w-5" />
      },
      {
        step: 2,
        title: "Review Contents",
        description: "See what's included: artwork, traits, metadata, and utilities",
        icon: <FileText className="h-5 w-5" />
      },
      {
        step: 3,
        title: "XRPL Payment",
        description: "Pay with XRP for the complete bundle package",
        icon: <CreditCard className="h-5 w-5" />
      },
      {
        step: 4,
        title: "ZIP Download",
        description: "Get organized ZIP file with all assets and launch guide",
        icon: <Archive className="h-5 w-5" />
      }
    ],
    features: [
      "Complete NFT collection packages",
      "Organized file structure",
      "Metadata and traits included",
      "Compatible with major marketplaces",
      "Launch guide included"
    ]
  },
  {
    id: "print",
    title: "Print-on-Demand",
    icon: <Printer className="h-8 w-8" />,
    description: "Physical prints delivered worldwide",
    steps: [
      {
        step: 1,
        title: "Choose Artwork",
        description: "Select from print-ready artworks in our collection",
        icon: <Image className="h-5 w-5" />
      },
      {
        step: 2,
        title: "Customize Options",
        description: "Select size, material, frame, and finish options",
        icon: <Palette className="h-5 w-5" />
      },
      {
        step: 3,
        title: "Pay & Order",
        description: "Secure payment with XRP and provide shipping details",
        icon: <CreditCard className="h-5 w-5" />
      },
      {
        step: 4,
        title: "Worldwide Delivery",
        description: "Professional printing and shipping to your address",
        icon: <Truck className="h-5 w-5" />
      }
    ],
    features: [
      "Premium quality materials",
      "Multiple size options",
      "Professional framing available",
      "Worldwide shipping",
      "7-14 business days delivery"
    ]
  }
]

const licenseTypes = [
  {
    type: "Personal",
    price: "From 15 XRP",
    features: [
      "Personal use only",
      "Social media sharing",
      "Personal projects",
      "Non-commercial use",
      "Single user license"
    ]
  },
  {
    type: "Commercial",
    price: "From 45 XRP",
    features: [
      "Commercial use allowed",
      "Marketing materials",
      "Business projects",
      "Resale rights included",
      "Multiple user license"
    ],
    popular: true
  }
]

const faqs = [
  {
    question: "What is XRPL and why do you use it?",
    answer: "XRPL (XRP Ledger) is a fast, secure, and eco-friendly blockchain. We use it for instant, low-cost payments with minimal environmental impact. All transactions are processed through XUMM wallet for maximum security."
  },
  {
    question: "How do I connect my XUMM wallet?",
    answer: "Download the XUMM app on your mobile device, create an account, and scan the QR code during checkout. XUMM is the most secure way to interact with XRPL and manage your XRP."
  },
  {
    question: "What file formats do I get with digital downloads?",
    answer: "Digital artworks include high-resolution JPG, PNG, and PDF files. NFT bundles include organized folders with artwork, traits, metadata JSON files, and a comprehensive launch guide."
  },
  {
    question: "Can I use the artwork commercially?",
    answer: "Yes, with a Commercial license. Personal licenses are for non-commercial use only. Commercial licenses allow business use, marketing materials, and resale rights."
  },
  {
    question: "What are holder benefits?",
    answer: "Verified holders get 50% off all print products (lifetime), 10% token bonus on purchases, priority customer support, and eligibility for exclusive airdrops and releases."
  },
  {
    question: "How long does shipping take?",
    answer: "Print products are professionally produced and shipped worldwide within 7-14 business days. You'll receive tracking information once your order ships."
  },
  {
    question: "What if I'm not satisfied with my purchase?",
    answer: "We offer a 30-day satisfaction guarantee on print products. Digital downloads are final sale due to their nature, but we're happy to help with any technical issues."
  },
  {
    question: "Are there any transaction fees?",
    answer: "XRPL transactions have minimal network fees (typically less than $0.01). There are no additional processing fees from our platform."
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple ways to get amazing art: download instantly, launch NFT collections, 
            or get beautiful prints delivered worldwide. All powered by XRPL blockchain.
          </p>
        </div>

        {/* Workflow Tabs */}
        <Tabs defaultValue="digital" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {workflows.map((workflow) => (
              <TabsTrigger key={workflow.id} value={workflow.id} className="flex items-center gap-2">
                {workflow.icon}
                <span className="hidden sm:inline">{workflow.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {workflows.map((workflow) => (
            <TabsContent key={workflow.id} value={workflow.id}>
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    {workflow.icon}
                  </div>
                  <CardTitle className="text-2xl">{workflow.title}</CardTitle>
                  <p className="text-muted-foreground">{workflow.description}</p>
                </CardHeader>
                <CardContent>
                  {/* Steps */}
                  <div className="grid md:grid-cols-4 gap-6 mb-8">
                    {workflow.steps.map((step, index) => (
                      <div key={step.step} className="text-center">
                        <div className="relative mb-4">
                          <div className="mx-auto w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-2">
                            {step.step}
                          </div>
                          {index < workflow.steps.length - 1 && (
                            <ArrowRight className="hidden md:block absolute top-5 -right-8 h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            {step.icon}
                            <h3 className="font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Key Features
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {workflow.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Licensing Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Licensing Options</h2>
            <p className="text-muted-foreground">
              Choose the right license for your needs. All licenses include lifetime access.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {licenseTypes.map((license) => (
              <Card key={license.type} className={`relative ${license.popular ? 'border-primary shadow-lg' : ''}`}>
                {license.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{license.type} License</CardTitle>
                  <div className="text-2xl font-bold text-primary">{license.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {license.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* XRPL Payment Section */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Why XRPL Payments?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Transactions settle in 3-5 seconds, much faster than traditional payments
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2">Ultra Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Built-in security features and decentralized validation ensure safe transactions
                </p>
              </div>
              <div className="text-center">
                <Globe className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Carbon-neutral blockchain with minimal environmental impact
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Getting Started with XUMM</h4>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Download XUMM app from App Store or Google Play</li>
                <li>Create your secure XRPL wallet</li>
                <li>Add XRP to your wallet (available on major exchanges)</li>
                <li>Scan QR codes during checkout for instant payments</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about Emotion Capsules
            </p>
          </div>
          
          <div className="grid gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-primary/10 to-purple-100 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Explore our collection and experience the future of digital art commerce
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/digital-arts">
                  <Download className="h-4 w-4 mr-2" />
                  Browse Digital Arts
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/nft-bundles">
                  <Archive className="h-4 w-4 mr-2" />
                  Explore NFT Bundles
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/print-products">
                  <Printer className="h-4 w-4 mr-2" />
                  Shop Prints
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}