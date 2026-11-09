<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'
import { PRODUCTS } from '../../data/products'
import type { Product } from '../../types/fashion'

const {
  isSearchOpen,
  openQuickView,
  formatPrice,
  activeCategory
} = useFashionStore()

const searchInput = ref('')

const suggestions = ['Virgin Wool Overcoat', 'Mongolian Cashmere', 'Luna Tote', 'Silk Slip Dress', 'Lug Boot', 'Trench']

const searchResults = computed(() => {
  if (!searchInput.value.trim()) return []
  const q = searchInput.value.toLowerCase().trim()
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.subtitle.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  )
})

const handleSelectProduct = (product: Product) => {
  isSearchOpen.value = false
  openQuickView(product)
}

const applySuggestion = (term: string) => {
  searchInput.value = term
}
</script>

<template>
  <div v-if="isSearchOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
      @click="isSearchOpen = false"
    />

    <!-- Modal Box -->
    <div
      class="relative w-full max-w-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden z-10"
      @click.stop
    >
      <!-- Search Input Header -->
      <div class="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center space-x-3">
        <svg class="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input
          v-model="searchInput"
          type="text"
          placeholder="Search garments, materials, silhouettes..."
          class="flex-1 bg-transparent text-base sm:text-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none font-serif"
          autofocus
        />

        <button
          class="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white"
          @click="isSearchOpen = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Quick Suggested Search Pills -->
      <div class="px-6 py-3 bg-stone-100 dark:bg-stone-950/50 border-b border-stone-200 dark:border-stone-800/80 flex items-center space-x-2 overflow-x-auto text-xs">
        <span class="text-stone-400 uppercase tracking-widest text-[10px]">Trending:</span>
        <button
          v-for="s in suggestions"
          :key="s"
          class="px-2.5 py-1 rounded-full bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 whitespace-nowrap text-[11px] transition-colors"
          @click="applySuggestion(s)"
        >
          {{ s }}
        </button>
      </div>

      <!-- Search Results Area -->
      <div class="max-h-[60vh] overflow-y-auto p-6 divide-y divide-stone-200 dark:divide-stone-800">
        <div v-if="searchInput.trim() && searchResults.length === 0" class="py-12 text-center text-stone-500">
          <p class="font-serif text-lg">No matching creations found for "{{ searchInput }}"</p>
          <p class="text-xs mt-1">Try searching for wool coats, cashmere, leather boots or blazers.</p>
        </div>

        <div v-else-if="!searchInput.trim()" class="py-8 text-center text-stone-400">
          <p class="text-xs uppercase tracking-widest">Type to search the Autumn / Winter 2026 Collection</p>
        </div>

        <div
          v-for="item in searchResults"
          :key="item.id"
          class="py-3 flex items-center space-x-4 hover:bg-stone-100 dark:hover:bg-stone-800/60 p-2 cursor-pointer transition-colors"
          @click="handleSelectProduct(item)"
        >
          <div class="w-14 h-18 bg-stone-100 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
            <img :src="item.images[0]" :alt="item.name" class="w-full h-full object-cover object-top" />
          </div>

          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-serif text-stone-900 dark:text-stone-100 truncate">
              {{ item.name }}
            </h4>
            <p class="text-xs text-stone-500 truncate">{{ item.subtitle }}</p>
            <span class="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-1 inline-block">
              {{ formatPrice(item.price) }}
            </span>
          </div>

          <button class="px-3 py-1.5 border border-stone-300 dark:border-stone-700 text-xs uppercase tracking-wider font-medium hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
