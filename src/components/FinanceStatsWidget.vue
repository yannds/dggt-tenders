<template>
  <div class="card bg-white">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3m-3 3v4m0-10V4m8 8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
      Statistiques financières
    </h3>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="text-center">
        <div class="text-2xl font-bold text-green-600">2.5M</div>
        <div class="text-xs text-gray-500">Budget total</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600">1.8M</div>
        <div class="text-xs text-gray-500">Dépensé</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
</script> 