<script setup lang="ts">
import { ref } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'

const { isSizeGuideOpen } = useFashionStore()
const unit = ref<'in' | 'cm'>('cm')

const measurements = [
  { size: 'XS', chestCm: '82 - 86', chestIn: '32 - 34', waistCm: '64 - 68', waistIn: '25 - 27', hipCm: '88 - 92', hipIn: '34 - 36' },
  { size: 'S', chestCm: '86 - 92', chestIn: '34 - 36', waistCm: '68 - 74', waistIn: '27 - 29', hipCm: '92 - 98', hipIn: '36 - 38' },
  { size: 'M', chestCm: '92 - 98', chestIn: '36 - 38', waistCm: '74 - 80', waistIn: '29 - 31', hipCm: '98 - 104', hipIn: '38 - 41' },
  { size: 'L', chestCm: '98 - 104', chestIn: '38 - 41', waistCm: '80 - 88', waistIn: '31 - 34', hipCm: '104 - 110', hipIn: '41 - 43' },
  { size: 'XL', chestCm: '104 - 112', chestIn: '41 - 44', waistCm: '88 - 96', waistIn: '34 - 38', hipCm: '110 - 118', hipIn: '43 - 46' }
]
</script>

<template>
  <div v-if="isSizeGuideOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-stone-950/80 backdrop-blur-md" @click="isSizeGuideOpen = false" />

    <!-- Modal Box -->
    <div class="relative w-full max-w-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 z-10 shadow-2xl">
      <div class="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h3 class="text-2xl font-serif font-light text-stone-950 dark:text-stone-50">
            Size & Fit Guide
          </h3>
          <p class="text-xs text-stone-500 uppercase tracking-widest mt-0.5">
            European Standard Tailoring
          </p>
        </div>

        <button class="p-2 text-stone-400 hover:text-stone-950 dark:hover:text-white" @click="isSizeGuideOpen = false">
          ✕
        </button>
      </div>

      <!-- Unit Toggle -->
      <div class="my-4 flex items-center justify-between">
        <span class="text-xs text-stone-500 uppercase tracking-wider">Select Unit:</span>
        <div class="inline-flex border border-stone-300 dark:border-stone-700 text-xs">
          <button
            class="px-3 py-1 font-semibold"
            :class="unit === 'cm' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-500'"
            @click="unit = 'cm'"
          >
            Centimeters (CM)
          </button>
          <button
            class="px-3 py-1 font-semibold"
            :class="unit === 'in' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'text-stone-500'"
            @click="unit = 'in'"
          >
            Inches (IN)
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-widest text-[10px]">
              <th class="py-2.5 font-semibold">Size</th>
              <th class="py-2.5 font-semibold">Bust / Chest</th>
              <th class="py-2.5 font-semibold">Waist</th>
              <th class="py-2.5 font-semibold">Hips</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
            <tr v-for="row in measurements" :key="row.size">
              <td class="py-3 font-bold text-stone-950 dark:text-stone-100">{{ row.size }}</td>
              <td class="py-3 font-mono">{{ unit === 'cm' ? row.chestCm : row.chestIn }}</td>
              <td class="py-3 font-mono">{{ unit === 'cm' ? row.waistCm : row.waistIn }}</td>
              <td class="py-3 font-mono">{{ unit === 'cm' ? row.hipCm : row.hipIn }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Advice Note -->
      <div class="mt-6 p-3 bg-stone-100 dark:bg-stone-800/60 text-[11px] text-stone-500 dark:text-stone-400 space-y-1">
        <p><strong>Fit Advice:</strong> Our overcoats and blazers are tailored with contemporary relaxed volume. If you prefer a sculpted traditional fit, we recommend selecting one size down.</p>
        <p>For bespoke size inquiries, contact our atelier concierge at concierge@novanii.com.</p>
      </div>
    </div>
  </div>
</template>
