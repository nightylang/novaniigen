<script setup lang="ts">
import { useFashionStore } from '../../composables/useFashionStore'
import { CATEGORIES } from '../../data/products'

const {
  activeCategory,
  activeGender,
  activeSort,
  onlySale,
  inStockOnly,
  searchQuery,
  filteredProducts,
  products
} = useFashionStore()

const resetFilters = () => {
  activeCategory.value = 'all'
  activeGender.value = 'all'
  activeSort.value = 'featured'
  onlySale.value = false
  inStockOnly.value = false
  searchQuery.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top Filter & Search Controls Bar -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
      <!-- Search Input -->
      <div class="relative max-w-md w-full">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search trench coats, cashmere, leather totes..."
          class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-2.5 pl-10 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-amber-400 transition-colors"
        />
        <svg class="w-4 h-4 text-stone-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <button
          v-if="searchQuery"
          class="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>

      <!-- Gender Selector & Quick Toggles -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Gender Pills -->
        <div class="inline-flex border border-stone-200 dark:border-stone-800 p-0.5 bg-stone-100 dark:bg-stone-900 text-xs">
          <button
            class="px-3 py-1 font-medium tracking-wider transition-colors"
            :class="activeGender === 'all' ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'"
            @click="activeGender = 'all'"
          >
            All
          </button>
          <button
            class="px-3 py-1 font-medium tracking-wider transition-colors"
            :class="activeGender === 'women' ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'"
            @click="activeGender = 'women'"
          >
            Women
          </button>
          <button
            class="px-3 py-1 font-medium tracking-wider transition-colors"
            :class="activeGender === 'men' ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'"
            @click="activeGender = 'men'"
          >
            Men
          </button>
        </div>

        <!-- Sale Only Toggle -->
        <button
          class="px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors flex items-center space-x-1.5"
          :class="onlySale ? 'bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-500' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700 hover:border-stone-400'"
          @click="onlySale = !onlySale"
        >
          <span>Sale Items</span>
          <span v-if="onlySale">✓</span>
        </button>

        <!-- In Stock Only -->
        <button
          class="px-3 py-1.5 text-xs font-medium uppercase tracking-wider border transition-colors flex items-center space-x-1.5"
          :class="inStockOnly ? 'bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-500' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700 hover:border-stone-400'"
          @click="inStockOnly = !inStockOnly"
        >
          <span>In Stock</span>
          <span v-if="inStockOnly">✓</span>
        </button>

        <!-- Sort Select -->
        <div class="flex items-center space-x-2 text-xs">
          <label class="text-stone-500 text-[11px] uppercase tracking-wider">Sort:</label>
          <select
            v-model="activeSort"
            class="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 py-1.5 px-3 text-xs focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Editorial</option>
            <option value="newest">Newest Arrivals</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Category Tabs Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          v-for="cat in CATEGORIES"
          :key="cat.id"
          class="px-4 py-2 uppercase tracking-widest font-medium whitespace-nowrap transition-all border"
          :class="activeCategory === cat.id ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold' : 'bg-transparent text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-400'"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Result Count & Reset -->
      <div class="hidden sm:flex items-center space-x-3 text-xs text-stone-500 whitespace-nowrap">
        <span>Showing <strong class="text-stone-900 dark:text-stone-100">{{ filteredProducts.length }}</strong> of {{ products.length }} Creations</span>
        <button
          v-if="activeCategory !== 'all' || activeGender !== 'all' || onlySale || inStockOnly || searchQuery"
          class="text-amber-800 dark:text-amber-400 hover:underline font-semibold"
          @click="resetFilters"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
