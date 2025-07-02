<template>
  <div class="card bg-white w-full">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
      Statut DAO
    </h3>
    <Doughnut :data="chartData" :options="chartOptions" class="mt-2 w-full" style="max-width:100%;" />
  </div>
</template>
<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })

const chartData = {
  labels: ['Publiés', 'En cours', 'Clôturés'],
  datasets: [
    {
      data: [45, 30, 25],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0,
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
}
</script> 