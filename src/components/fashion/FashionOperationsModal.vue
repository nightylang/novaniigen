<script setup lang="ts">
import { ref } from 'vue'
import { PRODUCTS } from '../../data/products'
import { useFashionStore } from '../../composables/useFashionStore'

const isOpen = ref(false)
const { formatPrice, cartTotalUSD } = useFashionStore()

const metrics = [
  { label: 'Today Revenue', value: '$52,840', change: '+18.4%', positive: true },
  { label: 'Atelier Orders', value: '142 orders', change: '+12.1%', positive: true },
  { label: 'Average Order Value', value: '$372.10', change: '+6.5%', positive: true },
  { label: 'Inventory Sell-Through', value: '84.6%', change: '+4.2%', positive: true }
]

const recentOrders = [
  { id: '#NV-984210', client: 'Eleanor Vance', item: 'The Architectural Wool Overcoat (Camel / M)', total: 680, status: 'Processing' },
  { id: '#NV-984209', client: 'Kenji Takahashi', item: 'The Structured Luna Tote (Burgundy)', total: 520, status: 'Shipped' },
  { id: '#NV-984208', client: 'Sophie Laurent', item: 'Bias-Cut Silk Slip Dress (Champagne / S)', total: 380, status: 'Delivered' },
  { id: '#NV-984207', client: 'Marcus Chen', item: 'Sleek Chelsea Lug Boot (Onyx / 42)', total: 430, status: 'Shipped' },
  { id: '#NV-984206', client: 'Isabella Rossi', item: 'Heavyweight Cashmere Ribbed Turtleneck (M)', total: 395, status: 'Delivered' }
]
</script>

<template>
  <div>
    <!-- Floating Operations Pill Trigger -->
    <div class="fixed bottom-6 left-6 z-40">
      <button
        class="px-4 py-2 bg-stone-900/90 dark:bg-stone-800/90 hover:bg-stone-950 text-white backdrop-blur-md border border-stone-700/80 rounded-full shadow-2xl flex items-center space-x-2 text-xs uppercase tracking-wider font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
        @click="isOpen = true"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Atelier Store Ops</span>
      </button>
    </div>

    <!-- Operations Dashboard Modal -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="fixed inset-0 bg-stone-950/80 backdrop-blur-md" @click="isOpen = false" />

      <div class="relative w-full max-w-4xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="p-6 border-b border-stone-800 flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold">Store Management Console</span>
            <h3 class="text-2xl font-serif font-light text-white">
              NOVANII ATELIER • Operations & Live Metrics
            </h3>
          </div>
          <button class="p-2 text-stone-400 hover:text-white" @click="isOpen = false">✕</button>
        </div>

        <!-- Metrics Grid -->
        <div class="p-6 overflow-y-auto space-y-6">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="m in metrics" :key="m.label" class="p-4 bg-stone-950 border border-stone-800 space-y-1">
              <span class="text-[10px] uppercase tracking-wider text-stone-400">{{ m.label }}</span>
              <div class="text-xl font-mono font-bold text-white">{{ m.value }}</div>
              <div class="text-[11px] text-emerald-400 font-medium">{{ m.change }} vs yesterday</div>
            </div>
          </div>

          <!-- Real-Time Stock Status -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-widest text-stone-400 font-semibold">Atelier Inventory Status</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="p in PRODUCTS.slice(0, 6)"
                :key="p.id"
                class="p-3 bg-stone-950 border border-stone-800 flex items-center justify-between text-xs"
              >
                <div class="truncate mr-2">
                  <div class="font-serif text-white truncate">{{ p.name }}</div>
                  <div class="text-[10px] text-stone-400">{{ p.category }} • {{ formatPrice(p.price) }}</div>
                </div>
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0"
                  :class="p.stockCount <= 4 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'"
                >
                  {{ p.stockCount }} in stock
                </span>
              </div>
            </div>
          </div>

          <!-- Recent Client Orders -->
          <div class="space-y-3">
            <h4 class="text-xs uppercase tracking-widest text-stone-400 font-semibold">Recent Store Orders</h4>
            <div class="overflow-x-auto border border-stone-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-stone-950 text-stone-400 text-[10px] uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th class="p-3">Order ID</th>
                    <th class="p-3">Client</th>
                    <th class="p-3">Garment</th>
                    <th class="p-3">Total</th>
                    <th class="p-3">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-800 text-stone-300">
                  <tr v-for="ord in recentOrders" :key="ord.id" class="hover:bg-stone-800/40">
                    <td class="p-3 font-mono text-amber-400">{{ ord.id }}</td>
                    <td class="p-3 font-medium text-white">{{ ord.client }}</td>
                    <td class="p-3 truncate max-w-xs">{{ ord.item }}</td>
                    <td class="p-3 font-mono">${{ ord.total }}</td>
                    <td class="p-3">
                      <span
                        class="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold"
                        :class="ord.status === 'Processing' ? 'bg-amber-950 text-amber-300' : ord.status === 'Shipped' ? 'bg-blue-950 text-blue-300' : 'bg-emerald-950 text-emerald-300'"
                      >
                        {{ ord.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="p-4 bg-stone-950 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400">
          <span>Connected to Milan & Paris Fulfillment API • Live Mode</span>
          <button class="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded" @click="isOpen = false">
            Close Console
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
