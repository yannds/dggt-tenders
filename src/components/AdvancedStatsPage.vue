<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 py-8 w-full">
    <div class="w-full max-w-7xl mx-auto px-4">
      <div class="flex items-center gap-3 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m4 0h1a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2h1m4 0V7a4 4 0 10-8 0v5" /></svg>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Statistiques avancées</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <GlobalStatsWidget icon colorClass="text-sky-400" />
        <FinanceStatsWidget icon colorClass="text-violet-400" />
        <DaoStatusPieWidget icon colorClass="text-orange-400" />
        <MonthlyFinanceBarWidget icon colorClass="text-lime-400" />
        <MarketSectorPieWidget />
        <AvisProgressWidget icon colorClass="text-green-400" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ServerStatusWidget icon colorClass="text-cyan-400" />
        <ServerLoadWidget icon colorClass="text-blue-400" />
        <ServerMemoryWidget icon colorClass="text-fuchsia-400" />
        <ValidationsWidget icon colorClass="text-emerald-400" />
        <ReclamationsWidget icon colorClass="text-red-400" />
        <ContentieuxWidget icon colorClass="text-indigo-400" />
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow p-6 mt-8">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Tableau détaillé</h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Secteur</th>
                <th>DAO</th>
                <th>Montant total</th>
                <th>Statut</th>
                <th>Dernière mise à jour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BTP</td>
                <td>12</td>
                <td>4,2 Mds XAF</td>
                <td><span class="badge badge-success">Attribué</span></td>
                <td>2024-06-01</td>
              </tr>
              <tr>
                <td>Services</td>
                <td>8</td>
                <td>1,7 Mds XAF</td>
                <td><span class="badge badge-warning">En cours</span></td>
                <td>2024-05-28</td>
              </tr>
              <tr>
                <td>Fournitures</td>
                <td>7</td>
                <td>1,1 Mds XAF</td>
                <td><span class="badge badge-info">Publié</span></td>
                <td>2024-05-30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import GlobalStatsWidget from './GlobalStatsWidget.vue'
import FinanceStatsWidget from './FinanceStatsWidget.vue'
import DaoStatusPieWidget from './DaoStatusPieWidget.vue'
import MonthlyFinanceBarWidget from './MonthlyFinanceBarWidget.vue'
import MarketSectorPieWidget from './MarketSectorPieWidget.vue'
import AvisProgressWidget from './AvisProgressWidget.vue'
import ServerStatusWidget from './ServerStatusWidget.vue'
import ServerLoadWidget from './ServerLoadWidget.vue'
import ServerMemoryWidget from './ServerMemoryWidget.vue'
import ValidationsWidget from './ValidationsWidget.vue'
import ReclamationsWidget from './ReclamationsWidget.vue'
import ContentieuxWidget from './ContentieuxWidget.vue'
</script>
<script lang="ts">
export default {}
</script> 