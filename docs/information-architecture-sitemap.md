# Emotion Capsules - Information Architecture & Sitemap

## Navigation Structure

### Top Navigation (Primary)
- **Home** - Landing page with hero + category tiles
- **Digital Arts** - Digital art collection grid
- **NFT Bundles** - NFT bundle packages (ZIP downloads)
- **Print Shop** - Print-on-demand products
- **How It Works** - Process explanation & FAQ
- **Pricing** - Pricing tiers and licensing info
- **Wallet** - XRPL wallet connection & holder status
- **Account** - User dashboard (orders, downloads, settings)
- **Support** - Help center & contact

### Footer Navigation (Secondary)
- **About** - Company information
- **Licensing** - License types and usage rights
- **Shipping** - Shipping policies and rates
- **Refunds** - Return and refund policies
- **Terms** - Terms of service
- **Privacy** - Privacy policy
- **XRPL FAQ** - XRPL payment help
- **Contact** - Contact information

## Page Structure & Flows

### Core Demo Pages

#### 1. Home Page (`/`)
- Hero section with main value proposition
- 3 category tiles (Digital Arts, NFT Bundles, Print Shop)
- "Pay with XRP" ribbon/banner
- Featured products carousel
- Stats/testimonials section

#### 2. Product Listing Pages
- **Digital Arts** (`/digital-arts`)
- **NFT Bundles** (`/nft-bundles`) 
- **Print Shop** (`/print-products`)

**Features:**
- Grid layout with product cards
- Filters: Category, Style, Color, Price (XRP), License, File-type
- Sort options: Trending, New, Price
- Badges: NEW, Bestseller, Limited
- Quick-view modal with add-to-cart

#### 3. Product Detail Pages
- **Digital Art Detail** (`/product/[id]`)
  - Hero gallery with zoom
  - License selector (Personal/Commercial)
  - Price in XRP + $FEEL display
  - "What you get" bullets
  - Sample preview
  - Reviews (static)
  - Add to Cart + Buy Now CTAs

- **Bundle Detail** (`/bundle/[id]`)
  - "Inside the ZIP" accordion
  - Marketplace compatibility icons (XRP.cafe, OpenSea, Magic Eden)
  - "Easy Launch Guide" link
  - Holder Perks ribbon (50% off demo)
  - Instant download on purchase

- **Print Product Detail** (`/print/[id]`)
  - Size selector (A3/A2/Custom)
  - Material options (Paper, Canvas, Metal)
  - Frame options
  - Wall preview mockup
  - Quantity selector
  - Shipping banner: "Worldwide delivery • Premium quality"
  - Dynamic price updates

#### 4. Cart & Checkout Flow
- **Mini-Cart Sidebar** - Slide-out from any page
- **Full Cart Page** (`/cart`)
  - Line items with type badges (Digital/Bundle/Print)
  - License badges
  - Quantity controls
  - Remove items
  - Discount toggles:
    - "I'm a holder" → 50% off prints only
    - Token bonus → 10% off cart (mutually exclusive)
  - Totals with savings display

- **Checkout Page** (`/checkout`)
  - Step 1: Contact & billing info
    - Email only for digital downloads
    - Full address for print products
  - Step 2: XRPL Payment
    - "Connect Wallet" → QR modal (static)
    - "Simulate Payment" → Success state
    - Payment timer (5 minutes)

#### 5. Order Success & Account
- **Payment Success** (`/payment-success`)
  - Order confirmation number
  - Download buttons (digital/bundles)
  - Shipping ETA (print products)
  - Account link for future access

- **Account Dashboard** (`/account`)
  - Orders tab: Past orders with status badges
  - Downloads tab: Digital art + bundles with download buttons
  - Settings tab: Profile and preferences

#### 6. Wallet Integration
- **Wallet Page** (`/wallet`)
  - Connect with XUMM (static demo)
  - Holder Status: Detected/Not Detected (toggle)
  - Eligible Discounts display
  - Airdrop Badge (static)
  - Transaction history

#### 7. Information Pages
- **How It Works** (`/how-it-works`)
  - 3 flow explanations with visuals:
    1. Digital Art Download
    2. NFT Bundle Purchase
    3. Print-on-Demand Order
  - Licensing table
  - XRPL payment explainer
  - Shipping & Refunds info

- **Pricing** (`/pricing`)
  - License comparison table
  - Bundle pricing tiers
  - Print product pricing
  - Holder benefits

## User Journey Flows

### Journey 1: Digital Art Download
```
Home → Digital Arts → Select Art → Choose License → Add to Cart → 
Checkout → XRPL Payment → Success → Downloads Page
```

### Journey 2: NFT Bundle Purchase (ZIP)
```
Home → NFT Bundles → "10K PFP Kit" → View ZIP Contents → 
Add to Cart → Checkout → XRPL Payment → Success → Instant Download
```

### Journey 3: Print-on-Demand Order
```
Home → Print Shop → Select Poster → Choose Size/Material/Frame → 
Add to Cart → Checkout → XRPL Payment → Success → Order Confirmation
```

## Technical Implementation Notes

### URL Structure
- `/` - Home
- `/digital-arts` - Digital art listing
- `/nft-bundles` - NFT bundle listing  
- `/print-products` - Print product listing
- `/product/[id]` - Individual product pages
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/payment-success` - Order confirmation
- `/account` - User dashboard
- `/wallet` - Wallet management
- `/how-it-works` - Information page
- `/pricing` - Pricing information

### State Management
- Cart state (items, totals, discounts)
- Wallet connection status
- Holder status (affects pricing)
- User authentication
- Order history

### Key Features
- Responsive design (desktop, tablet, mobile)
- XRPL wallet integration (demo mode)
- Dynamic pricing based on holder status
- Instant downloads for digital products
- Print product customization
- Real-time cart updates
- Payment simulation

## Success Metrics
- All 3 user journeys are clickable and complete
- No dead-end pages or broken links
- Consistent navigation across all screens
- Mobile-responsive design
- XRPL payment demo functional
- Holder discount system working
- Download system operational for demo