<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3m-3 3v4m0-10V4m8 8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
      Finances
    </h3>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <div class="text-center">
        <div class="text-2xl font-bold text-success">12M</div>
        <div class="text-xs">Paiements validés</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-warning">3M</div>
        <div class="text-xs">En attente</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-info">27</div>
        <div class="text-xs">Factures générées</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 