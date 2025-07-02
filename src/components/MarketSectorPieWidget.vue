<template>
  <div class="card-graph bg-white compact fullwidth">
    <div class="flex items-center gap-2 mb-1">
      <span class="icon-circle bg-orange-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12a6 6 0 1112 0 6 6 0 01-12 0z" /></svg>
      </span>
      <div>
        <div class="graph-label">RÉPARTITION PAR SECTEUR</div>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-2 w-full">
      <div>
        <div class="flex justify-between text-xs text-gray-500 mb-0.5">
          <span>BTP</span>
          <span>{{ btp }}%</span>
        </div>
        <div class="w-full h-3 rounded bg-gray-100 overflow-hidden">
          <div class="h-full bg-yellow-300" :style="`width: ${btp}%`"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-xs text-gray-500 mb-0.5">
          <span>Services</span>
          <span>{{ services }}%</span>
        </div>
        <div class="w-full h-3 rounded bg-gray-100 overflow-hidden">
          <div class="h-full bg-indigo-300" :style="`width: ${services}%`"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-xs text-gray-500 mb-0.5">
          <span>Fournitures</span>
          <span>{{ fournitures }}%</span>
        </div>
        <div class="w-full h-3 rounded bg-gray-100 overflow-hidden">
          <div class="h-full bg-emerald-300" :style="`width: ${fournitures}%`"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const btp = 44
const services = 30
const fournitures = 26
</script>
<style scoped>
.card-graph.compact.fullwidth {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px 0 rgba(30,41,59,0.06);
  padding: 0.8rem 1rem 0.7rem 1rem;
  min-width: 0;
  width: 100%;
  max-width: none;
}
.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 2rem;
  height: 2rem;
}
.graph-label {
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 600;
  letter-spacing: 0.04em;
}
</style> 