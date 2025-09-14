import { DownloadManager } from "@/components/download-manager"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <EnhancedHeader />

      <div className="container mx-auto px-4 py-8">
        <DownloadManager />
      </div>

      <FloatingActionMenu />
    </div>
  )
}
