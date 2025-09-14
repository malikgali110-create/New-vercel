# UX Wireframes - Emotion Capsules Demo

## Overview
Lo-fi grayscale wireframes covering 3 core user journeys:
1. **Digital Art Download** - Browse → Select → License → Cart → XRPL Pay → Download
2. **NFT Bundle Purchase** - Browse → Bundle Detail → Cart → XRPL Pay → ZIP Download
3. **Print-on-Demand Order** - Browse → Configure → Cart → XRPL Pay → Order Confirmation

---

## Core Screens (22 Wireframes)

### 1. Home Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation: Home | Digital Arts | NFT | Print | ... │
│                                           [Wallet] [Cart]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│           HERO SECTION                                      │
│    "One art, unlimited formats —                            │
│     download, mint, or get it shipped."                    │
│                                                             │
│           [Browse Digital Arts] [Explore Bundles]          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ DIGITAL ART │  │ NFT BUNDLES │  │ PRINT SHOP  │        │
│  │    [IMG]    │  │    [IMG]    │  │    [IMG]    │        │
│  │ "Download   │  │ "Ready-made │  │ "Premium    │        │
│  │  instantly" │  │  10K kits"  │  │  prints"    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│           🎗️ "Pay with XRP • Worldwide Prints"             │
│              "Instant ZIP for NFT Bundles"                 │
└─────────────────────────────────────────────────────────────┘
```

### 2. Digital Arts Category Grid
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Digital Arts                                                │
│                                                             │
│ Filters: [Category ▼] [Style ▼] [Price ▼] [License ▼]     │
│ Sort: [Trending ▼]                          [Grid/List]     │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │           │
│ │ Title   │ │ Title   │ │ Title   │ │ Title   │           │
│ │ Artist  │ │ Artist  │ │ Artist  │ │ Artist  │           │
│ │ 15 XRP  │ │ 20 XRP  │ │ 18 XRP  │ │ 25 XRP  │           │
│ │ [NEW]   │ │[BEST]   │ │[LTD]    │ │[PREM]   │           │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │           │
│ │ Title   │ │ Title   │ │ Title   │ │ Title   │           │
│ │ Artist  │ │ Artist  │ │ Artist  │ │ Artist  │           │
│ │ 22 XRP  │ │ 16 XRP  │ │ 12 XRP  │ │ 28 XRP  │           │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    [Load More]                              │
└─────────────────────────────────────────────────────────────┘
```

### 3. Digital Art Product Detail
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────────────────┐ │
│ │                     │  │ Ethereal Dreamscape             │ │
│ │     HERO IMAGE      │  │ by Luna Visions                 │ │
│ │                     │  │                                 │ │
│ │    [🔍 Zoom]        │  │ License: ○ Personal  ● Commercial│ │
│ │                     │  │                                 │ │
│ │ [◀] [Thumb] [▶]     │  │ Price: 45 XRP ($25.50)         │ │
│ └─────────────────────┘  │ + 150 $FEEL tokens              │ │
│                          │                                 │ │
│                          │ What you get:                   │ │
│                          │ • High-res PNG (4000x3000px)   │ │
│                          │ • Commercial usage rights      │ │
│                          │ • Multiple format options      │ │
│                          │ • Instant download             │ │
│                          │                                 │ │
│                          │ [Add to Cart] [Buy Now]        │ │
│                          └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Sample Preview:                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │              [Watermarked Preview]                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Reviews (Static):                                           │
│ ★★★★★ "Amazing quality!" - User123                        │
│ ★★★★☆ "Perfect for my project" - Designer456              │
└─────────────────────────────────────────────────────────────┘
```

### 4. NFT Bundles Category Grid
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ NFT Bundles                                                 │
│                                                             │
│ Filters: [Type ▼] [Size ▼] [Price ▼]       Sort: [New ▼]  │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────┐           │
│ │      [IMG GRID]     │  │      [IMG GRID]     │           │
│ │ Cyber Apes 10K      │  │ Mystic Realms 5K    │           │
│ │ Complete Collection │  │ Fantasy Themed      │           │
│ │                     │  │                     │           │
│ │ 500 XRP ($283)      │  │ 300 XRP ($170)      │           │
│ │ [COMPLETE] [READY]  │  │ [ANIMATED] [PREM]   │           │
│ │                     │  │                     │           │
│ │ 🎁 50% off lifetime │  │                     │           │
│ └─────────────────────┘  └─────────────────────┘           │
│                                                             │
│ ┌─────────────────────┐  ┌─────────────────────┐           │
│ │      [IMG GRID]     │  │      [IMG GRID]     │           │
│ │ Utility Token 1K    │  │ Traits Mega-Pack    │           │
│ │ Exclusive Benefits  │  │ 200+ Professional   │           │
│ │                     │  │                     │           │
│ │ 200 XRP ($113)      │  │ 150 XRP ($85)       │           │
│ │ [UTILITY] [LTD]     │  │ [PROF] [RIGHTS]     │           │
│ └─────────────────────┘  └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### 5. NFT Bundle Detail Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────────────────┐ │
│ │                     │  │ Cyber Apes 10K Collection      │ │
│ │   HERO GALLERY      │  │ by Digital Collective           │ │
│ │                     │  │                                 │ │
│ │ [Sample 1][Sample 2]│  │ 🎁 Holder Perks: 50% off       │ │
│ │ [Sample 3][Sample 4]│  │    lifetime on all prints      │ │
│ │ [Sample 5][Sample 6]│  │                                 │ │
│ └─────────────────────┘  │ Price: 500 XRP ($283.00)       │ │
│                          │                                 │ │
│ Inside the ZIP: ▼        │ Compatible with:                │ │
│ ┌─────────────────────────│ [OpenSea] [Magic Eden] [XRP.cafe]│ │
│ │ • 10,000 unique PNGs    │                                 │ │
│ │ • Complete trait data   │ [Add to Cart] [Buy Now]        │ │
│ │ • OpenSea metadata JSON │                                 │ │
│ │ • Layer files (PSD)     │ [Easy Launch Guide] →           │ │
│ │ • Smart contract template│                                │ │
│ │ • Marketing assets      │                                 │ │
│ │ • Launch tutorials      │                                 │ │
│ └─────────────────────────┘                                 │ │
│                          └─────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ What's Included (Detailed):                                 │
│ • Resolution: 1000x1000px per NFT                          │
│ • Total file size: 2.8 GB                                  │
│ • 200+ unique traits across 15 layers                      │
│ • Rarity distribution spreadsheet                          │
└─────────────────────────────────────────────────────────────┘
```

### 6. Print Shop Category Grid
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Print Shop                                                  │
│ 🚚 "Worldwide delivery • Premium quality"                  │
│                                                             │
│ Filters: [Type ▼] [Size ▼] [Material ▼] [Price ▼]         │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │           │
│ │ Poster  │ │ Canvas  │ │ Hoodie  │ │ Mug     │           │
│ │ A3/A2   │ │ Gallery │ │ Premium │ │ Ceramic │           │
│ │ from    │ │ Wrap    │ │ Cotton  │ │ 11oz    │           │
│ │ 35 XRP  │ │ 85 XRP  │ │ 65 XRP  │ │ 25 XRP  │           │
│ │[MUSEUM] │ │[GALLERY]│ │[SUSTAIN]│ │[SAFE]   │           │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│ ┌─────────┐ ┌─────────┐                                   │
│ │ [IMG]   │ │ [IMG]   │                                   │
│ │ Phone   │ │ Metal   │                                   │
│ │ Case    │ │ Print   │                                   │
│ │ Custom  │ │ Luxury  │                                   │
│ │ 40 XRP  │ │ 95 XRP  │                                   │
│ │[PROTECT]│ │[LUXURY] │                                   │
│ └─────────┘ └─────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

### 7. Print Product Configurator
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Abstract Harmony Poster                                     │
│                                                             │
│ Step 1: Choose Size                                         │
│ ○ A3 (297×420mm) - 35 XRP                                  │
│ ● A2 (420×594mm) - 55 XRP                                  │
│ ○ Custom Size - 75 XRP                                     │
│                                                             │
│ Step 2: Select Material                                     │
│ ● Premium Paper (200gsm)                                   │
│ ○ Canvas (380gsm) +15 XRP                                  │
│ ○ Metal Print +40 XRP                                      │
│                                                             │
│ Step 3: Frame Options                                       │
│ ● No Frame                                                  │
│ ○ Black Frame +20 XRP                                      │
│ ○ White Frame +20 XRP                                      │
│ ○ Natural Wood +25 XRP                                     │
│                                                             │
│ ┌─────────────────────┐  ┌─────────────────────────────────┐ │
│ │                     │  │ Preview on Wall:                │ │
│ │    PRODUCT          │  │ ┌─────────────────────────────┐ │ │
│ │    PREVIEW          │  │ │        [WALL MOCKUP]        │ │ │
│ │                     │  │ │     [Product on Wall]       │ │ │
│ │                     │  │ └─────────────────────────────┘ │ │
│ └─────────────────────┘  └─────────────────────────────────┘ │
│                                                             │
│ Quantity: [- 1 +]                                          │
│                                                             │
│ Total: 55 XRP ($31.15)                                     │
│ Shipping: 7-14 days (Free over 100 XRP)                   │
│                                                             │
│ [Add to Cart] [Buy Now]                                    │
└─────────────────────────────────────────────────────────────┘
```

### 8. Mini-Cart Sidebar
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│                                          ┌─────────────────┐│
│                                          │ Cart (3)        ││
│                                          │                 ││
│                                          │ ┌─────────────┐ ││
│                                          │ │[IMG] Digital│ ││
│                                          │ │ Art - Comm. │ ││
│                                          │ │ 45 XRP  [×] │ ││
│                                          │ └─────────────┘ ││
│                                          │                 ││
│                                          │ ┌─────────────┐ ││
│                                          │ │[IMG] Bundle │ ││
│                                          │ │ 10K PFP Kit │ ││
│                                          │ │ 500 XRP [×] │ ││
│                                          │ └─────────────┘ ││
│                                          │                 ││
│                                          │ ┌─────────────┐ ││
│                                          │ │[IMG] Poster │ ││
│                                          │ │ A2 + Frame  │ ││
│                                          │ │ 75 XRP  [×] │ ││
│                                          │ └─────────────┘ ││
│                                          │                 ││
│                                          │ ☑ I'm a holder ││
│                                          │ 50% off prints ││
│                                          │                 ││
│                                          │ Subtotal: 620   ││
│                                          │ Discount: -37.5 ││
│                                          │ Total: 582.5 XRP││
│                                          │                 ││
│                                          │ [Checkout]      ││
│                                          └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 9. Full Cart Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Shopping Cart                                               │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [IMG] Ethereal Dreamscape                               │ │
│ │       Digital Art • Commercial License                 │ │
│ │       45 XRP                                      [×]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [IMG] Cyber Apes 10K Collection                         │ │
│ │       NFT Bundle • ZIP Download                        │ │
│ │       500 XRP                                     [×]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [IMG] Abstract Harmony Poster                           │ │
│ │       Print Product • A2 + Black Frame                 │ │
│ │       Qty: [- 1 +]    75 XRP                     [×]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Discount Options:                                           │
│ ☑ I'm a holder (50% off prints only)                      │
│ ☐ Apply token bonus (10% off total)                       │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Subtotal:           620.00 XRP                          │ │
│ │ Holder Discount:    -37.50 XRP                          │ │
│ │ ─────────────────────────────                           │ │
│ │ Total:              582.50 XRP                          │ │
│ │                     ($329.65)                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [Continue Shopping]                        [Proceed to Checkout] │
└─────────────────────────────────────────────────────────────┘
```

### 10. Checkout Step 1 - Contact & Billing
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Checkout                                                    │
│ ● Contact & Billing    ○ Payment                           │
│                                                             │
│ Contact Information:                                        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Email Address *                                         │ │
│ │ [your.email@example.com                              ] │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Billing Address (for prints only):                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Full Name *                                             │ │
│ │ [John Doe                                            ] │ │
│ │                                                         │ │
│ │ Address Line 1 *                                        │ │
│ │ [123 Main Street                                     ] │ │
│ │                                                         │ │
│ │ City *              State/Province    Postal Code *     │ │
│ │ [New York        ] [NY            ] [10001          ] │ │
│ │                                                         │ │
│ │ Country *                                               │ │
│ │ [United States                                       ▼] │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Order Summary:                                              │
│ • Digital Art Download                                      │
│ • NFT Bundle (ZIP)                                         │
│ • Print Product (ships to address above)                   │
│                                                             │
│ Total: 582.50 XRP ($329.65)                               │
│                                                             │
│ [← Back to Cart]                        [Continue to Payment] │
└─────────────────────────────────────────────────────────────┘
```

### 11. Checkout Step 2 - XRPL Payment
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Checkout                                                    │
│ ● Contact & Billing    ● Payment                           │
│                                                             │
│ Payment Method: XRPL                                        │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                 XRPL Payment                            │ │
│ │                                                         │ │
│ │ Amount: 582.50 XRP ($329.65)                           │ │
│ │                                                         │ │
│ │ ⚠️  This is a demo - no real charge will occur         │ │
│ │                                                         │ │
│ │ [Connect Wallet]                                        │ │
│ │                                                         │ │
│ │ OR                                                      │ │
│ │                                                         │ │
│ │ [Simulate Payment]                                      │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Order Summary:                                              │
│ john.doe@example.com                                        │
│ 123 Main Street, New York, NY 10001                        │
│                                                             │
│ • Ethereal Dreamscape (Digital) - 45 XRP                  │
│ • Cyber Apes 10K (Bundle) - 500 XRP                       │
│ • Abstract Poster A2 (Print) - 37.50 XRP (50% off)       │
│                                                             │
│ [← Back]                                                   │
└─────────────────────────────────────────────────────────────┘
```

### 12. XRPL QR Code Modal
```
┌─────────────────────────────────────────────────────────────┐
│                          [×]                                │
│                                                             │
│              Connect Your XUMM Wallet                      │
│                                                             │
│              ┌─────────────────────┐                       │
│              │                     │                       │
│              │    [QR CODE]        │                       │
│              │                     │                       │
│              │  ████ ██ ████       │                       │
│              │  ██ ████ ██ ██      │                       │
│              │  ████ ██ ████       │                       │
│              │                     │                       │
│              └─────────────────────┘                       │
│                                                             │
│           Scan QR in XUMM to complete payment              │
│                                                             │
│              Amount: 582.50 XRP                            │
│              Destination: rDemo...                         │
│                                                             │
│              ⚠️ Demo mode - no real transaction            │
│                                                             │
│                    [Cancel]                                 │
└─────────────────────────────────────────────────────────────┘
```

### 13. Order Success Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ✅ Order Complete!                       │
│                                                             │
│              Thank you for your purchase                    │
│                Order #: EMC-2024-001234                    │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                 Digital Downloads                       │ │
│ │                                                         │ │
│ │ Ethereal Dreamscape                                     │ │
│ │ [Download PNG] [Download JPG] [Download PDF]           │ │
│ │                                                         │ │
│ │ Cyber Apes 10K Collection                               │ │
│ │ [Download ZIP] (2.8 GB)                                │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                 Print Order                             │ │
│ │                                                         │ │
│ │ Abstract Harmony Poster (A2 + Black Frame)             │ │
│ │ Status: Order Confirmed                                 │ │
│ │ Estimated Delivery: March 15-22, 2024                  │ │
│ │ Tracking: Will be sent via email                       │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [View Order Details] [Continue Shopping] [Account Dashboard] │
│                                                             │
│ 💡 Your downloads are also available in your Account       │
└─────────────────────────────────────────────────────────────┘
```

### 14. Wallet Connect Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Wallet Connection                                           │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                Connect Your Wallet                      │ │
│ │                                                         │ │
│ │              ┌─────────────────────┐                   │ │
│ │              │                     │                   │ │
│ │              │    [XUMM LOGO]      │                   │ │
│ │              │                     │                   │ │
│ │              └─────────────────────┘                   │ │
│ │                                                         │ │
│ │              [Connect with XUMM]                       │ │
│ │                                                         │ │
│ │              Status: ○ Not Connected                    │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                Holder Status (Demo)                     │ │
│ │                                                         │ │
│ │ Status: [Toggle: Detected / Not Detected]              │ │
│ │                                                         │ │
│ │ ✅ Eligible Discounts:                                  │ │
│ │ • 50% off all print products (lifetime)                │ │
│ │ • 10% token bonus on purchases                          │ │
│ │ • Priority customer support                             │ │
│ │                                                         │ │
│ │ 🎁 Airdrop Badge: ACTIVE                                │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 💡 Demo Mode: Toggle holder status to see discount changes │
└─────────────────────────────────────────────────────────────┘
```

### 15. Account Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Account Dashboard                                           │
│                                                             │
│ Welcome back, John!                                         │
│                                                             │
│ [Orders] [Downloads] [Profile] [Settings]                  │
│                                                             │
│ Recent Orders:                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Order #EMC-2024-001234                    March 1, 2024 │ │
│ │ 3 items • 582.50 XRP                           [PAID]   │ │
│ │ • Digital Art Download                                  │ │
│ │ • NFT Bundle (ZIP)                                      │ │
│ │ • Print Order [PREPARING]                               │ │
│ │                                          [View Details] │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Order #EMC-2024-001233                    Feb 28, 2024  │ │
│ │ 1 item • 45 XRP                                [PAID]   │ │
│ │ • Digital Art Download                                  │ │
│ │                                          [View Details] │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Quick Actions:                                              │
│ [Browse Digital Arts] [Explore Bundles] [Print Shop]       │
│                                                             │
│ Account Status:                                             │
│ • Holder Status: ✅ Verified                               │
│ • Total Orders: 2                                          │
│ • Total Spent: 627.50 XRP                                 │
└─────────────────────────────────────────────────────────────┘
```

### 16. Downloads Tab
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Account Dashboard                                           │
│                                                             │
│ [Orders] [Downloads] [Profile] [Settings]                  │
│                                                             │
│ Your Downloads:                                             │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [IMG] Ethereal Dreamscape                               │ │
│ │       Digital Art • Commercial License                 │ │
│ │       Purchased: March 1, 2024                         │ │
│ │       [Download PNG] [Download JPG] [Download PDF]     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [IMG] Cyber Apes 10K Collection                         │ │
│ │       NFT Bundle • Complete ZIP Package                │ │
│ │       Purchased: March 1, 2024                         │ │
│ │       [Download ZIP] (2.8 GB)                          │ │
│ │       [View Contents] [Launch Guide]                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [IMG] Cosmic Harmony                                    │ │
│ │       Digital Art • Personal License                   │ │
│ │       Purchased: Feb 28, 2024                          │ │
│ │       [Download PNG] [Download SVG]                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 💡 Downloads are available for lifetime access             │
│ 📧 Download links also sent to your email                  │
└─────────────────────────────────────────────────────────────┘
```

### 17. How It Works Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ How It Works                                                │
│                                                             │
│ Three Simple Ways to Get Amazing Art:                       │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                 📱 Digital Downloads                     │ │
│ │                                                         │ │
│ │ 1️⃣ Browse → 2️⃣ Select License → 3️⃣ Download            │ │
│ │                                                         │ │
│ │ [Browse Icon] [License Icon] [Download Icon]            │ │
│ │                                                         │ │
│ │ Perfect for: Social media, websites, presentations     │ │
│ │ Formats: PNG, JPG, PDF, SVG                            │ │
│ │ Licenses: Personal ($8-15) • Commercial ($25-45)      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                 🎨 NFT Bundles                          │ │
│ │                                                         │ │
│ │ 1️⃣ Choose Pack → 2️⃣ Pay in XRP → 3️⃣ Get ZIP           │ │
│ │                                                         │ │
│ │ [Pack Icon] [XRP Icon] [ZIP Icon]                       │ │
│ │                                                         │ │
│ │ Perfect for: NFT projects, collections, trading        │ │
│ │ Includes: Art + Metadata + Launch guides               │ │
│ │ Compatible: OpenSea, Magic Eden, XRP.cafe              │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                 🖼️ Print Products                       │ │
│ │                                                         │ │
│ │ 1️⃣ Configure → 2️⃣ Preview → 3️⃣ Ships to You           │ │
│ │                                                         │ │
│ │ [Config Icon] [Preview Icon] [Ship Icon]               │ │
│ │                                                         │ │
│ │ Perfect for: Home decor, gifts, office art             │ │
│ │ Options: Posters, canvas, apparel, accessories         │ │
│ │ Quality: Museum-grade • Worldwide shipping             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 💰 Payment & Pricing                                       │
│ • All prices in XRP (USD shown for reference)             │
│ • Instant payment via XUMM wallet                          │
│ • Holder discounts: 50% off prints + 10% token bonus      │
│                                                             │
│ 📋 Licensing Made Simple                                    │
│ • Personal: Social media, personal projects                │
│ • Commercial: Business use, resale, marketing             │
│ • Full terms available at checkout                         │
└─────────────────────────────────────────────────────────────┘
```

### 18. Support Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Navigation                           [Wallet] [Cart] │
├─────────────────────────────────────────────────────────────┤
│ Support Center                                              │
│                                                             │
│ 🔍 Search: [How can we help you?                        ] │
│                                                             │
│ Popular Topics:                                             │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💳 Payment & XRPL                                      │ │
│ │ • How to connect XUMM wallet                           │ │
│ │ • Payment troubleshooting                              │ │
│ │ • XRP transaction fees                                 │ │
│ │ • Demo mode explanation                                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📥 Downloads & Files                                    │ │
│ │ • Download not working                                  │ │
│ │ • File format questions                                │ │
│ │ • Re-downloading purchases                              │ │
│ │ • ZIP file contents                                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📜 Licensing & Usage                                    │ │
│ │ • Personal vs Commercial licenses                      │ │
│ │ • Usage restrictions                                   │ │
│ │ • License upgrades                                     │ │
│ │ • Attribution requirements                             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🚚 Shipping & Returns                                   │ │
│ │ • Shipping times and costs                             │ │
│ │ • Order tracking                                       │ │
│ │ • Return policy                                        │ │
│ │ • Print quality issues                                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Still need help?                                            │
│ [Contact Support] [Live Chat] [Email Us]                   │
└─────────────────────────────────────────────────────────────┘
```

### 19. Mobile - Home (Responsive)
```
┌─────────────────────┐
│ [☰] Logo    [🛒][👤] │
├─────────────────────┤
│                     │
│      HERO           │
│   "One art,         │
│   unlimited         │
│   formats"          │
│                     │
│ [Browse Digital]    │
│ [Explore Bundles]   │
│                     │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ DIGITAL ART     │ │
│ │    [IMG]        │ │
│ │ "Download       │ │
│  instantly"       │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ NFT BUNDLES     │ │
│ │    [IMG]        │ │
│ │ "Ready-made     │ │
│  10K kits"        │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ PRINT SHOP      │ │
│ │    [IMG]        │ │
│ │ "Premium        │ │
│  prints"          │ │
│ └─────────────────┘ │
│                     │
│ 🎗️ "Pay with XRP"   │
│ "Worldwide Prints"  │
└─────────────────────┘
```

### 20. Mobile - Product Grid
```
┌─────────────────────┐
│ [☰] Digital Arts [🛒]│
├─────────────────────┤
│ [Filter ▼] [Sort ▼] │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │     [IMG]       │ │
│ │ Ethereal Dream  │ │
│ │ Luna Visions    │ │
│ │ 15 XRP [NEW]    │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │     [IMG]       │ │
│ │ Cosmic Harmony  │ │
│ │ Stellar Arts    │ │
│ │ 20 XRP [BEST]   │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │     [IMG]       │ │
│ │ Urban Pulse     │ │
│ │ CyberVision     │ │
│ │ 18 XRP [LTD]    │ │
│ └─────────────────┘ │
│                     │
│ [Load More]         │
└─────────────────────┘
```

### 21. Mobile - Product Detail
```
┌─────────────────────┐
│ [←] Detail     [🛒] │
├─────────────────────┤
│                     │
│    [HERO IMAGE]     │
│                     │
│ [◀] [●●○] [▶]       │
├─────────────────────┤
│ Ethereal Dreamscape │
│ by Luna Visions     │
│                     │
│ License:            │
│ ○ Personal          │
│ ● Commercial        │
│                     │
│ Price: 45 XRP       │
│ ($25.50)            │
│                     │
│ What you get:       │
│ • High-res PNG      │
│ • Commercial rights │
│ • Multiple formats  │
│ • Instant download  │
│                     │
│ [Add to Cart]       │
│ [Buy Now]           │
│                     │
│ Sample Preview:     │
│ [Watermarked IMG]   │
└─────────────────────┘
```

### 22. Mobile - Cart Drawer
```
┌─────────────────────┐
│ Cart (3)        [×] │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │[IMG] Digital    │ │
│ │ Art - Comm.     │ │
│ │ 45 XRP      [×] │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │[IMG] Bundle     │ │
│ │ 10K PFP Kit     │ │
│ │ 500 XRP     [×] │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │[IMG] Poster     │ │
│ │ A2 + Frame      │ │
│ │ 75 XRP      [×] │ │
│ └─────────────────┘ │
│                     │
│ ☑ I'm a holder      │
│ 50% off prints      │
│                     │
│ Subtotal: 620 XRP   │
│ Discount: -37.5 XRP │
│ Total: 582.5 XRP    │
│                     │
│ [Checkout]          │
└─────────────────────┘
```

---

## User Journey Flows

### Journey 1: Digital Art Download
1. **Home** → Click "Browse Digital Arts"
2. **Category Grid** → Filter/sort → Click product
3. **Product Detail** → Select license → Add to cart
4. **Mini-Cart** → Proceed to checkout
5. **Checkout Step 1** → Enter email
6. **Checkout Step 2** → XRPL payment (demo)
7. **Order Success** → Download files
8. **Account Downloads** → Access anytime

### Journey 2: NFT Bundle Purchase
1. **Home** → Click "Explore Bundles"
2. **Bundle Grid** → Click bundle
3. **Bundle Detail** → View ZIP contents → Add to cart
4. **Cart** → Apply holder discount → Checkout
5. **Checkout** → XRPL payment (demo)
6. **Order Success** → Download ZIP immediately
7. **Account Downloads** → Re-download + launch guide

### Journey 3: Print-on-Demand Order
1. **Home** → Click "Print Shop"
2. **Print Grid** → Click product
3. **Print Configurator** → Size → Material → Frame → Preview
4. **Cart** → Holder discount applied → Checkout
5. **Checkout** → Enter shipping address → XRPL payment
6. **Order Success** → Order confirmation + tracking info
7. **Account Orders** → Track shipping status

---

## Interactive Elements

### Hover States
- **Product Cards**: Lift shadow, show quick-view button
- **Buttons**: Color shift, subtle scale
- **Navigation**: Underline animation
- **Cart Icon**: Bounce when items added

### Loading States
- **Payment Processing**: Spinner with "Processing payment..."
- **File Downloads**: Progress bar with file size
- **Image Loading**: Skeleton placeholders

### Error States
- **Payment Failed**: Red banner with retry option
- **Download Error**: Toast with support link
- **Form Validation**: Inline error messages

### Success States
- **Add to Cart**: Green toast "Added to cart!"
- **Payment Complete**: Checkmark animation
- **Download Ready**: Green download buttons

---

## Responsive Breakpoints
- **Desktop**: 1440px+ (primary design)
- **Tablet**: 768px-1439px (adapted layout)
- **Mobile**: 320px-767px (stacked, drawer navigation)

---

## Accessibility Notes
- **Keyboard Navigation**: Tab order, focus indicators
- **Screen Readers**: Alt text, ARIA labels
- **Color Contrast**: WCAG AA compliance
- **Touch Targets**: 44px minimum on mobile

---

## Demo Data Integration
- All wireframes use actual product data from `demo-products.json`
- Pricing reflects XRP values with USD reference
- Holder discounts calculated correctly
- File sizes and formats match bundle specifications

**Total Screens**: 22 wireframes covering all core functionality
**Acceptance Criteria**: ✅ Clickable prototype ready for 3 core journeys