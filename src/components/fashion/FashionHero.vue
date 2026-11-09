<script setup lang="ts">
import { useFashionStore } from '../../composables/useFashionStore'

const { activeCategory } = useFashionStore()

const scrollToCatalog = (cat = 'all') => {
  activeCategory.value = cat
  const el = document.getElementById('catalog-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-stone-900 text-stone-100">
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
        alt="Novanii Haute Couture Editorial"
        class="w-full h-full object-cover object-top filter brightness-[0.78] contrast-[1.05] scale-105 transition-transform duration-1000 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/30"></div>
      <div class="absolute inset-0 bg-stone-950/20 backdrop-blur-[1px]"></div>
    </div>

    <!-- Hero Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
      <div class="max-w-2xl lg:max-w-3xl space-y-6">
        <!-- Collection Tag -->
        <div class="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-amber-200 text-xs uppercase tracking-[0.25em] font-medium shadow-xl">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          <span>AUTUMN / WINTER 2026 • VOLUME VII</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.08] text-white">
          Understated Elegance. <br />
          <span class="italic font-normal text-amber-100/90">Sculpted Silhouettes.</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-xl">
          Architectural tailoring meets fluid drape. Handcrafted in northern Italy and Tuscany using virgin melton wool, Grade-A cashmere, and vegetable-tanned French calfskin.
        </p>

        <!-- CTAs -->
        <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            class="px-8 py-4 bg-white text-stone-950 font-medium text-xs uppercase tracking-[0.2em] rounded-none hover:bg-stone-200 transition-all shadow-2xl flex items-center justify-center space-x-2 group cursor-pointer"
            @click="scrollToCatalog('all')"
          >
            <span>Explore Collection</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <a
            href="#lookbook-section"
            class="px-8 py-4 bg-transparent text-white font-medium text-xs uppercase tracking-[0.2em] rounded-none border border-white/60 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center space-x-2"
          >
            <span>View Lookbook</span>
          </a>
        </div>

        <!-- Micro Feature Badges -->
        <div class="pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-400">
          <div class="flex items-center space-x-2">
            <span class="text-amber-400">✦</span>
            <span>Italian Virgin Wool</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-amber-400">✦</span>
            <span>Grade-A Cashmere</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-amber-400">✦</span>
            <span>Tuscan Leather</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-amber-400">✦</span>
            <span>Express Courier</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-6 right-8 hidden md:flex items-center space-x-3 text-stone-400 text-xs uppercase tracking-widest font-light">
      <span>Scroll to explore</span>
      <div class="w-6 h-10 border border-stone-600 rounded-full flex items-start justify-center p-1.5">
        <div class="w-1 h-2 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  </section>
</template>
