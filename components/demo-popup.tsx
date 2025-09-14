"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Sparkles, Rocket } from "lucide-react"

export function DemoPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup after 1 second delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-orange-100 rounded-full">
              <Rocket className="h-5 w-5 text-orange-600" />
            </div>
            <DialogTitle className="text-xl font-bold">Demo Website</DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                This frontend is being showcased as a fully working website that is not yet live.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Final testing is in progress and will be launched soon before the{" "}
                <Badge variant="secondary" className="mx-1 bg-purple-100 text-purple-700">
                  @emotioncapsules
                </Badge>
                NFT collection launch.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-purple-50 p-3 rounded-lg border">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> All features are currently in frontend showcase mode. 
                Real transactions and wallet integrations will be available soon!
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 mt-4">
          <Button 
            onClick={() => setIsOpen(false)} 
            className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white"
          >
            Explore Demo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="px-4"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}