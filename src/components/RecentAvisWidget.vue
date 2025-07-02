<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" /></svg>
      Avis récents
    </h3>
    <ul class="mt-2">
      <li v-for="avis in recentAvis" :key="avis.id" class="mb-1">
        <span class="font-semibold">{{ avis.titre }}</span>
        <span class="text-xs text-gray-500 ml-2">{{ avis.date }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
const recentAvis = [
  { id: 1, titre: 'DAO 2024-01 publié', date: '2024-06-01' },
  { id: 2, titre: 'DAO 2024-02 publié', date: '2024-06-02' },
  { id: 3, titre: 'DAO 2024-03 publié', date: '2024-06-03' },
]
</script> 