<template>
  <div class="card bg-white">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
      Mémoire serveur
    </h3>
    <div class="text-3xl font-bold text-green-600">78%</div>
    <div class="text-sm text-gray-500">RAM utilisée</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 