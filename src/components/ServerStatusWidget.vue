<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v16H4V4zm4 8h8" /></svg>
      État du serveur
    </h3>
    <div class="flex items-center gap-2 mt-2">
      <span class="badge badge-success">En ligne</span>
      <span class="text-xs text-gray-500">Uptime: 12j 4h</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 