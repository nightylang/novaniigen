import type { Product } from '../types/fashion'

export const PRODUCTS: Product[] = [
  {
    id: 'nova-coat-01',
    name: 'The Architectural Wool Overcoat',
    subtitle: 'Double-breasted tailored virgin wool coat with structured shoulders',
    category: 'outerwear',
    gender: 'unisex',
    price: 680,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 42,
    badge: 'BESTSELLER',
    inStock: true,
    stockCount: 4,
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B', bgClass: 'bg-[#C19A6B]', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Onyx Black', hex: '#1C1C1E', bgClass: 'bg-[#1C1C1E]', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Raw Ivory', hex: '#EAE6DF', bgClass: 'bg-[#EAE6DF]', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sculpted from heavy Italian double-faced melton wool, the Architectural Overcoat features sharp peak lapels, horn buttons, and a clean ankle-length silhouette. Engineered for warmth with effortless drape.',
    details: [
      'Tailored regular fit with subtle shoulder architecture',
      'Satin-lined sleeves for effortless layering',
      'Deep welt pockets and interior breast pocket',
      'Signature horn button closure',
      'Back vent for fluid movement'
    ],
    composition: '90% Italian Virgin Wool, 10% Cashmere. Lining: 100% Cupro.',
    care: 'Specialist dry clean only. Cool iron under pressing cloth.',
    collection: 'autumn-winter',
    featured: true,
    hotspot: { x: 38, y: 45, label: 'Architectural Overcoat — $680' }
  },
  {
    id: 'nova-suit-02',
    name: 'Monochrome Relaxed Blazer',
    subtitle: 'Contemporary unstructured blazer in fluid fluid crepe wool',
    category: 'tailoring',
    gender: 'women',
    price: 490,
    originalPrice: 580,
    rating: 4.8,
    reviewsCount: 29,
    badge: 'NEW',
    inStock: true,
    stockCount: 8,
    colors: [
      { name: 'Onyx Noir', hex: '#18181B', bgClass: 'bg-[#18181B]', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Chalk White', hex: '#F4F4F5', bgClass: 'bg-[#F4F4F5]', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Muted Sage', hex: '#879782', bgClass: 'bg-[#879782]', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A modern translation of tailored elegance. Cut with a slightly dropped shoulder and fluid drape, this blazer transcends day-to-night styling effortlessly.',
    details: [
      'Relaxed, slightly boxy silhouette',
      'Single-button stance with concealed button placket',
      'Fully canvassed chest piece',
      'Hand-stitched pick stitch detailing along lapel'
    ],
    composition: '100% Super 120s High-Twist Wool Crepe.',
    care: 'Dry clean only.',
    collection: 'signature-minimal',
    featured: true
  },
  {
    id: 'nova-knit-03',
    name: 'Heavyweight Cashmere Ribbed Turtleneck',
    subtitle: '7-gauge pure Mongolian cashmere with seamless raglan knit',
    category: 'knitwear',
    gender: 'unisex',
    price: 395,
    rating: 5.0,
    reviewsCount: 56,
    badge: 'BESTSELLER',
    inStock: true,
    stockCount: 12,
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7CEBE', bgClass: 'bg-[#D7CEBE]', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Espresso Brown', hex: '#3B2F2F', bgClass: 'bg-[#3B2F2F]', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Slate Gray', hex: '#52525B', bgClass: 'bg-[#52525B]', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Crafted from sustainably combed Inner Mongolian cashmere, spun with high tensile twist to resist pilling while retaining unmatched softness and thermal warmth.',
    details: [
      'Substantial 7-gauge dense fisherman rib',
      'Fold-over roll neck with reinforced rib collar',
      'Ribbed cuffs and hem with elastane recovery',
      'Seamless tubular knit construction'
    ],
    composition: '100% Grade-A Mongolian Cashmere (15.5 micron fiber).',
    care: 'Hand wash in cold water with cashmere shampoo or green dry clean.',
    collection: 'autumn-winter',
    featured: true
  },
  {
    id: 'nova-bag-04',
    name: 'The Structured Luna Tote',
    subtitle: 'Full-grain calfskin leather with polished palladium hardware',
    category: 'leather',
    gender: 'women',
    price: 520,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'LIMITED',
    inStock: true,
    stockCount: 3,
    colors: [
      { name: 'Burgundy Merlot', hex: '#581825', bgClass: 'bg-[#581825]', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Cognac Saddle', hex: '#9A5B32', bgClass: 'bg-[#9A5B32]', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Midnight Onyx', hex: '#111827', bgClass: 'bg-[#111827]', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An architectural everyday tote created by Tuscan leather masters. With its curved crescent profile and clean gussets, it comfortably accommodates a 14" laptop and personal essentials.',
    details: [
      'Hand-painted burnished leather edges',
      'Magnetic top closure with key leash lanyard',
      'Interior zip compartment and dual slip pockets',
      'Includes protective organic cotton dust bag'
    ],
    composition: '100% Vegetable-Tanned Italian Calfskin. Lining: Suede microfiber.',
    care: 'Condition biannually with natural leather balm.',
    collection: 'signature-minimal',
    featured: true,
    hotspot: { x: 62, y: 68, label: 'Luna Calfskin Tote — $520' }
  },
  {
    id: 'nova-boot-05',
    name: 'Sleek Chelsea Lug Boot',
    subtitle: 'Vibram platform sole with vegetable-tanned box calf leather',
    category: 'footwear',
    gender: 'unisex',
    price: 430,
    rating: 4.7,
    reviewsCount: 31,
    badge: 'NEW',
    inStock: true,
    stockCount: 7,
    colors: [
      { name: 'Onyx Polish', hex: '#0F172A', bgClass: 'bg-[#0F172A]', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Dark Olive', hex: '#3B4033', bgClass: 'bg-[#3B4033]', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Combining rugged durability with minimalist high fashion. A custom Goodyear-welted construction anchored by a lightweight Vibram lug sole ensures weather resistance and comfort.',
    details: [
      'Goodyear-welted resoleable construction',
      'Custom elastic side gussets for easy slip-on',
      'Lightweight shock-absorbing Vibram Vi-Lite sole',
      'Full calfskin glove-leather lining'
    ],
    composition: 'Upper: 100% Full-grain French Box Calf. Sole: 100% Vibram Rubber.',
    care: 'Wipe with damp cloth and apply neutral wax polish.',
    collection: 'autumn-winter',
    featured: true
  },
  {
    id: 'nova-dress-06',
    name: 'Asymmetric Bias-Cut Silk Slip Dress',
    subtitle: 'Heavy 22-momme Mulberry silk with cowl neckline',
    category: 'tailoring',
    gender: 'women',
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 47,
    badge: 'SALE',
    inStock: true,
    stockCount: 6,
    colors: [
      { name: 'Champagne Shimmer', hex: '#EED9C4', bgClass: 'bg-[#EED9C4]', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Emerald Velvet', hex: '#0B4D3C', bgClass: 'bg-[#0B4D3C]', image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Midnight Blue', hex: '#1E293B', bgClass: 'bg-[#1E293B]', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An ethereal bias cut that hugs natural curves with effortless grace. Spun from heavyweight 22-momme Mulberry silk satin that glides across the skin like liquid light.',
    details: [
      'Cut on the bias for natural elasticity and contouring',
      'Delicate adjustable criss-cross strap back',
      'French seam finishing throughout',
      'Subtle asymmetric hemline'
    ],
    composition: '100% Grade-6A Mulberry Silk.',
    care: 'Professional dry clean or gentle hand wash cold with silk detergent.',
    collection: 'resort-evening',
    featured: true
  },
  {
    id: 'nova-coat-07',
    name: 'Minimalist Double-Face Trench',
    subtitle: 'Water-repellent bonded cotton gabardine with storm shield',
    category: 'outerwear',
    gender: 'women',
    price: 610,
    rating: 4.8,
    reviewsCount: 22,
    badge: 'NEW',
    inStock: true,
    stockCount: 9,
    colors: [
      { name: 'Desert Sand', hex: '#DECBB7', bgClass: 'bg-[#DECBB7]', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Graphite Grey', hex: '#4B5563', bgClass: 'bg-[#4B5563]', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A timeless silhouette modernised with streamlined proportions. Removed epaulettes for a sleek profile while retaining the protective storm flap and horn d-ring belt.',
    details: [
      'Waterproof Japanese cotton gabardine',
      'Detachable self-tie waist belt with leather buckle',
      'Deep angled storm pockets',
      'Contrast horn buttons'
    ],
    composition: '100% Organic Bonded Cotton Gabardine.',
    care: 'Dry clean only.',
    collection: 'signature-minimal',
    featured: false
  },
  {
    id: 'nova-men-08',
    name: 'Tailored Wide-Leg Pleated Trouser',
    subtitle: 'High-waisted wool gabardine trouser with deep forward pleats',
    category: 'tailoring',
    gender: 'men',
    price: 340,
    originalPrice: 400,
    rating: 4.9,
    reviewsCount: 35,
    badge: 'BESTSELLER',
    inStock: true,
    stockCount: 11,
    colors: [
      { name: 'Charcoal Fleck', hex: '#27272A', bgClass: 'bg-[#27272A]', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Camel Tan', hex: '#B8977E', bgClass: 'bg-[#B8977E]', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['29', '30', '31', '32', '33', '34'],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Precision-cut with generous fullness through the leg, tapering slightly at the shoe break. High-rise waistband with side adjusters for an immaculate clean line.',
    details: [
      'Double forward pleats for comfortable volume',
      'Concealed brass side buckle tab adjusters (belt-free)',
      'Curved slant front pockets and buttoned rear welt pockets',
      'Unfinished hem available for bespoke tailoring'
    ],
    composition: '100% High-Twist Wool Gabardine. Pocketing: 100% Cotton.',
    care: 'Dry clean only.',
    collection: 'signature-minimal',
    featured: false
  },
  {
    id: 'nova-knit-09',
    name: 'Chunky Cardigan in Alpaca Blend',
    subtitle: 'Oversized knit with natural horn buttons and drop shoulders',
    category: 'knitwear',
    gender: 'unisex',
    price: 360,
    rating: 4.7,
    reviewsCount: 19,
    badge: 'NEW',
    inStock: true,
    stockCount: 5,
    colors: [
      { name: 'Cloud Cream', hex: '#F5F5F0', bgClass: 'bg-[#F5F5F0]', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Chestnut', hex: '#633B27', bgClass: 'bg-[#633B27]', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['XS/S', 'M/L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Cocooning and lightweight, spun from Peruvian baby alpaca and organic wool. The airy waffle stitch provides plush warmth without bulk.',
    details: [
      'Relaxed boyfriend fit with dropped shoulders',
      'Genuine buffalo horn buttons',
      'Ribbed placket, cuffs and waistband',
      'Patch front pockets'
    ],
    composition: '68% Baby Alpaca, 22% Wool, 10% Polyamide (for structure).',
    care: 'Hand wash cold, dry flat.',
    collection: 'autumn-winter',
    featured: false
  },
  {
    id: 'nova-acc-10',
    name: 'Architectural Acetate Sunglasses',
    subtitle: 'Handcrafted Japanese bio-acetate with category 3 UV400 lenses',
    category: 'accessories',
    gender: 'unisex',
    price: 240,
    rating: 4.9,
    reviewsCount: 64,
    badge: 'BESTSELLER',
    inStock: true,
    stockCount: 15,
    colors: [
      { name: 'Havana Tortoise', hex: '#6D4C41', bgClass: 'bg-[#6D4C41]', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Pitch Black', hex: '#111111', bgClass: 'bg-[#111111]', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sculpted with bold bevelled edges and a distinctive angular bridge. Custom 7-barrel OBE hinges guarantee lifetime stability and smooth flex.',
    details: [
      '100% biodegradable cellulose acetate from Takiron Japan',
      'Carl Zeiss anti-reflective nylon lenses',
      'Custom gold core-wire visible through inner temple',
      'Accompanied by a hard leather folding case'
    ],
    composition: 'Japanese Bio-Acetate & Mineral Glass.',
    care: 'Clean with included microfiber cloth and lens spray.',
    collection: 'signature-minimal',
    featured: false
  },
  {
    id: 'nova-bag-11',
    name: 'Minimalist Crescent Crossbody',
    subtitle: 'Smooth nappa leather with adjustable guitar strap',
    category: 'leather',
    gender: 'women',
    price: 360,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 27,
    badge: 'SALE',
    inStock: true,
    stockCount: 8,
    colors: [
      { name: 'Bone Ivory', hex: '#F3EFE0', bgClass: 'bg-[#F3EFE0]', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Forest Green', hex: '#1B4332', bgClass: 'bg-[#1B4332]', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sleek and hands-free. Designed to sit comfortably against the torso, shaped in an organic half-moon contour with custom brushed hardware.',
    details: [
      'Buttery soft lambskin nappa leather',
      'YKK Excella metal zipper with leather pull',
      'Concealed external card slip pocket',
      'Custom silver engraved buckle'
    ],
    composition: '100% Spanish Lambskin Nappa.',
    care: 'Store in dust bag when not in use.',
    collection: 'streetwear-deluxe',
    featured: false
  },
  {
    id: 'nova-shoe-12',
    name: 'The Sculpted Mule Heel',
    subtitle: 'Pointed toe slipper heel with architectural flared heel',
    category: 'footwear',
    gender: 'women',
    price: 390,
    rating: 4.9,
    reviewsCount: 18,
    badge: 'LIMITED',
    inStock: true,
    stockCount: 4,
    colors: [
      { name: 'Onyx Satin', hex: '#1A1A1A', bgClass: 'bg-[#1A1A1A]', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Gilded Bronze', hex: '#A57144', bgClass: 'bg-[#A57144]', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An architectural statement piece. Features a sharp triangular point balanced by an inverted cone 65mm heel engineered for all-night poise and comfort.',
    details: [
      '65mm (2.5") lacquered wood sculpted heel',
      'Padded memory foam insole',
      'Hand-buffed natural leather sole',
      'Deep v-cut vamp that elongates the leg line'
    ],
    composition: 'Upper: 100% Silk Satin or Metallic Calf. Sole: 100% Tuscan Leather.',
    care: 'Avoid wet surfaces. Fit rubber half-soles to preserve leather.',
    collection: 'resort-evening',
    featured: false
  }
]

export const CATEGORIES = [
  { id: 'all', label: 'All Creations', icon: 'i-lucide-sparkles' },
  { id: 'outerwear', label: 'Coats & Trench', icon: 'i-lucide-wind' },
  { id: 'tailoring', label: 'Suits & Dresses', icon: 'i-lucide-briefcase' },
  { id: 'knitwear', label: 'Cashmere & Knits', icon: 'i-lucide-feather' },
  { id: 'leather', label: 'Bags & Leather', icon: 'i-lucide-shopping-bag' },
  { id: 'footwear', label: 'Boots & Heels', icon: 'i-lucide-footprints' },
  { id: 'accessories', label: 'Eyewear & Accents', icon: 'i-lucide-glasses' }
]

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1, prefix: true },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, prefix: false },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, prefix: true },
  JPY: { code: 'JPY', symbol: '¥', rate: 154, prefix: true }
} as const
