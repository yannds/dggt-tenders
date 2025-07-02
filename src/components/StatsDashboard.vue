<template>
  <div class="min-h-screen bg-white py-8 w-full">
    <div class="w-full px-0">
      <div class="flex flex-col items-center mb-10">
        <div class="flex items-center gap-3 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 0h1a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2h1m4 0V7a4 4 0 10-8 0v5" /></svg>
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard DGGT</h1>
        </div>
        <p class="text-lg text-gray-500">Vue d'ensemble institutionnelle</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link to="/stats-avancees?focus=global" class="card-link">
          <GlobalStatsWidget icon colorClass="text-sky-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=avis" class="card-link">
          <RecentAvisWidget icon colorClass="text-rose-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=secteurs" class="card-link">
          <MarketSectorPieWidget />
        </router-link>
        <router-link to="/stats-avancees?focus=avis-pending" class="card-link">
          <PendingAvisWidget icon colorClass="text-amber-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=avis-progress" class="card-link">
          <AvisProgressWidget icon colorClass="text-green-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=finances" class="card-link">
          <FinanceStatsWidget icon colorClass="text-violet-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=reclamations" class="card-link">
          <ReclamationsWidget icon colorClass="text-red-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=validations" class="card-link">
          <ValidationsWidget icon colorClass="text-emerald-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=contentieux" class="card-link">
          <ContentieuxWidget icon colorClass="text-indigo-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=serveur" class="card-link">
          <ServerStatusWidget icon colorClass="text-cyan-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=server-load" class="card-link">
          <ServerLoadWidget icon colorClass="text-blue-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=server-memory" class="card-link">
          <ServerMemoryWidget icon colorClass="text-fuchsia-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=dao-stats" class="card-link">
          <DaoStatusPieWidget icon colorClass="text-orange-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=finances-mensuelles" class="card-link">
          <MonthlyFinanceBarWidget icon colorClass="text-lime-400" />
        </router-link>
        <router-link to="/stats-avancees?focus=convertisseur" class="card-link">
          <CurrencyConverterWidget icon colorClass="text-teal-400" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalStatsWidget from './GlobalStatsWidget.vue'
import RecentAvisWidget from './RecentAvisWidget.vue'
import PendingAvisWidget from './PendingAvisWidget.vue'
import AvisProgressWidget from './AvisProgressWidget.vue'
import FinanceStatsWidget from './FinanceStatsWidget.vue'
import ReclamationsWidget from './ReclamationsWidget.vue'
import ValidationsWidget from './ValidationsWidget.vue'
import ContentieuxWidget from './ContentieuxWidget.vue'
import ServerStatusWidget from './ServerStatusWidget.vue'
import ServerLoadWidget from './ServerLoadWidget.vue'
import ServerMemoryWidget from './ServerMemoryWidget.vue'
import DaoStatusPieWidget from './DaoStatusPieWidget.vue'
import MonthlyFinanceBarWidget from './MonthlyFinanceBarWidget.vue'
import CurrencyConverterWidget from './CurrencyConverterWidget.vue'
import MarketSectorPieWidget from './MarketSectorPieWidget.vue'
</script>

<style scoped>
.card-link {
  display: block;
  border-radius: 1.25rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px 0 rgba(30,41,59,0.06);
  background: #fff;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s, border-color 0.18s;
  cursor: pointer;
}
.card-link:hover {
  background: #fff;
  box-shadow: 0 6px 24px 0 rgba(59,130,246,0.10);
  border-color: #b6cdfa;
  transform: translateY(-4px) scale(1.015);
}
.card h3 svg {
  height: 3rem;
  width: 3rem;
  min-width: 3rem;
}
.card h3 {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
}
</style>