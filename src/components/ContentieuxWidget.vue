<template>
  <div class="card bg-white flex flex-col items-center">
    <h3 class="mb-2" :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20h10M6 6h12M9 6V4m6 2V4m-7 6h8a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z" /></svg>
      Contentieux
    </h3>
    <div class="text-4xl font-bold text-secondary">1</div>
    <div class="text-xs text-gray-500">dossier ouvert</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 