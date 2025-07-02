<template>
  <div class="card-graph bg-white">
    <div class="flex items-center gap-3 mb-2">
      <span class="icon-circle bg-lime-100">
        <svg v-if="icon" :class="colorClass" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18" /></svg>
      </span>
      <div>
        <div class="graph-label">PAIEMENTS VALIDÉS PAR MOIS</div>
      </div>
    </div>
    <Bar :data="chartData" :options="chartOptions" class="mt-2" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ icon: Boolean, colorClass: { type: String, default: '' } })
import { Bar } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Montant (M XAF)',
      data: [2, 3, 4, 6, 5, 7],
      backgroundColor: '#a3e635',
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
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