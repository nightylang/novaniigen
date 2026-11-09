export interface ProductColor {
  name: string
  hex: string
  bgClass: string
  image?: string
}

export interface Product {
  id: string
  name: string
  subtitle: string
  category: 'outerwear' | 'tailoring' | 'knitwear' | 'leather' | 'footwear' | 'accessories'
  gender: 'women' | 'men' | 'unisex'
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  badge?: 'NEW' | 'BESTSELLER' | 'LIMITED' | 'SALE'
  inStock: boolean
  stockCount: number
  colors: ProductColor[]
  sizes: string[]
  images: string[]
  description: string
  details: string[]
  composition: string
  care: string
  collection: 'autumn-winter' | 'signature-minimal' | 'streetwear-deluxe' | 'resort-evening'
  featured?: boolean
  hotspot?: { x: number; y: number; label: string }
}

export interface CartItem {
  id: string
  product: Product
  selectedColor: ProductColor
  selectedSize: string
  quantity: number
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY'

export interface Currency {
  code: CurrencyCode
  symbol: string
  rate: number
  prefix: boolean
}
