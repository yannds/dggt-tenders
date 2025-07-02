<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3m-3 3v4m0-10V4m8 8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
      Convertisseur de devises → XAF
    </h3>
    <form @submit.prevent class="mt-2">
      <div class="flex gap-2 mb-2">
        <select v-model="from" class="select select-bordered select-sm">
          <option v-for="(rate, code) in rates" :key="code" :value="code">{{ code }}</option>
        </select>
        <input v-model.number="amount" type="number" min="0" class="input input-bordered input-sm w-24" placeholder="Montant" />
        <span class="self-center">→</span>
        <span class="font-bold self-center">XAF</span>
      </div>
      <div v-if="amount && from" class="text-success font-bold text-lg">
        {{ result.toLocaleString() }} XAF
      </div>
    </form>
    <div class="mt-2 text-xs text-gray-400">Taux fictifs pour démo</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
import { ref, computed } from 'vue'
const rates = {
  EUR: 655.957,
  USD: 610.0,
  CNY: 84.5,
  RUB: 6.7,
  MAD: 65.0,
} as const

type Currency = keyof typeof rates
const from = ref<Currency>('EUR')
const amount = ref(100)
const result = computed(() => amount.value * rates[from.value])
</script> 