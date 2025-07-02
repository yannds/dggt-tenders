<template>
  <div class="card bg-white flex flex-col items-center">
    <h3 class="mb-2" :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Réclamations
    </h3>
    <div class="text-4xl font-bold text-error">2</div>
    <div class="text-xs text-gray-500">en cours</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 