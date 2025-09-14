import { DemoPopup } from "@/components/demo-popup"
import { CollectionPack } from "@/components/collection-pack"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      <div className="bg-brand-primary text-white py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <EnhancedHeader />

      <div className="container mx-auto px-4 py-8">
        <CollectionPack />
      </div>

      <FloatingActionMenu />
    </div>
  )
}
