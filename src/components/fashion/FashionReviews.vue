<script setup lang="ts">
const reviews = [
  {
    author: 'Genevieve Delacroix',
    location: 'Paris, France',
    rating: 5,
    title: 'The architectural overcoat is a sartorial masterpiece.',
    content: 'The weight of the Italian virgin wool and the precision of the lapel roll rival bespoke Savile Row tailoring. The drape is sensational whether worn buttoned or casually draped over shoulders.',
    item: 'The Architectural Wool Overcoat (Camel Tan)',
    verified: true
  },
  {
    author: 'Julian Mercer',
    location: 'SoHo, New York',
    rating: 5,
    title: 'Pure Mongolian Cashmere that truly resists pilling.',
    content: 'Having worn Loro Piana and Brunello Cucinelli for years, the 7-gauge knit from Novanii matches that standard of softness and thermal insulation. An essential everyday staple.',
    item: 'Heavyweight Cashmere Ribbed Turtleneck',
    verified: true
  },
  {
    author: 'Kenji Takahashi',
    location: 'Aoyama, Tokyo',
    rating: 5,
    title: 'Flawless calfskin leather and minimalist hardware.',
    content: 'The Luna Tote has become my daily uniform. The Tuscan vegetable-tanned leather already developed a sublime patina after four months of usage. Exquisite craftsmanship.',
    item: 'The Structured Luna Tote (Burgundy)',
    verified: true
  }
]
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
    <div class="text-center max-w-xl mx-auto mb-16 space-y-3">
      <span class="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800 dark:text-amber-400">
        Client Testimonials
      </span>
      <h2 class="text-3xl sm:text-4xl font-serif font-light text-stone-900 dark:text-stone-100">
        Atelier Critique & Reviews
      </h2>
      <div class="flex items-center justify-center space-x-2 text-xs text-stone-500 pt-1">
        <div class="flex text-amber-500">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span class="font-medium text-stone-900 dark:text-stone-100">4.9 / 5.0</span>
        <span>•</span>
        <span>Based on 1,480+ Global Verified Clients</span>
      </div>
    </div>

    <!-- Review Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(r, idx) in reviews"
        :key="idx"
        class="p-8 bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 shadow-sm flex flex-col justify-between space-y-6"
      >
        <div class="space-y-4">
          <!-- Stars -->
          <div class="flex text-amber-500 text-xs">
            <span v-for="s in r.rating" :key="s">★</span>
          </div>

          <!-- Title & Quote -->
          <h3 class="text-lg font-serif font-normal text-stone-900 dark:text-stone-100 leading-snug">
            "{{ r.title }}"
          </h3>
          <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
            {{ r.content }}
          </p>
        </div>

        <div class="pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-1">
          <div class="flex items-center justify-between text-xs font-semibold text-stone-900 dark:text-stone-100">
            <span>{{ r.author }}</span>
            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 font-normal">
              <span>✓</span>
              <span>Verified Client</span>
            </span>
          </div>
          <div class="text-[11px] text-stone-400">{{ r.location }}</div>
          <div class="text-[10px] text-amber-800 dark:text-amber-400 pt-1 uppercase tracking-wider font-medium truncate">
            {{ r.item }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
