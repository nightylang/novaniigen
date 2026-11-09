<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product, ProductColor } from '../../types/fashion'
import { useFashionStore } from '../../composables/useFashionStore'

const props = defineProps<{
  product: Product
}>()

const {
  formatPrice,
  addToCart,
  toggleWishlist,
  isInWishlist,
  openQuickView
} = useFashionStore()

const selectedColor = ref<ProductColor>(props.product.colors[0])
const selectedSize = ref<string>(props.product.sizes[0] || 'M')
const isHovered = ref(false)

const activeImage = computed(() => {
  if (selectedColor.value.image) {
    return isHovered.value && props.product.images.length > 1
      ? props.product.images[1]
      : selectedColor.value.image
  }
  return isHovered.value && props.product.images.length > 1
    ? props.product.images[1]
    : props.product.images[0]
})

const isWishlisted = computed(() => isInWishlist(props.product.id))

const handleQuickAdd = () => {
  addToCart(props.product, selectedColor.value, selectedSize.value, 1)
}
</script>

<template>
  <div
    class="group relative flex flex-col bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 rounded-none overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-700"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Product Image Container -->
    <div class="relative w-full aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer" @click="openQuickView(product)">
      <img
        :src="activeImage"
        :alt="product.name"
        loading="lazy"
        class="w-full h-full object-cover object-top filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
        <span
          v-if="product.badge === 'BESTSELLER'"
          class="px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-stone-900 text-white dark:bg-amber-600 dark:text-white"
        >
          Bestseller
        </span>
        <span
          v-else-if="product.badge === 'NEW'"
          class="px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-white text-stone-900 dark:bg-stone-100 dark:text-stone-900 shadow-sm"
        >
          New In
        </span>
        <span
          v-else-if="product.badge === 'SALE'"
          class="px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-rose-700 text-white"
        >
          Sale
        </span>
        <span
          v-else-if="product.badge === 'LIMITED'"
          class="px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-amber-800 text-white"
        >
          Limited Run
        </span>

        <span
          v-if="product.stockCount <= 4"
          class="px-2 py-0.5 text-[9px] uppercase tracking-widest font-medium bg-red-950/80 text-rose-200 backdrop-blur-sm"
        >
          Only {{ product.stockCount }} left
        </span>
      </div>

      <!-- Wishlist Button -->
      <button
        class="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md text-stone-700 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors shadow-sm"
        :class="isWishlisted ? 'text-rose-600 dark:text-rose-400' : ''"
        title="Save to Wishlist"
        @click.stop="toggleWishlist(product.id)"
      >
        <svg
          class="w-4 h-4 transition-transform active:scale-125"
          :fill="isWishlisted ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      <!-- Quick Action Overlay (Slide Up on Hover) -->
      <div
        class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/90 via-stone-950/70 to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 flex flex-col space-y-2 z-20"
      >
        <!-- Quick Size Selector -->
        <div class="flex items-center justify-center space-x-1.5" @click.stop>
          <span class="text-[10px] uppercase text-stone-300 mr-1 tracking-wider">Size:</span>
          <button
            v-for="s in product.sizes"
            :key="s"
            class="px-2 py-0.5 text-[10px] font-medium tracking-wider transition-colors border"
            :class="selectedSize === s ? 'bg-white text-stone-950 border-white font-bold' : 'bg-stone-900/80 text-stone-300 border-stone-600 hover:border-white'"
            @click="selectedSize = s"
          >
            {{ s }}
          </button>
        </div>

        <!-- Quick View & Add to Bag -->
        <div class="flex items-center space-x-2" @click.stop>
          <button
            class="flex-1 py-2.5 bg-white text-stone-950 hover:bg-stone-200 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center space-x-1.5 shadow-md active:scale-95 cursor-pointer"
            @click="handleQuickAdd"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add to Bag</span>
          </button>

          <button
            class="p-2.5 bg-stone-900/90 text-white hover:bg-stone-800 text-xs border border-stone-700 transition-colors"
            title="Quick View Details"
            @click="openQuickView(product)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Info Details -->
    <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <!-- Color Swatches & Rating -->
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center space-x-1.5">
            <button
              v-for="color in product.colors"
              :key="color.name"
              class="w-3.5 h-3.5 rounded-full border transition-transform"
              :class="selectedColor.name === color.name ? 'ring-1 ring-offset-1 ring-stone-900 dark:ring-white scale-110' : 'border-stone-300 dark:border-stone-700 opacity-80 hover:opacity-100'"
              :style="{ backgroundColor: color.hex }"
              :title="color.name"
              @click.stop="selectedColor = color"
            />
          </div>

          <!-- Star Rating -->
          <div class="flex items-center space-x-1 text-xs text-stone-500 dark:text-stone-400">
            <span class="text-amber-500 font-medium">★</span>
            <span class="font-medium text-[11px]">{{ product.rating }}</span>
            <span class="text-[10px] text-stone-400">({{ product.reviewsCount }})</span>
          </div>
        </div>

        <!-- Product Name & Subtitle -->
        <h3
          class="text-base font-serif font-normal text-stone-950 dark:text-stone-50 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          @click="openQuickView(product)"
        >
          {{ product.name }}
        </h3>
        <p class="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5 font-light">
          {{ product.subtitle }}
        </p>
      </div>

      <!-- Price Section -->
      <div class="pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-baseline justify-between">
        <div class="flex items-baseline space-x-2">
          <span class="text-sm font-semibold tracking-wide text-stone-950 dark:text-stone-100">
            {{ formatPrice(product.price) }}
          </span>
          <span
            v-if="product.originalPrice"
            class="text-xs text-stone-400 line-through font-light"
          >
            {{ formatPrice(product.originalPrice) }}
          </span>
        </div>

        <span class="text-[10px] uppercase tracking-wider text-stone-400">
          {{ product.gender }}
        </span>
      </div>
    </div>
  </div>
</template>
