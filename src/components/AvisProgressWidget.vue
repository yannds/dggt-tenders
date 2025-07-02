<template>
  <div class="card bg-white w-full">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17l6-6 4 4 8-8" /></svg>
      % Nouveaux avis
    </h3>
    <Line :data="chartData" :options="chartOptions" class="mt-2 w-full" style="max-width:100%;" />
  </div>
</template>
<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })

const chartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: '% Nouveaux avis',
      data: [12, 18, 25, 40, 68, 55],
      borderColor: '#34d399',
      backgroundColor: 'rgba(52,211,153,0.15)',
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 10 } } },
    y: { grid: { display: false }, beginAtZero: true, ticks: { font: { size: 10 } } },
  },
}
</script> 