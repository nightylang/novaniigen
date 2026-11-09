<script setup lang="ts">
import { ref } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'

const {
  isCheckoutOpen,
  cart,
  cartTotalUSD,
  cartDiscountUSD,
  cartSubtotalUSD,
  cartShippingUSD,
  formatPrice,
  clearCart,
  showToast
} = useFashionStore()

const currentStep = ref<1 | 2 | 3 | 4>(1)

// Form fields
const email = ref('client@novanii-atelier.com')
const fullName = ref('Eleanor Vance')
const address = ref('740 Park Avenue, Apt 14B')
const city = ref('New York')
const postalCode = ref('10021')
const country = ref('United States')
const shippingOption = ref<'standard' | 'express'>('standard')
const paymentMethod = ref<'card' | 'apple' | 'klarna'>('card')
const cardNumber = ref('•••• •••• •••• 8842')
const cardExpiry = ref('08/29')
const cardCvc = ref('419')

const isProcessing = ref(false)
const orderId = ref('')

const handleNextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  } else if (currentStep.value === 3) {
    // Process Payment
    isProcessing.value = true
    setTimeout(() => {
      isProcessing.value = false
      orderId.value = `NV-${Math.floor(100000 + Math.random() * 900000)}`
      currentStep.value = 4
      clearCart()
      showToast('Order Placed Successfully', `Confirmation sent to ${email.value}`, 'success')
    }, 1200)
  }
}

const closeCheckout = () => {
  isCheckoutOpen.value = false
  currentStep.value = 1
}
</script>

<template>
  <div v-if="isCheckoutOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-stone-950/80 backdrop-blur-md" @click="closeCheckout" />

    <!-- Checkout Modal Container -->
    <div
      class="relative w-full max-w-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]"
      @click.stop
    >
      <!-- Header with Step Indicator -->
      <div class="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase tracking-[0.25em] text-amber-800 dark:text-amber-400 font-semibold">
            NOVANII ATELIER CHECKOUT
          </span>
          <h2 class="text-2xl font-serif font-light text-stone-950 dark:text-stone-50">
            <span v-if="currentStep === 1">1. Shipping Address</span>
            <span v-else-if="currentStep === 2">2. Delivery Method</span>
            <span v-else-if="currentStep === 3">3. Payment & Review</span>
            <span v-else>Order Confirmed</span>
          </h2>
        </div>

        <button class="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-white" @click="closeCheckout">
          ✕
        </button>
      </div>

      <!-- Step Bar (Steps 1-3) -->
      <div v-if="currentStep < 4" class="px-6 py-2 bg-stone-100 dark:bg-stone-950 flex items-center justify-between text-xs text-stone-500">
        <div class="flex items-center space-x-2" :class="currentStep >= 1 ? 'font-bold text-stone-900 dark:text-stone-100' : ''">
          <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="currentStep >= 1 ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : ''">1</span>
          <span>Shipping</span>
        </div>
        <div class="w-8 h-px bg-stone-300 dark:bg-stone-700"></div>
        <div class="flex items-center space-x-2" :class="currentStep >= 2 ? 'font-bold text-stone-900 dark:text-stone-100' : ''">
          <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="currentStep >= 2 ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : ''">2</span>
          <span>Courier</span>
        </div>
        <div class="w-8 h-px bg-stone-300 dark:bg-stone-700"></div>
        <div class="flex items-center space-x-2" :class="currentStep >= 3 ? 'font-bold text-stone-900 dark:text-stone-100' : ''">
          <span class="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" :class="currentStep >= 3 ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : ''">3</span>
          <span>Payment</span>
        </div>
      </div>

      <!-- Modal Body Content -->
      <div class="p-6 overflow-y-auto flex-1 space-y-5">
        <!-- Step 1: Shipping Address -->
        <div v-if="currentStep === 1" class="space-y-4">
          <div class="space-y-1">
            <label class="text-xs uppercase tracking-wider text-stone-500 font-medium">Email for Order Updates</label>
            <input
              v-model="email"
              type="email"
              class="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs uppercase tracking-wider text-stone-500 font-medium">Full Name</label>
              <input
                v-model="fullName"
                type="text"
                class="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
            <div class="space-y-1">
              <label class="text-xs uppercase tracking-wider text-stone-500 font-medium">Country / Region</label>
              <input
                v-model="country"
                type="text"
                class="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs uppercase tracking-wider text-stone-500 font-medium">Street Address</label>
            <input
              v-model="address"
              type="text"
              class="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs uppercase tracking-wider text-stone-500 font-medium">City</label>
              <input
                v-model="city"
                type="text"
                class="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
            <div class="space-y-1">
              <label class="text-xs uppercase tracking-wider text-stone-500 font-medium">Postal / ZIP Code</label>
              <input
                v-model="postalCode"
                type="text"
                class="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 px-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Step 2: Shipping Method -->
        <div v-else-if="currentStep === 2" class="space-y-3">
          <div
            class="p-4 border cursor-pointer transition-all flex items-center justify-between"
            :class="shippingOption === 'standard' ? 'border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800' : 'border-stone-300 dark:border-stone-800'"
            @click="shippingOption = 'standard'"
          >
            <div class="space-y-0.5">
              <div class="font-semibold text-xs text-stone-900 dark:text-stone-100">
                DHL Express Carbon-Neutral (Complimentary)
              </div>
              <div class="text-[11px] text-stone-500">2-4 Business Days Worldwide • Signature Required</div>
            </div>
            <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
          </div>

          <div
            class="p-4 border cursor-pointer transition-all flex items-center justify-between"
            :class="shippingOption === 'express' ? 'border-stone-900 dark:border-white bg-stone-100 dark:bg-stone-800' : 'border-stone-300 dark:border-stone-800'"
            @click="shippingOption = 'express'"
          >
            <div class="space-y-0.5">
              <div class="font-semibold text-xs text-stone-900 dark:text-stone-100">
                Atelier White-Glove Next-Day Courier
              </div>
              <div class="text-[11px] text-stone-500">Delivered within 24 hours in sealed luxury garment box</div>
            </div>
            <span class="text-xs font-mono font-bold">$25</span>
          </div>
        </div>

        <!-- Step 3: Payment Method -->
        <div v-else-if="currentStep === 3" class="space-y-4">
          <!-- Method Selection -->
          <div class="grid grid-cols-3 gap-2">
            <button
              class="py-2.5 text-xs font-medium border uppercase tracking-wider transition-colors"
              :class="paymentMethod === 'card' ? 'bg-stone-950 text-white dark:bg-white dark:text-stone-950 border-transparent font-bold' : 'border-stone-300 dark:border-stone-700'"
              @click="paymentMethod = 'card'"
            >
              Credit Card
            </button>
            <button
              class="py-2.5 text-xs font-medium border uppercase tracking-wider transition-colors"
              :class="paymentMethod === 'apple' ? 'bg-stone-950 text-white dark:bg-white dark:text-stone-950 border-transparent font-bold' : 'border-stone-300 dark:border-stone-700'"
              @click="paymentMethod = 'apple'"
            >
              Apple Pay
            </button>
            <button
              class="py-2.5 text-xs font-medium border uppercase tracking-wider transition-colors"
              :class="paymentMethod === 'klarna' ? 'bg-stone-950 text-white dark:bg-white dark:text-stone-950 border-transparent font-bold' : 'border-stone-300 dark:border-stone-700'"
              @click="paymentMethod = 'klarna'"
            >
              Klarna Pay
            </button>
          </div>

          <!-- Card Form -->
          <div v-if="paymentMethod === 'card'" class="space-y-3 p-4 bg-stone-100 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
            <div class="space-y-1">
              <label class="text-[11px] uppercase tracking-wider text-stone-500">Card Number</label>
              <input
                v-model="cardNumber"
                type="text"
                class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-xs font-mono"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-[11px] uppercase tracking-wider text-stone-500">Expires</label>
                <input
                  v-model="cardExpiry"
                  type="text"
                  class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-xs font-mono"
                />
              </div>
              <div class="space-y-1">
                <label class="text-[11px] uppercase tracking-wider text-stone-500">Security CVC</label>
                <input
                  v-model="cardCvc"
                  type="text"
                  class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-3 py-1.5 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <!-- Order Summary Card -->
          <div class="p-4 bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div class="flex justify-between text-stone-500">
              <span>Delivery To:</span>
              <span class="font-medium text-stone-900 dark:text-stone-100">{{ fullName }} ({{ city }})</span>
            </div>
            <div class="flex justify-between text-stone-500">
              <span>Items Total:</span>
              <span class="font-mono text-stone-900 dark:text-stone-100">{{ formatPrice(cartTotalUSD) }}</span>
            </div>
          </div>
        </div>

        <!-- Step 4: Order Confirmed & Receipt -->
        <div v-else-if="currentStep === 4" class="py-8 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>

          <h3 class="text-3xl font-serif font-light text-stone-900 dark:text-stone-100">
            Thank you for your order
          </h3>

          <p class="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Order Reference <strong>#{{ orderId }}</strong> has been dispatched to our Milan logistics atelier. A tracking code will be sent to <strong>{{ email }}</strong>.
          </p>

          <div class="p-4 max-w-sm mx-auto bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-left text-xs space-y-2">
            <div class="flex justify-between">
              <span class="text-stone-500">Estimated Arrival:</span>
              <span class="font-bold">Thursday, 3 Business Days</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500">Recipient:</span>
              <span>{{ fullName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500">Shipping:</span>
              <span>{{ address }}, {{ city }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="p-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900">
        <button
          v-if="currentStep > 1 && currentStep < 4"
          class="px-4 py-2 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-white"
          @click="currentStep--"
        >
          ← Back
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < 4"
          class="px-8 py-3 bg-stone-950 dark:bg-amber-600 text-white text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center space-x-2 cursor-pointer"
          :disabled="isProcessing"
          @click="handleNextStep"
        >
          <span v-if="isProcessing">Processing atelier transaction...</span>
          <span v-else-if="currentStep === 3">Confirm & Authorize ({{ formatPrice(cartTotalUSD) }})</span>
          <span v-else>Continue</span>
        </button>

        <button
          v-else
          class="w-full py-3 bg-stone-950 dark:bg-amber-600 text-white text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition-all cursor-pointer"
          @click="closeCheckout"
        >
          Return to Boutique
        </button>
      </div>
    </div>
  </div>
</template>
