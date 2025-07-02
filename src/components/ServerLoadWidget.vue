<template>
  <div class="card bg-white">
    <h3 :class="colorClass">
      <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18" /></svg>
      Charge CPU
    </h3>
    <Line :data="chartData" :options="chartOptions" class="mt-2" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
import { Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartData = {
  labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
  datasets: [
    {
      label: 'CPU %',
      data: [30, 45, 50, 40, 60, 55],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { min: 0, max: 100 } }
}
</script> 