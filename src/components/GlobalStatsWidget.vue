<template>
  <div class="stat-card flex flex-row gap-4 w-full overflow-hidden">
    <div class="flex flex-col items-center justify-center gap-4 py-2">
      <span class="icon-circle bg-sky-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m0 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v10z" /></svg>
      </span>
      <span class="icon-circle bg-pink-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </span>
      <span class="icon-circle bg-emerald-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </span>
    </div>
    <div class="flex flex-col justify-center gap-4 py-2 flex-1">
      <div class="flex flex-col">
        <div class="stat-label">DAO TOTAL</div>
        <div class="stat-value">{{ stats.totalDao }}</div>
      </div>
      <div class="flex flex-col">
        <div class="stat-label">RÉCLAMATIONS</div>
        <div class="stat-value">{{ stats.totalReclamations }}</div>
      </div>
      <div class="flex flex-col">
        <div class="stat-label">UTILISATEURS</div>
        <div class="stat-value">{{ stats.totalUtilisateurs }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStatsStore } from '../stores/statsStore'
const stats = useStatsStore()
</script>

<style scoped>
.stat-card {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px 0 rgba(30,41,59,0.06);
  padding: 1.1rem 0.8rem;
  display: flex;
  align-items: center;
  min-width: 0;
  overflow: hidden;
}
.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 2.2rem;
  height: 2.2rem;
}
.stat-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.stat-value {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
  margin-top: 0.05rem;
}
</style> 