<template>
  <div class="card bg-white w-full">
    <h3 :class="props.colorClass">
      <svg v-if="props.icon" :class="props.colorClass" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      Financements mensuels
    </h3>
    <Bar :data="chartData" :options="chartOptions" class="mt-2 w-full" style="max-width:100%;" />
  </div>
</template>
<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })

const chartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Financements (M FCFA)',
      data: [120, 180, 250, 400, 680, 550],
      backgroundColor: '#3b82f6',
      borderColor: '#1d4ed8',
      borderWidth: 1,
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
<style scoped>
.card-graph {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px 0 rgba(30,41,59,0.06);
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  min-width: 0;
}
.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 3.2rem;
  height: 3.2rem;
}
.graph-label {
  text-transform: uppercase;
  font-size: 0.95rem;
  color: #94a3b8;
  font-weight: 600;
  letter-spacing: 0.04em;
}
</style> 