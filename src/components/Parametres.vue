<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <h2 class="text-2xl font-bold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Paramètres système</span>
      </h2>
    </div>

    <!-- Section Thème -->
    <fieldset class="p-6 mb-6 bg-primary/5 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-primary px-2">Apparence & Interface</legend>
      <div class="mt-4">
        <label class="block text-base font-medium mb-3">Thème de l'interface</label>
        <div class="flex gap-4">
          <button 
            :class="themeStore.theme === 'classic' ? 'btn btn-primary' : 'btn btn-outline'" 
            @click="themeStore.setTheme('classic')"
            class="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Classique
          </button>
          <button 
            :class="themeStore.theme === 'classicmodern' ? 'btn btn-primary' : 'btn btn-outline'" 
            @click="themeStore.setTheme('classicmodern')"
            class="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Classic Modern
          </button>
        </div>
        <div class="text-sm text-gray-500 mt-2">Le thème est appliqué instantanément et mémorisé pour vos prochaines connexions.</div>
      </div>
    </fieldset>

    <!-- Section Notifications -->
    <fieldset class="p-6 mb-6 bg-blue-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-blue-700 px-2">Notifications & Alertes</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Notifications par email</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.emailNotifications" class="checkbox checkbox-primary" />
              <span class="text-sm">Activer les notifications par email</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.emailReports" class="checkbox checkbox-primary" />
              <span class="text-sm">Rapports hebdomadaires</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.emailAlerts" class="checkbox checkbox-primary" />
              <span class="text-sm">Alertes de sécurité</span>
            </label>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Notifications système</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.systemNotifications" class="checkbox checkbox-primary" />
              <span class="text-sm">Notifications système</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.soundNotifications" class="checkbox checkbox-primary" />
              <span class="text-sm">Sons de notification</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.desktopNotifications" class="checkbox checkbox-primary" />
              <span class="text-sm">Notifications bureau</span>
            </label>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Sécurité -->
    <fieldset class="p-6 mb-6 bg-orange-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-orange-700 px-2">Sécurité & Authentification</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Authentification</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.twoFactorAuth" class="checkbox checkbox-warning" />
              <span class="text-sm">Authentification à deux facteurs</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.sessionTimeout" class="checkbox checkbox-warning" />
              <span class="text-sm">Déconnexion automatique</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Durée de session (minutes)</span>
              </label>
              <input 
                type="number" 
                v-model="settings.sessionDuration" 
                class="input input-sm w-full max-w-xs" 
                min="5" 
                max="480"
              />
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Audit & Logs</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.auditLogs" class="checkbox checkbox-warning" />
              <span class="text-sm">Journalisation des actions</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.loginLogs" class="checkbox checkbox-warning" />
              <span class="text-sm">Logs de connexion</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Rétention des logs (jours)</span>
              </label>
              <input 
                type="number" 
                v-model="settings.logRetention" 
                class="input input-sm w-full max-w-xs" 
                min="7" 
                max="365"
              />
            </div>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Performance -->
    <fieldset class="p-6 mb-6 bg-green-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-green-700 px-2">Performance & Optimisation</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Interface</h4>
          <div class="space-y-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Éléments par page</span>
              </label>
              <select v-model="settings.itemsPerPage" class="select select-sm w-full max-w-xs">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.autoRefresh" class="checkbox checkbox-success" />
              <span class="text-sm">Actualisation automatique</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Intervalle d'actualisation (secondes)</span>
              </label>
              <input 
                type="number" 
                v-model="settings.refreshInterval" 
                class="input input-sm w-full max-w-xs" 
                min="30" 
                max="300"
              />
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Cache & Données</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.enableCache" class="checkbox checkbox-success" />
              <span class="text-sm">Activer le cache</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Durée du cache (minutes)</span>
              </label>
              <input 
                type="number" 
                v-model="settings.cacheDuration" 
                class="input input-sm w-full max-w-xs" 
                min="5" 
                max="60"
              />
            </div>
            <button class="btn btn-sm btn-outline btn-success" @click="clearCache">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Vider le cache
            </button>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Export/Import -->
    <fieldset class="p-6 mb-6 bg-purple-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-purple-700 px-2">Données & Sauvegarde</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Export des données</h4>
          <div class="space-y-2">
            <button class="btn btn-sm btn-outline btn-primary w-full justify-start" @click="exportSettings('json')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter en JSON
            </button>
            <button class="btn btn-sm btn-outline btn-primary w-full justify-start" @click="exportSettings('xml')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter en XML
            </button>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Sauvegarde automatique</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.autoBackup" class="checkbox checkbox-secondary" />
              <span class="text-sm">Sauvegarde automatique</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Fréquence de sauvegarde</span>
              </label>
              <select v-model="settings.backupFrequency" class="select select-sm w-full max-w-xs">
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </select>
            </div>
            <button class="btn btn-sm btn-outline btn-secondary" @click="createBackup">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Créer une sauvegarde
            </button>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Boutons d'action -->
    <div class="flex flex-col sm:flex-row gap-4 justify-end">
      <button class="btn btn-outline" @click="resetToDefaults">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Réinitialiser
      </button>
      <button class="btn btn-primary" @click="saveSettings">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Enregistrer
      </button>
    </div>

    <!-- Toast de confirmation -->
    <div v-if="toastMessage" class="fixed bottom-8 right-8 z-[9999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()
const toastMessage = ref('')

// Paramètres réactifs
const settings = reactive({
  // Notifications
  emailNotifications: true,
  emailReports: false,
  emailAlerts: true,
  systemNotifications: true,
  soundNotifications: false,
  desktopNotifications: false,
  
  // Sécurité
  twoFactorAuth: false,
  sessionTimeout: true,
  sessionDuration: 30,
  auditLogs: true,
  loginLogs: true,
  logRetention: 90,
  
  // Performance
  itemsPerPage: 20,
  autoRefresh: true,
  refreshInterval: 60,
  enableCache: true,
  cacheDuration: 15,
  
  // Sauvegarde
  autoBackup: true,
  backupFrequency: 'weekly'
})

// Fonctions
function saveSettings() {
  // Simuler la sauvegarde
  localStorage.setItem('appSettings', JSON.stringify(settings))
  showToast('Paramètres enregistrés avec succès !')
}

function resetToDefaults() {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
    Object.assign(settings, {
      emailNotifications: true,
      emailReports: false,
      emailAlerts: true,
      systemNotifications: true,
      soundNotifications: false,
      desktopNotifications: false,
      twoFactorAuth: false,
      sessionTimeout: true,
      sessionDuration: 30,
      auditLogs: true,
      loginLogs: true,
      logRetention: 90,
      itemsPerPage: 20,
      autoRefresh: true,
      refreshInterval: 60,
      enableCache: true,
      cacheDuration: 15,
      autoBackup: true,
      backupFrequency: 'weekly'
    })
    showToast('Paramètres réinitialisés !')
  }
}

function clearCache() {
  if (confirm('Vider le cache ?')) {
    // Simuler le vidage du cache
    showToast('Cache vidé avec succès !')
  }
}

function createBackup() {
  // Simuler la création d'une sauvegarde
  showToast('Sauvegarde créée avec succès !')
}

function exportSettings(format: string) {
  const data = {
    settings,
    theme: themeStore.theme,
    exportDate: new Date().toISOString()
  }
  
  let content = ''
  let filename = ''
  let mimeType = ''
  
  if (format === 'json') {
    content = JSON.stringify(data, null, 2)
    filename = `parametres-${new Date().toISOString().split('T')[0]}.json`
    mimeType = 'application/json'
  } else if (format === 'xml') {
    content = `<?xml version="1.0" encoding="UTF-8"?>
<parametres>
  <theme>${data.theme}</theme>
  <exportDate>${data.exportDate}</exportDate>
  <settings>
    <emailNotifications>${data.settings.emailNotifications}</emailNotifications>
    <sessionDuration>${data.settings.sessionDuration}</sessionDuration>
    <itemsPerPage>${data.settings.itemsPerPage}</itemsPerPage>
  </settings>
</parametres>`
    filename = `parametres-${new Date().toISOString().split('T')[0]}.xml`
    mimeType = 'application/xml'
  }
  
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  showToast(`Paramètres exportés en ${format.toUpperCase()} !`)
}

function showToast(message: string) {
  toastMessage.value = message
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

// Charger les paramètres au montage
const savedSettings = localStorage.getItem('appSettings')
if (savedSettings) {
  try {
    const parsed = JSON.parse(savedSettings)
    Object.assign(settings, parsed)
  } catch (e) {
    console.error('Erreur lors du chargement des paramètres:', e)
  }
}
</script> 