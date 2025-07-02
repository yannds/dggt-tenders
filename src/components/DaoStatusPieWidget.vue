<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
      DAO par statut
    </h3>
    <Doughnut :data="chartData" :options="chartOptions" class="mt-2" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
import { Doughnut } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartData = {
  labels: ['Brouillon', 'Publié', 'Clos', 'Attribué', 'Annulé'],
  datasets: [
    {
      data: [4, 12, 7, 3, 1],
      backgroundColor: ['#fbbf24', '#22c55e', '#3b82f6', '#a21caf', '#ef4444'],
      borderWidth: 1,
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: true } },
}
</script> 