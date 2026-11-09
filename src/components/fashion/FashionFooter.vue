<script setup lang="ts">
import { useFashionStore } from '../../composables/useFashionStore'

const { isSizeGuideOpen } = useFashionStore()
</script>

<template>
  <footer class="bg-stone-950 text-stone-300 pt-20 pb-12 border-t border-stone-800 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <!-- Main Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Col 1: Brand Info (2 cols on lg) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="space-y-1">
            <span class="text-2xl font-serif tracking-[0.25em] text-white font-light">NOVANII</span>
            <span class="block text-[9px] uppercase tracking-[0.45em] text-stone-500">ATELIER • MAISON</span>
          </div>

          <p class="text-stone-400 font-light leading-relaxed max-w-sm">
            Architectural tailoring, Italian virgin wool, Grade-A cashmere, and vegetable-tanned French calfskin leather. Created with rigorous attention to proportion, form, and longevity.
          </p>

          <div class="pt-2 text-[11px] text-amber-400 font-medium">
            ✦ Carbon-Neutral Worldwide Fulfillment Center
          </div>
        </div>

        <!-- Col 2: Boutiques -->
        <div class="space-y-3">
          <h4 class="text-xs uppercase tracking-[0.2em] font-semibold text-white">Boutiques</h4>
          <ul class="space-y-2.5 text-stone-400 font-light">
            <li>
              <strong class="text-stone-200 block font-normal">Paris Saint-Honoré</strong>
              <span>14 Rue Saint-Honoré, 75001</span>
            </li>
            <li>
              <strong class="text-stone-200 block font-normal">New York SoHo</strong>
              <span>450 Broome Street, NY 10013</span>
            </li>
            <li>
              <strong class="text-stone-200 block font-normal">Tokyo Ginza</strong>
              <span>Ginza Six, 6-10-1 Chuo-ku</span>
            </li>
            <li>
              <strong class="text-stone-200 block font-normal">London Mayfair</strong>
              <span>28 Old Bond St, W1S 4QR</span>
            </li>
          </ul>
        </div>

        <!-- Col 3: Client Services -->
        <div class="space-y-3">
          <h4 class="text-xs uppercase tracking-[0.2em] font-semibold text-white">Client Concierge</h4>
          <ul class="space-y-2 text-stone-400 font-light">
            <li><a href="#" class="hover:text-white transition-colors">Bespoke Appointments</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Order Tracking</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Complimentary Returns</a></li>
            <li>
              <button class="hover:text-white transition-colors text-left" @click="isSizeGuideOpen = true">
                Size & Fit Guide
              </button>
            </li>
            <li><a href="#" class="hover:text-white transition-colors">Garment Care & Restoration</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Private Client Services</a></li>
          </ul>
        </div>

        <!-- Col 4: Maison Ethics -->
        <div class="space-y-3">
          <h4 class="text-xs uppercase tracking-[0.2em] font-semibold text-white">The Maison</h4>
          <ul class="space-y-2 text-stone-400 font-light">
            <li><a href="#" class="hover:text-white transition-colors">Artisanal Craftsmanship</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Sustainable Wool Sourcing</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Circular Recycling Program</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Autumn/Winter '26 Journal</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Press & Media Enquiries</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
        <div class="flex items-center space-x-4">
          <span>© 2026 NOVANII ATELIER INC. ALL RIGHTS RESERVED.</span>
          <span class="hidden md:inline">•</span>
          <a href="#" class="hover:text-stone-300">Privacy Policy</a>
          <a href="#" class="hover:text-stone-300">Terms of Service</a>
        </div>

        <!-- Payment Badges -->
        <div class="flex items-center space-x-3 text-stone-400">
          <span class="px-2 py-0.5 border border-stone-800 rounded bg-stone-900 text-[10px]">VISA</span>
          <span class="px-2 py-0.5 border border-stone-800 rounded bg-stone-900 text-[10px]">MASTERCARD</span>
          <span class="px-2 py-0.5 border border-stone-800 rounded bg-stone-900 text-[10px]">AMEX</span>
          <span class="px-2 py-0.5 border border-stone-800 rounded bg-stone-900 text-[10px]">APPLE PAY</span>
        </div>
      </div>
    </div>
  </footer>
</template>
