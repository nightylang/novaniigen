<script setup lang="ts">
import { ref } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'

const {
  isCartOpen,
  cart,
  cartCount,
  cartSubtotalUSD,
  cartDiscountUSD,
  cartShippingUSD,
  cartEstimatedTaxUSD,
  cartTotalUSD,
  freeShippingProgress,
  freeShippingRemainingUSD,
  appliedPromoCode,
  discountPercent,
  formatPrice,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  applyPromo,
  removePromo,
  isCheckoutOpen
} = useFashionStore()

const promoInput = ref('')
const promoError = ref('')

const handleApplyPromo = () => {
  if (!promoInput.value.trim()) return
  const res = applyPromo(promoInput.value)
  if (!res.success) {
    promoError.value = res.message
  } else {
    promoError.value = ''
    promoInput.value = ''
  }
}

const proceedToCheckout = () => {
  isCartOpen.value = false
  isCheckoutOpen.value = true
}
</script>

<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isCartOpen"
      class="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm transition-opacity duration-300"
      @click="isCartOpen = false"
    />

    <!-- Drawer Panel -->
    <aside
      class="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md bg-stone-50 dark:bg-stone-950 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out"
      :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Drawer Header -->
      <div class="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <h2 class="text-xl font-serif font-light text-stone-950 dark:text-stone-50">
            Shopping Bag
          </h2>
          <span class="text-xs px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
            {{ cartCount }}
          </span>
        </div>

        <button
          class="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
          title="Close Bag"
          @click="isCartOpen = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Free Shipping Bar -->
      <div class="px-6 py-3.5 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-xs">
        <div class="flex items-center justify-between mb-1.5 font-medium text-stone-700 dark:text-stone-300">
          <span v-if="freeShippingRemainingUSD > 0">
            Add <strong class="text-amber-800 dark:text-amber-400">{{ formatPrice(freeShippingRemainingUSD) }}</strong> for Free Express Delivery
          </span>
          <span v-else class="text-emerald-700 dark:text-emerald-400 font-bold flex items-center space-x-1">
            <span>✓</span>
            <span>You've unlocked Complimentary Express Courier!</span>
          </span>
          <span class="text-[11px] text-stone-400 font-mono">{{ freeShippingProgress }}%</span>
        </div>
        <div class="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-amber-800 dark:bg-amber-500 transition-all duration-500"
            :style="{ width: `${freeShippingProgress}%` }"
          />
        </div>
      </div>

      <!-- Cart Items List -->
      <div class="flex-1 overflow-y-auto p-6 divide-y divide-stone-200 dark:divide-stone-800/80">
        <div v-if="cart.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div class="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center text-stone-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-serif">Your shopping bag is empty</h3>
            <p class="text-xs text-stone-500 max-w-xs mt-1">Discover handcrafted coats, knitwear, and accessories from our latest collection.</p>
          </div>
          <button
            class="px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
            @click="isCartOpen = false"
          >
            Explore Collection
          </button>
        </div>

        <div
          v-for="item in cart"
          :key="item.id"
          class="py-4 first:pt-0 last:pb-0 flex space-x-4"
        >
          <!-- Thumbnail -->
          <div class="w-20 h-26 bg-stone-100 dark:bg-stone-900 overflow-hidden flex-shrink-0">
            <img
              :src="item.selectedColor.image || item.product.images[0]"
              :alt="item.product.name"
              class="w-full h-full object-cover object-top"
            />
          </div>

          <!-- Info -->
          <div class="flex-1 flex flex-col justify-between">
            <div class="space-y-1">
              <div class="flex items-start justify-between">
                <h4 class="text-sm font-serif font-normal text-stone-900 dark:text-stone-100 line-clamp-1">
                  {{ item.product.name }}
                </h4>
                <button
                  class="text-stone-400 hover:text-rose-600 transition-colors ml-2"
                  title="Remove from Bag"
                  @click="removeFromCart(item.id)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400">
                <span>Size: <strong class="text-stone-800 dark:text-stone-200">{{ item.selectedSize }}</strong></span>
                <span>•</span>
                <span class="flex items-center space-x-1">
                  <span>Color:</span>
                  <span class="inline-block w-2.5 h-2.5 rounded-full border border-stone-300 dark:border-stone-700" :style="{ backgroundColor: item.selectedColor.hex }"></span>
                  <strong class="text-stone-800 dark:text-stone-200">{{ item.selectedColor.name }}</strong>
                </span>
              </div>
            </div>

            <!-- Quantity & Item Price -->
            <div class="flex items-center justify-between pt-2">
              <div class="inline-flex items-center border border-stone-300 dark:border-stone-700 text-xs">
                <button
                  class="px-2 py-1 text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  @click="updateCartQuantity(item.id, -1)"
                >
                  -
                </button>
                <span class="px-2.5 py-1 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {{ item.quantity }}
                </span>
                <button
                  class="px-2 py-1 text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  @click="updateCartQuantity(item.id, 1)"
                >
                  +
                </button>
              </div>

              <span class="text-sm font-semibold tracking-wide text-stone-900 dark:text-stone-100">
                {{ formatPrice(item.product.price * item.quantity) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Footer with Pricing & Checkout -->
      <div v-if="cart.length > 0" class="p-6 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-4">
        <!-- Promo Code Input -->
        <div class="space-y-1.5">
          <div class="flex space-x-2">
            <input
              v-model="promoInput"
              type="text"
              placeholder="Promo Code (try ATELIER15)"
              class="flex-1 bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wider focus:outline-none focus:border-stone-900"
            />
            <button
              class="px-4 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
              @click="handleApplyPromo"
            >
              Apply
            </button>
          </div>
          <p v-if="promoError" class="text-[11px] text-rose-600">{{ promoError }}</p>
          <div v-if="appliedPromoCode" class="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1">
            <span>Code <strong>{{ appliedPromoCode }}</strong> applied ({{ discountPercent }}% off)</span>
            <button class="text-stone-400 hover:text-rose-500" @click="removePromo">✕</button>
          </div>
        </div>

        <!-- Pricing Breakdown -->
        <div class="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-800">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="font-medium text-stone-900 dark:text-stone-100">{{ formatPrice(cartSubtotalUSD) }}</span>
          </div>

          <div v-if="cartDiscountUSD > 0" class="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>Privé Discount ({{ discountPercent }}%)</span>
            <span>-{{ formatPrice(cartDiscountUSD) }}</span>
          </div>

          <div class="flex justify-between">
            <span>Shipping</span>
            <span>
              {{ cartShippingUSD === 0 ? 'FREE (Express Courier)' : formatPrice(cartShippingUSD) }}
            </span>
          </div>

          <div class="flex justify-between">
            <span>Estimated Duty & Tax</span>
            <span>{{ formatPrice(cartEstimatedTaxUSD) }}</span>
          </div>

          <div class="flex justify-between text-base font-serif font-semibold text-stone-950 dark:text-stone-50 pt-2 border-t border-stone-200 dark:border-stone-800">
            <span>Total</span>
            <span>{{ formatPrice(cartTotalUSD) }}</span>
          </div>
        </div>

        <!-- Checkout Action Button -->
        <button
          class="w-full py-4 bg-stone-950 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-500 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-[0.99] cursor-pointer"
          @click="proceedToCheckout"
        >
          <span>Proceed to Checkout</span>
          <span>•</span>
          <span>{{ formatPrice(cartTotalUSD) }}</span>
        </button>

        <p class="text-[10px] text-center text-stone-400 uppercase tracking-widest font-light">
          Complimentary Carbon-Neutral Delivery & 30-Day Returns
        </p>
      </div>
    </aside>
  </div>
</template>
