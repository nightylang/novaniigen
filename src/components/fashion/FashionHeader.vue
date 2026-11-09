<script setup lang="ts">
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useFashionStore } from '../../composables/useFashionStore'
import { CATEGORIES } from '../../data/products'
import type { CurrencyCode } from '../../types/fashion'

const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')

const toggleColor = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  isDark.value = colorMode.value === 'dark'
}

const {
  cartCount,
  wishlist,
  selectedCurrency,
  isCartOpen,
  isWishlistOpen,
  isSearchOpen,
  activeCategory,
  activeGender
} = useFashionStore()

const mobileMenuOpen = ref(false)

const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY']

const selectCategory = (catId: string) => {
  activeCategory.value = catId
  mobileMenuOpen.value = false
  const el = document.getElementById('catalog-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const selectGender = (g: 'all' | 'women' | 'men') => {
  activeGender.value = g
  mobileMenuOpen.value = false
  const el = document.getElementById('catalog-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200/70 dark:border-stone-800/80 transition-colors">
    <!-- Top Announcement Bar -->
    <div class="bg-stone-900 text-stone-200 dark:bg-stone-900/90 text-xs py-2 px-4 border-b border-stone-800">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="hidden md:flex items-center space-x-4 text-[11px] uppercase tracking-widest text-stone-400">
          <span>CHINA</span>
          <span>•</span>
          <span>KOREAN</span>
          <span>•</span>
          <span>PARIS</span>
          <span>•</span>
          <span>TOKYO</span>
        </div>

        <div class="mx-auto md:mx-0 flex items-center space-x-2 text-center font-medium tracking-wide">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="hidden sm:inline text-amber-300 font-semibold tracking-wider">CODE: ATELIER15 (5% OFF)</span>
        </div>

        
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Left: Mobile Menu Button & Gender Nav -->
        <div class="flex items-center space-x-6">
          <button
            class="md:hidden p-2 text-stone-700 dark:text-stone-200 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle Navigation"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav class="hidden md:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium">
            <button
              :class="activeGender === 'women' ? 'text-amber-800 dark:text-amber-400 font-bold border-b border-current pb-0.5' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors'"
              @click="selectGender('women')"
            >
              Women
            </button>
            <button
              :class="activeGender === 'men' ? 'text-amber-800 dark:text-amber-400 font-bold border-b border-current pb-0.5' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors'"
              @click="selectGender('men')"
            >
              Men
            </button>
            <button
              :class="activeCategory === 'all' && activeGender === 'all' ? 'text-amber-800 dark:text-amber-400 font-bold border-b border-current pb-0.5' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors'"
              @click="selectGender('all')"
            >
              Collection
            </button>
            <a
              href="#lookbook-section"
              class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              Lookbook
            </a>
          </nav>
        </div>

        <!-- Center: Brand Logo -->
        <div class="text-center">
          <a href="#" class="inline-block group">
            <span class="block text-2xl sm:text-3xl font-serif tracking-[0.25em] font-light text-stone-950 dark:text-stone-50 group-hover:opacity-80 transition-opacity">
              𝐍𝐨𝐯𝐚 𝐍𝐢𝐢𝐆𝐞𝐧
            </span>
            <span class="block text-[9px] uppercase tracking-[0.45em] text-stone-500 dark:text-stone-400 font-light -mt-1">
              ATELIER • MAISON
            </span>
          </a>
        </div>

        <!-- Right: Actions (Search, Wishlist, Bag, Theme) -->
        <div class="flex items-center space-x-3 sm:space-x-5">
          <!-- Search Button -->
          <button
            class="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors relative"
            title="Search creations"
            @click="isSearchOpen = true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <!-- Wishlist Button -->
          <button
            class="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors relative"
            title="View Wishlist"
            @click="isWishlistOpen = true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span
              v-if="wishlist.length > 0"
              class="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-stone-900 dark:bg-amber-600 rounded-full"
            >
              {{ wishlist.length }}
            </span>
          </button>

          <!-- Shopping Bag Button -->
          <button
            class="p-2 text-stone-900 dark:text-stone-100 hover:opacity-80 transition-opacity relative flex items-center space-x-1"
            title="Shopping Bag"
            @click="isCartOpen = true"
          >
            <div class="relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <span
                class="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-amber-800 dark:bg-amber-600 rounded-full"
              >
                {{ cartCount }}
              </span>
            </div>
            <span class="hidden lg:inline text-xs font-semibold uppercase tracking-wider ml-1">Bag</span>
          </button>

          <!-- Dark / Light Mode -->
          <button
            class="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleColor"
          >
            <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Category Quick Pill Navigation -->
      <div class="hidden lg:flex items-center justify-center space-x-8 py-2.5 border-t border-stone-200/50 dark:border-stone-800/60 text-xs tracking-wider uppercase text-stone-600 dark:text-stone-400">
        <button
          v-for="cat in CATEGORIES"
          :key="cat.id"
          :class="activeCategory === cat.id ? 'text-amber-800 dark:text-amber-400 font-semibold' : 'hover:text-stone-900 dark:hover:text-white transition-colors'"
          @click="selectCategory(cat.id)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Nav -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-6 py-6 space-y-4"
    >
      <div class="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <span class="text-xs font-semibold uppercase tracking-widest text-stone-400">Gender</span>
        <div class="flex space-x-3 text-xs uppercase tracking-wider font-medium">
          <button :class="activeGender === 'all' ? 'text-amber-700 font-bold' : ''" @click="selectGender('all')">All</button>
          <span>•</span>
          <button :class="activeGender === 'women' ? 'text-amber-700 font-bold' : ''" @click="selectGender('women')">Women</button>
          <span>•</span>
          <button :class="activeGender === 'men' ? 'text-amber-700 font-bold' : ''" @click="selectGender('men')">Men</button>
        </div>
      </div>

      <div class="space-y-2">
        <span class="text-xs font-semibold uppercase tracking-widest text-stone-400">Categories</span>
        <div class="grid grid-cols-2 gap-2 pt-1">
          <button
            v-for="cat in CATEGORIES"
            :key="cat.id"
            class="text-left text-sm py-1.5 px-2 rounded hover:bg-stone-200/50 dark:hover:bg-stone-900 transition-colors"
            :class="activeCategory === cat.id ? 'font-bold text-amber-800 dark:text-amber-400 bg-amber-500/10' : 'text-stone-700 dark:text-stone-300'"
            @click="selectCategory(cat.id)"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <div class="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <span class="text-xs uppercase tracking-widest text-stone-400">Currency</span>
        <select
          v-model="selectedCurrency"
          class="bg-stone-200 dark:bg-stone-900 text-stone-800 dark:text-stone-200 rounded px-2 py-1 text-xs"
        >
          <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>
  </header>
</template>
