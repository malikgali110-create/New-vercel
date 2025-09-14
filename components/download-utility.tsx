"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  FileJson,
  Image as ImageIcon,
  Printer,
  Shirt,
  Coffee,
  Frame,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  FileArchive,
  FileImage,
  FileText,
  Palette,
  Crown
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface DownloadFile {
  id: string
  name: string
  type: "metadata" | "images" | "license" | "certificate"
  format: string
  size: string
  url: string
  description: string
  premium?: boolean
}

interface PrintOption {
  id: string
  name: string
  category: "wall-art" | "apparel" | "accessories" | "home-decor"
  sizes: { size: string; price: number }[]
  description: string
  icon: React.ReactNode
  estimatedDelivery: string
}

interface DownloadUtilityProps {
  itemId: string
  itemName: string
  itemType: "nft" | "digital-art" | "physical-art" | "collection"
  downloadFiles: DownloadFile[]
  printOptions: PrintOption[]
  isPremium?: boolean
  files?: DownloadFile[]
  productId?: string
  productTitle?: string
  selectedFormat?: string
  price?: number
}

const defaultPrintOptions: PrintOption[] = [
  {
    id: "wall-art",
    name: "Wall Art Prints",
    category: "wall-art",
    sizes: [
      { size: "8x10 inches", price: 15 },
      { size: "11x14 inches", price: 25 },
      { size: "16x20 inches", price: 35 },
      { size: "18x24 inches", price: 45 },
      { size: "24x36 inches", price: 65 },
      { size: "30x40 inches", price: 85 }
    ],
    description: "High-quality canvas or paper prints perfect for home or office decoration",
    icon: <Frame className="h-5 w-5" />,
    estimatedDelivery: "5-7 business days"
  },
  {
    id: "t-shirts",
    name: "T-Shirt Prints",
    category: "apparel",
    sizes: [
      { size: "Small", price: 18 },
      { size: "Medium", price: 18 },
      { size: "Large", price: 18 },
      { size: "X-Large", price: 20 },
      { size: "XX-Large", price: 22 }
    ],
    description: "Premium cotton t-shirts with high-quality digital prints",
    icon: <Shirt className="h-5 w-5" />,
    estimatedDelivery: "7-10 business days"
  },
  {
    id: "mugs",
    name: "Coffee Mugs",
    category: "home-decor",
    sizes: [
      { size: "11oz Standard", price: 12 },
      { size: "15oz Large", price: 15 },
      { size: "20oz Travel Mug", price: 22 }
    ],
    description: "Ceramic mugs with vibrant, dishwasher-safe prints",
    icon: <Coffee className="h-5 w-5" />,
    estimatedDelivery: "5-7 business days"
  },
  {
    id: "caps",
    name: "Caps & Hats",
    category: "accessories",
    sizes: [
      { size: "Adjustable Cap", price: 18 },
      { size: "Fitted Small", price: 20 },
      { size: "Fitted Medium", price: 20 },
      { size: "Fitted Large", price: 20 },
      { size: "Beanie", price: 16 }
    ],
    description: "Stylish caps and beanies with embroidered or printed designs",
    icon: <Crown className="h-5 w-5" />,
    estimatedDelivery: "7-10 business days"
  }
]

export function DownloadUtility({
  itemId,
  itemName,
  itemType,
  downloadFiles,
  printOptions = defaultPrintOptions,
  isPremium = false,
  files,
  productId,
  productTitle,
  selectedFormat,
  price
}: DownloadUtilityProps) {
  const [selectedOption, setSelectedOption] = useState<"digital" | "print">("digital")
  const [selectedPrintItem, setSelectedPrintItem] = useState<PrintOption | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({})
  const [isDownloading, setIsDownloading] = useState<{ [key: string]: boolean }>({})

  // Generate default files if not provided
  const defaultFiles: DownloadFile[] = [
    {
      id: "high-res",
      name: `${productTitle || itemName || 'Artwork'} - High Resolution`,
      type: "images",
      format: "PNG",
      size: "15.2 MB",
      url: "/api/download/high-res",
      description: "Original high-resolution artwork (4000x4000px, 300 DPI)"
    },
    {
      id: "print-ready",
      name: `${productTitle || itemName || 'Artwork'} - Print Ready`,
      type: "images",
      format: "PDF",
      size: "8.7 MB",
      url: "/api/download/print-ready",
      description: "Optimized for professional printing"
    },
    {
      id: "license",
      name: "Commercial License",
      type: "license",
      format: "PDF",
      size: "124 KB",
      url: "/api/download/license",
      description: "Usage rights and licensing terms"
    },
    {
      id: "palette",
      name: "Color Palette",
      type: "metadata",
      format: "ASE",
      size: "45 KB",
      url: "/api/download/palette",
      description: "Adobe Swatch Exchange file with color codes"
    }
  ]

  const finalDownloadFiles = files || downloadFiles || defaultFiles

  const handleDownload = async (file: DownloadFile) => {
    if (file.premium && !isPremium) {
      toast({
        title: "Premium Required",
        description: "This file requires a premium account or purchase.",
        variant: "destructive"
      })
      return
    }

    setIsDownloading(prev => ({ ...prev, [file.id]: true }))
    setDownloadProgress(prev => ({ ...prev, [file.id]: 0 }))

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[file.id] || 0
        if (currentProgress >= 100) {
          clearInterval(interval)
          setIsDownloading(prev => ({ ...prev, [file.id]: false }))
          
          // Create download link
          const link = document.createElement('a')
          link.href = file.url
          link.download = `${itemName}-${file.name}.${file.format}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          toast({
            title: "Download Complete",
            description: `${file.name} has been downloaded successfully.`
          })
          
          return prev
        }
        return { ...prev, [file.id]: currentProgress + Math.random() * 15 }
      })
    }, 200)
  }

  const handlePrintOrder = () => {
    if (!selectedPrintItem || !selectedSize) {
      toast({
        title: "Selection Required",
        description: "Please select a print option and size.",
        variant: "destructive"
      })
      return
    }

    const selectedSizeOption = selectedPrintItem.sizes.find(s => s.size === selectedSize)
    if (!selectedSizeOption) return

    toast({
      title: "Added to Cart",
      description: `${selectedPrintItem.name} (${selectedSize}) - $${selectedSizeOption.price} added to cart.`
    })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "metadata":
        return <FileJson className="h-4 w-4" />
      case "images":
        return <FileImage className="h-4 w-4" />
      case "license":
        return <FileText className="h-4 w-4" />
      case "certificate":
        return <FileArchive className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Download & Print Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedOption} onValueChange={(value) => setSelectedOption(value as "digital" | "print")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="digital" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Digital Download</span>
            </TabsTrigger>
            <TabsTrigger value="print" className="flex items-center space-x-2">
              <Printer className="h-4 w-4" />
              <span>Print on Demand</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="digital" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Download Package Contents</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  {selectedFormat ? `Selected format: ${selectedFormat}` : 'Choose your preferred resolution above'}
                </p>
                <div className="text-sm text-blue-600">
                  Total files: {finalDownloadFiles.length} • Package size: ~25 MB
                </div>
              </div>
              
              <div className="space-y-3">
                {finalDownloadFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="font-medium flex items-center space-x-2">
                          <span>{file.name}</span>
                          {file.premium && (
                            <Badge variant="secondary" className="text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {file.description} • {file.format.toUpperCase()} • {file.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isDownloading[file.id] && (
                        <div className="w-24">
                          <Progress value={downloadProgress[file.id] || 0} className="h-2" />
                        </div>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleDownload(file)}
                        disabled={isDownloading[file.id]}
                        variant={file.premium && !isPremium ? "outline" : "default"}
                      >
                        {isDownloading[file.id] ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-900">License Information</div>
                  <div className="text-blue-700 mt-1">
                    Downloaded files include commercial usage rights. Please review the license agreement for specific terms and conditions.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="print" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {printOptions.map((option) => (
                <Card 
                  key={option.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPrintItem?.id === option.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedPrintItem(option)
                    setSelectedSize("")
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {option.icon}
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-muted-foreground">{option.estimatedDelivery}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {option.description}
                    </div>
                    <div className="text-sm font-medium">
                      From ${Math.min(...option.sizes.map(s => s.price))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedPrintItem && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedPrintItem.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Size & Price:</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose size..." />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPrintItem.sizes.map((sizeOption) => (
                          <SelectItem key={sizeOption.size} value={sizeOption.size}>
                            {sizeOption.size} - ${sizeOption.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedSize && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-green-900">
                            {selectedPrintItem.name} - {selectedSize}
                          </div>
                          <div className="text-sm text-green-700">
                            Estimated delivery: {selectedPrintItem.estimatedDelivery}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-green-900">
                          ${selectedPrintItem.sizes.find(s => s.size === selectedSize)?.price}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full" 
                    onClick={handlePrintOrder}
                    disabled={!selectedSize}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-amber-900">Print Quality Guarantee</div>
                  <div className="text-amber-700 mt-1">
                    All prints are produced using premium materials and professional printing equipment. 
                    We offer a 30-day satisfaction guarantee on all print orders.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default DownloadUtility