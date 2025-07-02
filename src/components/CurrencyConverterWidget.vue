<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3m-3 3v4m0-10V4m8 8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
      Convertisseur de devises
    </h3>
    <div class="mt-4 space-y-4">
      <div class="flex gap-2">
        <select v-model="from" class="select select-bordered w-full">
          <option v-for="(_, code) in rates" :key="code" :value="code">{{ code }}</option>
        </select>
        <input v-model.number="amount" type="number" placeholder="Montant" class="input input-bordered w-full" />
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600">{{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })

const rates = {
  EUR: 655.957,
  USD: 610,
  CNY: 84.5,
  RUB: 6.7,
  MAD: 65
}

const from = ref('EUR')
const amount = ref(100)
const result = computed(() => {
  if (!amount.value || !from.value) return '0'
  return (amount.value * rates[from.value as keyof typeof rates]).toFixed(2)
})
</script> 