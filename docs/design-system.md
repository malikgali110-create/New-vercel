# Emotion Capsules - Visual Design System

## Color Palette

### Primary Colors

#### Background Colors (Warm Off-White)
- **Primary Background**: `#fefcf9` - Main page background
- **Secondary Background**: `#f9f6f2` - Card backgrounds, sections
- **Tertiary Background**: `#f5f2ed` - Subtle variations

#### Text Colors (Near-Black Ink)
- **Primary Text**: `#1a1a1a` - Headlines, primary content
- **Secondary Text**: `#2d2d2d` - Body text, descriptions
- **Muted Text**: `#666666` - Captions, metadata

### Brand Colors

#### Orange (Primary Accent)
- **Orange 500**: `#f97316` - Primary buttons, links, highlights
- **Orange 400**: `#fb923c` - Hover states
- **Orange 600**: `#ea580c` - Active states
- **Orange 100**: `#ffedd5` - Light backgrounds
- **Orange 50**: `#fff7ed` - Subtle highlights

#### Aqua XRPL (Secondary Accent)
- **Aqua 500**: `#06b6d4` - XRPL-related elements, wallet buttons
- **Aqua 400**: `#22d3ee` - Hover states
- **Aqua 600**: `#0891b2` - Active states
- **Aqua 100**: `#cffafe` - Light backgrounds
- **Aqua 50**: `#ecfeff` - Subtle highlights

#### Gold (Premium)
- **Gold 500**: `#f59e0b` - Premium badges, holder benefits
- **Gold 400**: `#fbbf24` - Hover states
- **Gold 600**: `#d97706` - Active states
- **Gold 100**: `#fef3c7` - Light backgrounds
- **Gold 50**: `#fffbeb` - Subtle highlights

### Cool Gray Palette
- **Gray 100**: `#f1f5f9` - Subtle borders, dividers
- **Gray 200**: `#e2e8f0` - Input borders, card borders
- **Gray 300**: `#cbd5e1` - Disabled states
- **Gray 400**: `#94a3b8` - Placeholder text
- **Gray 500**: `#64748b` - Secondary text
- **Gray 600**: `#475569` - Icons, labels
- **Gray 700**: `#334155` - Dark text
- **Gray 800**: `#1e293b` - Headers
- **Gray 900**: `#0f172a` - High contrast text

## Typography

### Font Families
- **Headlines**: Elegant serif font (Playfair Display, Georgia, serif)
- **Body Text**: Clean sans-serif (Inter, system-ui, sans-serif)
- **Code/Monospace**: JetBrains Mono, Consolas, monospace

### Type Scale

#### Headlines (Serif)
- **H1**: 48px / 3rem - Hero headlines
- **H2**: 36px / 2.25rem - Section headers
- **H3**: 30px / 1.875rem - Subsection headers
- **H4**: 24px / 1.5rem - Card titles
- **H5**: 20px / 1.25rem - Small headers
- **H6**: 18px / 1.125rem - Captions

#### Body Text (Sans-serif)
- **Large**: 18px / 1.125rem - Lead paragraphs
- **Base**: 16px / 1rem - Standard body text
- **Small**: 14px / 0.875rem - Captions, metadata
- **XSmall**: 12px / 0.75rem - Fine print, labels

### Font Weights
- **Light**: 300 - Elegant headlines
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasis
- **Semibold**: 600 - Subheadings
- **Bold**: 700 - Strong emphasis
- **Black**: 900 - Display headlines

## Component Library

### 1. Navigation Bar (Compact)
```css
.navbar {
  background: rgba(254, 252, 249, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--gray-200);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
}
```

### 2. Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--orange-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--orange-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}
```

#### Secondary Button (Subtle)
```css
.btn-secondary {
  background: var(--gray-100);
  color: var(--text-primary);
  border: 1px solid var(--gray-200);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
}

.btn-secondary:hover {
  background: var(--gray-200);
  border-color: var(--gray-300);
}
```

#### XRPL Button
```css
.btn-xrpl {
  background: var(--aqua-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}

.btn-xrpl:hover {
  background: var(--aqua-600);
}
```

### 3. Cards
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
```

### 4. Badges

#### NEW Badge
```css
.badge-new {
  background: var(--orange-500);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
```

#### Bestseller Badge
```css
.badge-bestseller {
  background: var(--gold-500);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
```

#### Limited Badge
```css
.badge-limited {
  background: var(--gray-800);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
```

### 5. Filter Chips
```css
.filter-chip {
  background: var(--gray-100);
  color: var(--text-secondary);
  border: 1px solid var(--gray-200);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-chip:hover {
  background: var(--gray-200);
}

.filter-chip.active {
  background: var(--orange-500);
  color: white;
  border-color: var(--orange-500);
}
```

### 6. Modal
```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}
```

### 7. Stepper (Checkout)
```css
.stepper {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.step {
  display: flex;
  align-items: center;
  color: var(--gray-400);
}

.step.active {
  color: var(--orange-500);
}

.step.completed {
  color: var(--success-500);
}
```

## Imagery Guidelines

### Photography Style
- **Lighting**: Soft, natural lighting with minimal harsh shadows
- **Composition**: Clean, minimal backgrounds
- **Color Grading**: Warm, slightly desaturated tones
- **Mood**: Premium, sophisticated, approachable

### Product Images
- **Aspect Ratio**: 4:3 for grid thumbnails, 16:9 for hero images
- **Resolution**: Minimum 1200px width for hero images
- **Format**: WebP preferred, JPEG fallback
- **Optimization**: Compressed for web without quality loss

### Shadows and Depth
- **Subtle Shadows**: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)`
- **Elevated Elements**: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)`
- **Floating Elements**: `box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15)`

## Usage Examples

### Hero Section
```html
<section class="hero bg-primary text-primary">
  <h1 class="text-4xl font-light serif mb-4">
    One art, unlimited formats
  </h1>
  <p class="text-lg text-secondary mb-8">
    Download, mint, or get it shipped.
  </p>
  <button class="btn-primary">
    Explore Collections
  </button>
</section>
```

### Product Card
```html
<div class="card product-card">
  <div class="relative">
    <img src="..." alt="..." class="w-full h-48 object-cover rounded-lg">
    <div class="badge-new absolute top-2 right-2">NEW</div>
  </div>
  <h3 class="text-lg font-semibold mt-4">Digital Landscape</h3>
  <p class="text-muted text-sm">by Artist Name</p>
  <div class="flex items-center justify-between mt-4">
    <span class="text-lg font-bold">25 XRP</span>
    <button class="btn-primary btn-sm">Add to Cart</button>
  </div>
</div>
```

### XRPL Payment Section
```html
<div class="xrpl-payment bg-aqua-50 border border-aqua-200 rounded-lg p-6">
  <div class="flex items-center mb-4">
    <div class="w-8 h-8 bg-aqua-500 rounded-full flex items-center justify-center">
      <span class="text-white font-bold text-sm">XRP</span>
    </div>
    <h3 class="ml-3 text-lg font-semibold">Pay with XRPL</h3>
  </div>
  <p class="text-muted mb-4">Scan QR in XUMM. This is a demo — no real charge.</p>
  <button class="btn-xrpl w-full">Connect Wallet</button>
</div>
```

## Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## Accessibility
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus States**: Visible focus indicators on all interactive elements
- **Alt Text**: Descriptive alt text for all images
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML and ARIA labels where needed

## Animation Guidelines
- **Duration**: 200ms for micro-interactions, 300ms for transitions
- **Easing**: `ease-out` for entrances, `ease-in` for exits
- **Hover Effects**: Subtle transforms and color changes
- **Loading States**: Smooth skeleton screens and spinners

This design system ensures consistency across all Emotion Capsules interfaces while maintaining the premium, sophisticated aesthetic required for the XRPL-powered art marketplace.