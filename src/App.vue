<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useColorMode } from '@vueuse/core'
import { useFashionStore } from './composables/useFashionStore'

// Components
import FashionHeader from './components/fashion/FashionHeader.vue'
import FashionHero from './components/fashion/FashionHero.vue'
import FashionCategoryBanners from './components/fashion/FashionCategoryBanners.vue'
import FashionProductFilter from './components/fashion/FashionProductFilter.vue'
import FashionProductCard from './components/fashion/FashionProductCard.vue'
import FashionLookbook from './components/fashion/FashionLookbook.vue'
import FashionReviews from './components/fashion/FashionReviews.vue'
import FashionNewsletter from './components/fashion/FashionNewsletter.vue'
import FashionFooter from './components/fashion/FashionFooter.vue'
import FashionCartDrawer from './components/fashion/FashionCartDrawer.vue'
import FashionWishlistDrawer from './components/fashion/FashionWishlistDrawer.vue'
import FashionSearchModal from './components/fashion/FashionSearchModal.vue'
import FashionQuickViewModal from './components/fashion/FashionQuickViewModal.vue'
import FashionSizeGuideModal from './components/fashion/FashionSizeGuideModal.vue'
import FashionCheckoutModal from './components/fashion/FashionCheckoutModal.vue'
import FashionOperationsModal from './components/fashion/FashionOperationsModal.vue'

const colorMode = useColorMode()
const themeColor = computed(() => colorMode.value === 'dark' ? '#0c0a09' : '#faf9f6')

useHead({
  title: '𝐍𝐨𝐯𝐚 𝐍𝐢𝐢𝐆𝐞𝐧',
  meta: [
    { name: 'theme-color', content: themeColor },
    { name: 'description', content: 'Discover the Autumn / Winter 2026 Collection at 𝐍𝐨𝐯𝐚 𝐍𝐢𝐢𝐆𝐞𝐧. Sculpted virgin wool overcoats, pure Mongolian cashmere, fluid tailoring, and handcrafted Tuscan leather goods.' }
  ]
})

const { filteredProducts, toastMessage } = useFashionStore()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#faf9f6] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 selection:bg-amber-800 selection:text-white transition-colors duration-300">
    <!-- Header with Announcement Bar & Nav -->
    <FashionHeader />

    <!-- Hero Runway Banner -->
    <FashionHero />

    <!-- Capsule Categories Grid -->
    <FashionCategoryBanners />

    <!-- Main Products Catalog Section -->
    <section id="catalog-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 w-full">
      <div class="mb-10 text-center sm:text-left">
        <span class="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800 dark:text-amber-400">
          The Autumn / Winter Edit
        </span>
        <h2 class="text-3xl sm:text-5xl font-serif font-light text-stone-950 dark:text-stone-50 mt-1">
          Ready-to-Wear Collection
        </h2>
        <p class="text-xs sm:text-sm text-stone-500 font-light mt-2 max-w-xl">
          Crafted in limited production runs with exceptional natural textiles. Finished with handcrafted pick-stitching and bespoke horn hardware.
        </p>
      </div>

      <!-- Filters & Sorting Control Bar -->
      <FashionProductFilter class="mb-10" />

      <!-- Product Cards Grid -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      >
        <FashionProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="py-24 text-center space-y-4 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 p-8"
      >
        <div class="text-3xl font-serif text-stone-400">No matching creations found</div>
        <p class="text-xs text-stone-500 max-w-md mx-auto">
          We couldn't find any creations matching your selected filter criteria. Try adjusting your category or resetting the search query.
        </p>
      </div>
    </section>

    <!-- Lookbook & Shop The Ensemble -->
    <FashionLookbook />

    <!-- Client Reviews -->
    <FashionReviews />

    <!-- VIP Newsletter Privé -->
    <FashionNewsletter />

    <!-- Footer -->
    <FashionFooter />

    <!-- Modals & Drawers -->
    <FashionCartDrawer />
    <FashionWishlistDrawer />
    <FashionSearchModal />
    <FashionQuickViewModal />
    <FashionSizeGuideModal />
    <FashionCheckoutModal />
    <FashionOperationsModal />

    <!-- Toast Notification Banner -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-900 border border-stone-800 dark:border-stone-200 p-4 shadow-2xl flex items-start space-x-3 pointer-events-auto"
      >
        <div class="text-amber-400 dark:text-amber-600 text-lg leading-none mt-0.5">✦</div>
        <div class="flex-1 space-y-0.5">
          <div class="text-xs font-semibold uppercase tracking-wider">{{ toastMessage.title }}</div>
          <div v-if="toastMessage.desc" class="text-xs text-stone-300 dark:text-stone-600 font-light truncate">
            {{ toastMessage.desc }}
          </div>
        </div>
        <button
          class="text-stone-400 hover:text-white dark:hover:text-stone-900 text-xs"
          @click="toastMessage = null"
        >
          ✕
        </button>
      </div>
    </transition>
  </div>
</template>

<style>
/* Custom high-fashion scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(120, 113, 108, 0.3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(120, 113, 108, 0.5);
}
</style>
