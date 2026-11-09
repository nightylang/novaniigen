<script setup lang="ts">
import { ref } from 'vue'
import { useFashionStore } from '../../composables/useFashionStore'

const { showToast } = useFashionStore()
const email = ref('')
const isSubscribed = ref(false)

const handleSubscribe = () => {
  if (!email.value || !email.value.includes('@')) return
  isSubscribed.value = true
  showToast('Welcome to Atelier Privé', 'Your 15% voucher code: ATELIER15', 'success')
}
</script>

<template>
  <section class="bg-stone-900 text-stone-100 py-20 border-t border-b border-stone-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <span class="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold">
        Atelier Privé • Membership
      </span>

      <h2 class="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
        Step Inside the Maison
      </h2>

      <p class="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-light leading-relaxed">
        Subscribe to receive private preview invitations, seasonal lookbook editions, and 15% off your first order using code <strong class="text-amber-300">ATELIER15</strong>.
      </p>

      <div v-if="!isSubscribed" class="pt-4 max-w-md mx-auto">
        <form class="flex flex-col sm:flex-row gap-2" @submit.prevent="handleSubscribe">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email address..."
            required
            class="flex-1 bg-stone-950/80 border border-stone-700 px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            class="px-8 py-3 bg-white text-stone-950 hover:bg-stone-200 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
          >
            Join Privé
          </button>
        </form>
        <p class="text-[10px] text-stone-500 uppercase tracking-widest mt-3">
          Respecting your privacy. Unsubscribe at any time.
        </p>
      </div>

      <div v-else class="p-6 bg-stone-950 border border-stone-800 max-w-md mx-auto space-y-2">
        <div class="text-amber-400 text-sm font-semibold">✦ Membership Confirmed</div>
        <p class="text-xs text-stone-300">Your welcome code <strong>ATELIER15</strong> has been copied to your bag!</p>
      </div>
    </div>
  </section>
</template>
