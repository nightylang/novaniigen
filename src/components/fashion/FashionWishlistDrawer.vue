<script setup lang="ts">
import { useFashionStore } from '../../composables/useFashionStore'

const {
  isWishlistOpen,
  wishlistProducts,
  toggleWishlist,
  addToCart,
  formatPrice,
  isCartOpen
} = useFashionStore()

const handleMoveToCart = (product: any) => {
  addToCart(product, product.colors[0], product.sizes[0] || 'M', 1)
  toggleWishlist(product.id)
}
</script>

<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isWishlistOpen"
      class="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm transition-opacity duration-300"
      @click="isWishlistOpen = false"
    />

    <!-- Drawer Panel -->
    <aside
      class="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md bg-stone-50 dark:bg-stone-950 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out"
      :class="isWishlistOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <h2 class="text-xl font-serif font-light text-stone-950 dark:text-stone-50">
            Saved Creations
          </h2>
          <span class="text-xs px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
            {{ wishlistProducts.length }}
          </span>
        </div>

        <button
          class="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
          title="Close Wishlist"
          @click="isWishlistOpen = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto p-6 divide-y divide-stone-200 dark:divide-stone-800/80">
        <div v-if="wishlistProducts.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div class="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center text-stone-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-serif">Your wishlist is empty</h3>
            <p class="text-xs text-stone-500 max-w-xs mt-1">Tap the heart icon on any piece to save it to your curated wishlist.</p>
          </div>
        </div>

        <div
          v-for="product in wishlistProducts"
          :key="product.id"
          class="py-4 first:pt-0 last:pb-0 flex space-x-4"
        >
          <div class="w-20 h-26 bg-stone-100 dark:bg-stone-900 overflow-hidden flex-shrink-0">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover object-top" />
          </div>

          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between">
                <h4 class="text-sm font-serif font-normal text-stone-900 dark:text-stone-100 line-clamp-1">
                  {{ product.name }}
                </h4>
                <button
                  class="text-stone-400 hover:text-rose-600 transition-colors ml-2"
                  title="Remove from Wishlist"
                  @click="toggleWishlist(product.id)"
                >
                  ✕
                </button>
              </div>
              <p class="text-xs text-stone-500 line-clamp-1 mt-0.5">{{ product.subtitle }}</p>
              <div class="mt-1 text-sm font-semibold text-stone-900 dark:text-stone-100">
                {{ formatPrice(product.price) }}
              </div>
            </div>

            <div class="pt-2">
              <button
                class="w-full py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
                @click="handleMoveToCart(product)"
              >
                Move to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
