<script setup lang="ts">
import { useFashionStore } from '../../composables/useFashionStore'

const { activeCategory } = useFashionStore()

const capsules = [
  {
    id: 'outerwear',
    title: 'The Coat & Trench Edit',
    subtitle: 'Virgin wool, double-face gabardine & cocoon silhouettes',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    count: '3 Creations'
  },
  {
    id: 'tailoring',
    title: 'Contemporary Tailoring',
    subtitle: 'Relaxed blazers, high-twist crepe & wide-leg trousers',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    count: '3 Creations'
  },
  {
    id: 'knitwear',
    title: 'Cashmere & Alpaca Knits',
    subtitle: '7-gauge Mongolian rib knit and Peruvian baby alpaca',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    count: '2 Creations'
  },
  {
    id: 'leather',
    title: 'Tuscan Leather Goods',
    subtitle: 'Vegetable-tanned calfskin, palladium hardware',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    count: '2 Creations'
  }
]

const selectCapsule = (catId: string) => {
  activeCategory.value = catId
  const el = document.getElementById('catalog-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200 dark:border-stone-800">
      <div>
        <span class="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800 dark:text-amber-400">
          Wardrobe Pillars
        </span>
        <h2 class="text-3xl sm:text-4xl font-serif font-light text-stone-900 dark:text-stone-100 mt-1">
          Explore by Capsule
        </h2>
      </div>
      <p class="text-xs text-stone-500 uppercase tracking-widest mt-2 md:mt-0 font-medium">
        Curated seasonal staples designed for longevity
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="cap in capsules"
        :key="cap.id"
        class="group relative h-[380px] sm:h-[440px] overflow-hidden bg-stone-900 cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
        @click="selectCapsule(cap.id)"
      >
        <!-- Background Image with Zoom on Hover -->
        <img
          :src="cap.image"
          :alt="cap.title"
          class="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700 ease-out"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>

        <!-- Pill Counter -->
        <div class="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase tracking-widest text-stone-300 font-medium rounded-full">
          {{ cap.count }}
        </div>

        <!-- Card Content -->
        <div class="absolute bottom-0 inset-x-0 p-6 space-y-2 text-white">
          <h3 class="text-xl font-serif font-normal group-hover:translate-x-1 transition-transform">
            {{ cap.title }}
          </h3>
          <p class="text-xs text-stone-300 line-clamp-2 font-light">
            {{ cap.subtitle }}
          </p>
          <div class="pt-2 flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-300 font-semibold opacity-90 group-hover:opacity-100">
            <span>Explore Capsule</span>
            <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
