<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Test des Thèmes</h1>
    
    <!-- Indicateur de thème -->
    <div class="mb-6 p-4 rounded-lg" :class="themeStore.theme === 'classic' ? 'bg-green-100' : 'bg-blue-100'">
      <p class="font-bold">Thème actuel: <span class="text-primary">{{ themeStore.theme }}</span></p>
      <p class="text-sm text-gray-600">Attribut data-theme: {{ htmlDataTheme }}</p>
    </div>

    <!-- Boutons de test -->
    <div class="space-y-4">
      <button class="btn btn-primary" @click="themeStore.setTheme('classic')">
        Thème Classic
      </button>
      
      <button class="btn btn-secondary" @click="themeStore.setTheme('classicmodern')">
        Thème Classic Modern
      </button>
      
      <button class="btn btn-accent" @click="themeStore.toggleTheme">
        Basculer ({{ themeStore.theme === 'classic' ? '→ Modern' : '→ Classic' }})
      </button>
    </div>

    <!-- Éléments de test -->
    <div class="mt-8 space-y-4">
      <div class="card bg-primary text-primary-content p-4">
        <h3 class="text-xl font-bold">Carte Primary</h3>
        <p>Ceci devrait changer de couleur selon le thème</p>
      </div>
      
      <div class="card bg-secondary text-secondary-content p-4">
        <h3 class="text-xl font-bold">Carte Secondary</h3>
        <p>Ceci devrait changer de couleur selon le thème</p>
      </div>
      
      <div class="card bg-base-100 border p-4">
        <h3 class="text-xl font-bold text-primary">Carte Base</h3>
        <p class="text-base-content">Ceci devrait changer de couleur selon le thème</p>
      </div>
    </div>

    <!-- Debug info -->
    <div class="mt-8 p-4 bg-gray-100 rounded">
      <h4 class="font-bold mb-2">Debug Info:</h4>
      <pre class="text-xs">{{ debugInfo }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()

const htmlDataTheme = computed(() => document.documentElement.getAttribute('data-theme'))

const debugInfo = computed(() => ({
  theme: themeStore.theme,
  htmlDataTheme: htmlDataTheme.value,
  bodyDataTheme: document.body.getAttribute('data-theme'),
  localStorage: localStorage.getItem('theme')
}))
</script> 