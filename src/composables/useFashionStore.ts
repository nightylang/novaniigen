import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { PRODUCTS, CURRENCIES } from '../data/products'
import type { Product, CartItem, ProductColor, CurrencyCode } from '../types/fashion'

// Persisted cart & wishlist in local storage
const cart = useStorage<CartItem[]>('novanii-cart', [
  {
    id: 'sample-cart-1',
    product: PRODUCTS[0],
    selectedColor: PRODUCTS[0].colors[0],
    selectedSize: 'M',
    quantity: 1
  }
])

const wishlist = useStorage<string[]>('novanii-wishlist', ['nova-suit-02', 'nova-bag-04'])
const selectedCurrency = useStorage<CurrencyCode>('novanii-currency', 'USD')
const appliedPromoCode = useStorage<string>('novanii-promo', '')
const discountPercent = ref(appliedPromoCode.value === 'ATELIER15' ? 15 : appliedPromoCode.value === 'NOVA10' ? 10 : 0)

// Active UI drawers & modals
const isCartOpen = ref(false)
const isWishlistOpen = ref(false)
const isSearchOpen = ref(false)
const isQuickViewOpen = ref(false)
const isCheckoutOpen = ref(false)
const isSizeGuideOpen = ref(false)
const quickViewProduct = ref<Product | null>(PRODUCTS[0])

// Filters & Search
const activeCategory = ref<string>('all')
const activeGender = ref<'all' | 'women' | 'men' | 'unisex'>('all')
const activeSort = ref<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured')
const selectedSizes = ref<string[]>([])
const selectedColors = ref<string[]>([])
const onlySale = ref(false)
const inStockOnly = ref(false)
const searchQuery = ref('')
const toastMessage = ref<{ title: string; desc?: string; type: 'success' | 'info' | 'error' } | null>(null)

export function useFashionStore() {
  // Toast helper
  const showToast = (title: string, desc?: string, type: 'success' | 'info' | 'error' = 'success') => {
    toastMessage.value = { title, desc, type }
    setTimeout(() => {
      if (toastMessage.value?.title === title) {
        toastMessage.value = null
      }
    }, 3800)
  }

  // Price formatting
  const formatPrice = (usdAmount: number): string => {
    const cur = CURRENCIES[selectedCurrency.value] || CURRENCIES.USD
    const converted = Math.round(usdAmount * cur.rate)
    return cur.prefix ? `${cur.symbol}${converted.toLocaleString()}` : `${converted.toLocaleString()} ${cur.symbol}`
  }

  // Cart operations
  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const existingIndex = cart.value.findIndex(
      item => item.product.id === product.id && item.selectedColor.name === color.name && item.selectedSize === size
    )

    if (existingIndex > -1) {
      cart.value[existingIndex].quantity += quantity
    } else {
      cart.value.push({
        id: `${product.id}-${color.name}-${size}-${Date.now()}`,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity
      })
    }

    showToast('Added to Shopping Bag', `${product.name} (${size} / ${color.name})`, 'success')
    isCartOpen.value = true
  }

  const updateCartQuantity = (id: string, delta: number) => {
    const index = cart.value.findIndex(item => item.id === id)
    if (index > -1) {
      const newQty = cart.value[index].quantity + delta
      if (newQty <= 0) {
        cart.value.splice(index, 1)
        showToast('Item Removed', 'Removed item from shopping bag', 'info')
      } else {
        cart.value[index].quantity = newQty
      }
    }
  }

  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter(item => item.id !== id)
    showToast('Item Removed', 'Removed item from shopping bag', 'info')
  }

  const clearCart = () => {
    cart.value = []
  }

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const index = wishlist.value.indexOf(productId)
    const product = PRODUCTS.find(p => p.id === productId)
    if (index > -1) {
      wishlist.value.splice(index, 1)
      showToast('Removed from Wishlist', product?.name, 'info')
    } else {
      wishlist.value.push(productId)
      showToast('Saved to Wishlist', product?.name, 'success')
    }
  }

  const isInWishlist = (productId: string) => wishlist.value.includes(productId)

  const wishlistProducts = computed(() => {
    return PRODUCTS.filter(p => wishlist.value.includes(p.id))
  })

  // Quick View
  const openQuickView = (product: Product) => {
    quickViewProduct.value = product
    isQuickViewOpen.value = true
  }

  // Promo Code
  const applyPromo = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase()
    if (trimmed === 'ATELIER15') {
      discountPercent.value = 15
      appliedPromoCode.value = 'ATELIER15'
      showToast('Promo Code Applied', '15% Atelier Privé discount applied!', 'success')
      return { success: true, message: '15% discount applied!' }
    } else if (trimmed === 'NOVA10') {
      discountPercent.value = 10
      appliedPromoCode.value = 'NOVA10'
      showToast('Promo Code Applied', '10% welcome discount applied!', 'success')
      return { success: true, message: '10% discount applied!' }
    } else if (trimmed === 'FREESHIP') {
      discountPercent.value = 5
      appliedPromoCode.value = 'FREESHIP'
      showToast('Free Express Shipping Applied', 'Shipping fee waived!', 'success')
      return { success: true, message: 'Free shipping promo applied!' }
    } else {
      showToast('Invalid Promo Code', 'Try "ATELIER15" or "NOVA10"', 'error')
      return { success: false, message: 'Invalid promo code. Try ATELIER15.' }
    }
  }

  const removePromo = () => {
    discountPercent.value = 0
    appliedPromoCode.value = ''
    showToast('Promo Code Removed', 'Normal rates restored', 'info')
  }

  // Financial calculations
  const cartSubtotalUSD = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  })

  const cartDiscountUSD = computed(() => {
    return (cartSubtotalUSD.value * discountPercent.value) / 100
  })

  const cartShippingUSD = computed(() => {
    if (cartSubtotalUSD.value === 0) return 0
    if (appliedPromoCode.value === 'FREESHIP') return 0
    return cartSubtotalUSD.value >= 150 ? 0 : 25
  })

  const freeShippingThresholdUSD = 150
  const freeShippingRemainingUSD = computed(() => {
    return Math.max(0, freeShippingThresholdUSD - cartSubtotalUSD.value)
  })
  const freeShippingProgress = computed(() => {
    return Math.min(100, Math.round((cartSubtotalUSD.value / freeShippingThresholdUSD) * 100))
  })

  const cartEstimatedTaxUSD = computed(() => {
    return Math.round((cartSubtotalUSD.value - cartDiscountUSD.value) * 0.08)
  })

  const cartTotalUSD = computed(() => {
    return Math.max(0, cartSubtotalUSD.value - cartDiscountUSD.value + cartShippingUSD.value + cartEstimatedTaxUSD.value)
  })

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  // Filtering products
  const filteredProducts = computed(() => {
    return PRODUCTS.filter(product => {
      // Category
      if (activeCategory.value !== 'all' && product.category !== activeCategory.value) {
        return false
      }
      // Gender
      if (activeGender.value !== 'all') {
        if (product.gender !== activeGender.value && product.gender !== 'unisex') {
          return false
        }
      }
      // Sale only
      if (onlySale.value && !product.originalPrice) {
        return false
      }
      // In stock only
      if (inStockOnly.value && !product.inStock) {
        return false
      }
      // Sizes
      if (selectedSizes.value.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.value.includes(s))
        if (!hasSize) return false
      }
      // Colors
      if (selectedColors.value.length > 0) {
        const hasColor = product.colors.some(c => selectedColors.value.includes(c.name))
        if (!hasColor) return false
      }
      // Search
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase().trim()
        const matchName = product.name.toLowerCase().includes(q)
        const matchSub = product.subtitle.toLowerCase().includes(q)
        const matchCat = product.category.toLowerCase().includes(q)
        const matchDesc = product.description.toLowerCase().includes(q)
        if (!matchName && !matchSub && !matchCat && !matchDesc) return false
      }
      return true
    }).sort((a, b) => {
      if (activeSort.value === 'price-asc') return a.price - b.price
      if (activeSort.value === 'price-desc') return b.price - a.price
      if (activeSort.value === 'rating') return b.rating - a.rating
      if (activeSort.value === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0)
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })
  })

  return {
    products: PRODUCTS,
    cart,
    wishlist,
    selectedCurrency,
    appliedPromoCode,
    discountPercent,
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    isQuickViewOpen,
    isCheckoutOpen,
    isSizeGuideOpen,
    quickViewProduct,
    activeCategory,
    activeGender,
    activeSort,
    selectedSizes,
    selectedColors,
    onlySale,
    inStockOnly,
    searchQuery,
    toastMessage,
    // Methods
    showToast,
    formatPrice,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    wishlistProducts,
    openQuickView,
    applyPromo,
    removePromo,
    // Computeds
    cartSubtotalUSD,
    cartDiscountUSD,
    cartShippingUSD,
    cartEstimatedTaxUSD,
    cartTotalUSD,
    cartCount,
    freeShippingThresholdUSD,
    freeShippingRemainingUSD,
    freeShippingProgress,
    filteredProducts
  }
}
