<script setup lang="ts">
import { ref } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'
import { PRODUCTS } from '../../data/products'

const { addToCart, openQuickView, formatPrice } = useFashionStore()

const activeHotspot = ref<number | null>(0)

const lookbookItems = [
  {
    product: PRODUCTS[0], // Architectural Overcoat
    top: '38%',
    left: '48%',
    label: 'Architectural Wool Overcoat',
    price: 680
  },
  {
    product: PRODUCTS[3], // Luna Tote
    top: '64%',
    left: '68%',
    label: 'Structured Luna Tote',
    price: 520
  },
  {
    product: PRODUCTS[4], // Chelsea Boot
    top: '86%',
    left: '42%',
    label: 'Sleek Chelsea Lug Boot',
    price: 430
  }
]

const handleQuickAdd = (product: any) => {
  addToCart(product, product.colors[0], product.sizes[0] || 'M', 1)
}
</script>

<template>
  <section id="lookbook-section" class="py-20 sm:py-28 bg-stone-900 text-stone-100 overflow-hidden relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-2xl mb-12 sm:mb-16 space-y-3">
        <span class="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300">
          Editorial Showcase
        </span>
        <h2 class="text-3xl sm:text-5xl font-serif font-light tracking-tight text-white leading-tight">
          The Autumn Edit: <br />
          <span class="italic font-normal text-amber-100/90">Shop The Runway Silhouette</span>
        </h2>
        <p class="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
          Hover or tap the interactive atelier pins on the editorial portrait below to inspect individual garments and add them directly to your wardrobe.
        </p>
      </div>

      <!-- Split Layout: Interactive Model on Left, Garment List on Right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <!-- Left: Interactive Image with Hotspot Pins (7 cols) -->
        <div class="lg:col-span-7 relative aspect-[4/5] sm:aspect-[3/4] bg-stone-950 overflow-hidden shadow-2xl border border-stone-800">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
            alt="Novanii Autumn Lookbook Editorial"
            class="w-full h-full object-cover object-top filter brightness-95 contrast-[1.05]"
          />

          <!-- Hotspot Pins -->
          <div
            v-for="(item, idx) in lookbookItems"
            :key="idx"
            class="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            :style="{ top: item.top, left: item.left }"
            @click="activeHotspot = idx"
          >
            <!-- Pulsing Pin Circle -->
            <div class="relative flex items-center justify-center">
              <span class="absolute w-8 h-8 rounded-full bg-white/40 animate-ping"></span>
              <span
                class="relative w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xl transition-all"
                :class="activeHotspot === idx ? 'bg-amber-400 text-stone-950 scale-125' : 'bg-stone-950/80 text-white group-hover:scale-110'"
              >
                {{ idx + 1 }}
              </span>
            </div>

            <!-- Floating Preview Tooltip on Pin -->
            <div
              class="absolute left-8 -top-3 w-48 p-3 bg-stone-950/95 backdrop-blur-md border border-stone-700 shadow-2xl text-left hidden sm:block pointer-events-none transition-all duration-300"
              :class="activeHotspot === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'"
            >
              <div class="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">Piece 0{{ idx + 1 }}</div>
              <div class="text-xs font-serif text-white truncate font-medium">{{ item.label }}</div>
              <div class="text-xs text-amber-200 font-mono mt-0.5">{{ formatPrice(item.price) }}</div>
            </div>
          </div>

          <div class="absolute bottom-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-widest text-stone-300 border border-stone-800">
            Editorial N° 07 • Paris Fashion Week
          </div>
        </div>

        <!-- Right: Garments in this Look (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="pb-3 border-b border-stone-800 flex items-center justify-between">
            <span class="text-xs uppercase tracking-widest text-stone-400 font-medium">Pieces Featured In This Look</span>
            <span class="text-xs text-amber-400 font-mono">3 Creations</span>
          </div>

          <div class="space-y-4">
            <div
              v-for="(item, idx) in lookbookItems"
              :key="idx"
              class="p-4 border transition-all cursor-pointer flex space-x-4 items-center"
              :class="activeHotspot === idx ? 'border-amber-400/80 bg-stone-800/80 shadow-lg' : 'border-stone-800 bg-stone-950/50 hover:border-stone-700'"
              @click="activeHotspot = idx"
            >
              <!-- Index Badge -->
              <span
                class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                :class="activeHotspot === idx ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-300'"
              >
                {{ idx + 1 }}
              </span>

              <!-- Thumbnail -->
              <div class="w-16 h-20 bg-stone-900 overflow-hidden shrink-0">
                <img :src="item.product.images[0]" :alt="item.product.name" class="w-full h-full object-cover object-top" />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-serif text-white font-medium truncate">{{ item.product.name }}</h4>
                <p class="text-xs text-stone-400 truncate">{{ item.product.subtitle }}</p>
                <div class="mt-1.5 flex items-center space-x-3">
                  <span class="text-sm font-semibold font-mono text-amber-300">{{ formatPrice(item.product.price) }}</span>
                  <button
                    class="text-[11px] uppercase tracking-wider text-stone-300 hover:text-white underline"
                    @click.stop="openQuickView(item.product)"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <!-- Quick Add -->
              <button
                class="p-2.5 bg-white text-stone-950 hover:bg-amber-300 transition-colors shrink-0 font-semibold"
                title="Add to Bag"
                @click.stop="handleQuickAdd(item.product)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Total Look Price & Add All -->
          <div class="pt-4 border-t border-stone-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase tracking-widest text-stone-400 block">Complete Look Value</span>
              <span class="text-lg font-serif font-light text-white font-mono">
                {{ formatPrice(680 + 520 + 430) }}
              </span>
            </div>

            <button
              class="px-6 py-3 bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-[0.2em] hover:bg-amber-300 transition-all cursor-pointer"
              @click="lookbookItems.forEach(i => handleQuickAdd(i.product))"
            >
              Add Entire Ensemble
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
