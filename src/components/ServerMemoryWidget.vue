<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="12" x="2" y="6" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01" /></svg>
      Mémoire serveur
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
  labels: ['Utilisée', 'Libre'],
  datasets: [
    {
      data: [6, 2],
      backgroundColor: ['#f59e42', '#22d3ee'],
      borderWidth: 1,
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: true } },
}
</script> 