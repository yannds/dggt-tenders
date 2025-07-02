<template>
  <div class="card bg-white">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      Charge serveur
    </h3>
    <div class="text-3xl font-bold text-blue-600">65%</div>
    <div class="text-sm text-gray-500">CPU moyen</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 