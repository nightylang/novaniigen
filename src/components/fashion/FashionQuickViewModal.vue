<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'
import type { ProductColor } from '../../types/fashion'

const {
  isQuickViewOpen,
  quickViewProduct,
  formatPrice,
  addToCart,
  toggleWishlist,
  isInWishlist,
  isSizeGuideOpen
} = useFashionStore()

const activeImageIndex = ref(0)
const selectedColor = ref<ProductColor | null>(null)
const selectedSize = ref<string>('M')
const quantity = ref(1)
const activeTab = ref<'details' | 'care' | 'shipping'>('details')

watch(quickViewProduct, (newVal) => {
  if (newVal) {
    activeImageIndex.value = 0
    selectedColor.value = newVal.colors[0]
    selectedSize.value = newVal.sizes[0] || 'M'
    quantity.value = 1
  }
}, { immediate: true })

const currentImage = computed(() => {
  if (!quickViewProduct.value) return ''
  return quickViewProduct.value.images[activeImageIndex.value] || quickViewProduct.value.images[0]
})

const isWishlisted = computed(() => {
  return quickViewProduct.value ? isInWishlist(quickViewProduct.value.id) : false
})

const handleAddToCart = () => {
  if (!quickViewProduct.value || !selectedColor.value) return
  addToCart(quickViewProduct.value, selectedColor.value, selectedSize.value, quantity.value)
  isQuickViewOpen.value = false
}
</script>

<template>
  <div v-if="isQuickViewOpen && quickViewProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
      @click="isQuickViewOpen = false"
    />

    <!-- Modal Card -->
    <div
      class="relative w-full max-w-4xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
      @click.stop
    >
      <!-- Close Button -->
      <button
        class="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-950 dark:hover:text-white bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-full transition-colors"
        title="Close"
        @click="isQuickViewOpen = false"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Left: Image Gallery & Thumbnails -->
      <div class="w-full md:w-1/2 bg-stone-100 dark:bg-stone-950 p-6 flex flex-col justify-between">
        <!-- Main Image -->
        <div class="relative w-full aspect-[3/4] overflow-hidden bg-stone-200 dark:bg-stone-800">
          <img
            :src="currentImage"
            :alt="quickViewProduct.name"
            class="w-full h-full object-cover object-top transition-all duration-500"
          />

          <span
            v-if="quickViewProduct.badge"
            class="absolute top-3 left-3 px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-stone-900 text-white"
          >
            {{ quickViewProduct.badge }}
          </span>
        </div>

        <!-- Thumbnails -->
        <div class="flex items-center space-x-2 pt-4 overflow-x-auto">
          <button
            v-for="(img, idx) in quickViewProduct.images"
            :key="idx"
            class="w-14 h-16 border-2 transition-all overflow-hidden flex-shrink-0"
            :class="activeImageIndex === idx ? 'border-stone-900 dark:border-amber-400' : 'border-transparent opacity-60 hover:opacity-100'"
            @click="activeImageIndex = idx"
          >
            <img :src="img" :alt="quickViewProduct.name" class="w-full h-full object-cover object-top" />
          </button>
        </div>
      </div>

      <!-- Right: Product Details & Controls -->
      <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
        <div class="space-y-5">
          <!-- Title & Price -->
          <div>
            <div class="flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold mb-1">
              <span>{{ quickViewProduct.category }}</span>
              <span>•</span>
              <span>{{ quickViewProduct.gender }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-serif font-light text-stone-950 dark:text-stone-50">
              {{ quickViewProduct.name }}
            </h2>
            <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {{ quickViewProduct.subtitle }}
            </p>

            <div class="mt-3 flex items-baseline space-x-3">
              <span class="text-xl font-semibold text-stone-950 dark:text-stone-100 font-mono">
                {{ formatPrice(quickViewProduct.price) }}
              </span>
              <span v-if="quickViewProduct.originalPrice" class="text-sm text-stone-400 line-through font-light font-mono">
                {{ formatPrice(quickViewProduct.originalPrice) }}
              </span>
              <span v-if="quickViewProduct.originalPrice" class="text-xs text-rose-600 font-semibold">
                Save {{ Math.round((1 - quickViewProduct.price / quickViewProduct.originalPrice) * 100) }}%
              </span>
            </div>
          </div>

          <!-- Color Swatches -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="uppercase tracking-wider text-stone-500">Color:</span>
              <span class="font-medium text-stone-900 dark:text-stone-100">{{ selectedColor?.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-for="c in quickViewProduct.colors"
                :key="c.name"
                class="w-7 h-7 rounded-full border-2 transition-transform"
                :class="selectedColor?.name === c.name ? 'border-stone-900 dark:border-white scale-110' : 'border-transparent opacity-80 hover:opacity-100'"
                :style="{ backgroundColor: c.hex }"
                :title="c.name"
                @click="selectedColor = c"
              />
            </div>
          </div>

          <!-- Size Selector & Size Guide Link -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="uppercase tracking-wider text-stone-500">Size:</span>
              <button
                class="text-amber-800 dark:text-amber-400 underline uppercase tracking-wider text-[11px] font-medium"
                @click="isSizeGuideOpen = true"
              >
                Size Guide
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="s in quickViewProduct.sizes"
                :key="s"
                class="px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors"
                :class="selectedSize === s ? 'bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 border-stone-950 dark:border-stone-100 font-bold' : 'bg-transparent text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400'"
                @click="selectedSize = s"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <!-- Low Stock Warning -->
          <div v-if="quickViewProduct.stockCount <= 4" class="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs flex items-center space-x-2">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>Only {{ quickViewProduct.stockCount }} pieces remaining in our European atelier.</span>
          </div>

          <!-- Tabs (Details, Care, Shipping) -->
          <div class="pt-4 border-t border-stone-200 dark:border-stone-800">
            <div class="flex space-x-4 border-b border-stone-200 dark:border-stone-800 text-xs uppercase tracking-wider pb-2">
              <button
                :class="activeTab === 'details' ? 'font-bold text-stone-900 dark:text-white border-b-2 border-stone-900 dark:border-white pb-1 -mb-2' : 'text-stone-400 hover:text-stone-700'"
                @click="activeTab = 'details'"
              >
                Tailoring
              </button>
              <button
                :class="activeTab === 'care' ? 'font-bold text-stone-900 dark:text-white border-b-2 border-stone-900 dark:border-white pb-1 -mb-2' : 'text-stone-400 hover:text-stone-700'"
                @click="activeTab = 'care'"
              >
                Composition
              </button>
              <button
                :class="activeTab === 'shipping' ? 'font-bold text-stone-900 dark:text-white border-b-2 border-stone-900 dark:border-white pb-1 -mb-2' : 'text-stone-400 hover:text-stone-700'"
                @click="activeTab = 'shipping'"
              >
                Courier
              </button>
            </div>

            <div class="pt-3 text-xs text-stone-600 dark:text-stone-300 leading-relaxed min-h-[70px]">
              <div v-if="activeTab === 'details'" class="space-y-1.5">
                <p>{{ quickViewProduct.description }}</p>
                <ul class="list-disc pl-4 space-y-1 pt-1 text-stone-500">
                  <li v-for="(detail, i) in quickViewProduct.details" :key="i">{{ detail }}</li>
                </ul>
              </div>

              <div v-else-if="activeTab === 'care'" class="space-y-2">
                <p><strong>Composition:</strong> {{ quickViewProduct.composition }}</p>
                <p><strong>Care Instruction:</strong> {{ quickViewProduct.care }}</p>
              </div>

              <div v-else-if="activeTab === 'shipping'" class="space-y-1.5">
                <p>• Complimentary Express Courier on orders over $150.</p>
                <p>• Arrives in signature bespoke hard-box packaging with garment dust bag.</p>
                <p>• 30-day effortless worldwide returns & exchanges.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center space-x-3">
          <!-- Quantity Control -->
          <div class="inline-flex items-center border border-stone-300 dark:border-stone-700 text-xs">
            <button
              class="px-3 py-2.5 text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800"
              @click="quantity = Math.max(1, quantity - 1)"
            >
              -
            </button>
            <span class="px-3 py-2.5 font-mono font-semibold">{{ quantity }}</span>
            <button
              class="px-3 py-2.5 text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800"
              @click="quantity++"
            >
              +
            </button>
          </div>

          <!-- Add To Bag -->
          <button
            class="flex-1 py-3.5 bg-stone-950 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-500 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-[0.99] cursor-pointer"
            @click="handleAddToCart"
          >
            <span>Add to Bag</span>
            <span>•</span>
            <span>{{ formatPrice(quickViewProduct.price * quantity) }}</span>
          </button>

          <!-- Wishlist Toggle -->
          <button
            class="p-3.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            :class="isWishlisted ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20' : ''"
            title="Save to Wishlist"
            @click="toggleWishlist(quickViewProduct.id)"
          >
            <svg class="w-5 h-5" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
