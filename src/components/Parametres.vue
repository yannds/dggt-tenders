<template>
  <div class="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8">
    <h2 class="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      Paramètres
    </h2>
    <div class="mb-8">
      <label class="block text-lg font-semibold mb-2">Thème de l'interface</label>
      <div class="flex gap-4">
        <button :class="themeStore.theme === 'classic' ? 'btn btn-primary' : 'btn btn-outline'" @click="themeStore.setTheme('classic')">
          Classique
        </button>
        <button :class="themeStore.theme === 'classicmodern' ? 'btn btn-primary' : 'btn btn-outline'" @click="themeStore.setTheme('classicmodern')">
          Classic Modern
        </button>
      </div>
      <div class="text-xs text-gray-500 mt-2">Le thème est appliqué instantanément et mémorisé pour vos prochaines connexions.</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()
</script> 