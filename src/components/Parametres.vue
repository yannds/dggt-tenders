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
            <button class="btn btn-sm btn-outline btn-primary w-full justify-start" @click="exportSettings('csv')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter en CSV
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

    <!-- Section Langue & Régionalisation -->
    <fieldset class="p-6 mb-6 bg-indigo-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-indigo-700 px-2">Langue & Régionalisation</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Interface</h4>
          <div class="space-y-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Langue de l'interface</span>
              </label>
              <select v-model="settings.language" class="select select-sm w-full max-w-xs">
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Fuseau horaire</span>
              </label>
              <select v-model="settings.timezone" class="select select-sm w-full max-w-xs">
                <option value="Africa/Douala">Douala (GMT+1)</option>
                <option value="Europe/Paris">Paris (GMT+1/+2)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">New York (GMT-5/-4)</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Format de date</span>
              </label>
              <select v-model="settings.dateFormat" class="select select-sm w-full max-w-xs">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              </select>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Régionalisation</h4>
          <div class="space-y-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Devise</span>
              </label>
              <select v-model="settings.currency" class="select select-sm w-full max-w-xs">
                <option value="XAF">Franc CFA (XAF)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar US (USD)</option>
                <option value="GBP">Livre Sterling (GBP)</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Format des nombres</span>
              </label>
              <select v-model="settings.numberFormat" class="select select-sm w-full max-w-xs">
                <option value="1,234.56">1,234.56 (US)</option>
                <option value="1 234,56">1 234,56 (FR)</option>
                <option value="1.234,56">1.234,56 (DE)</option>
                <option value="1,234.56">1,234.56 (UK)</option>
              </select>
            </div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.autoDetectLocale" class="checkbox checkbox-info" />
              <span class="text-sm">Détection automatique de la langue</span>
            </label>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Intégrations -->
    <fieldset class="p-6 mb-6 bg-teal-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-teal-700 px-2">Intégrations & API</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Services externes</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.emailService" class="checkbox checkbox-success" />
              <span class="text-sm">Service d'email SMTP</span>
            </label>
            <div class="form-control" v-if="settings.emailService">
              <label class="label">
                <span class="label-text text-sm">Serveur SMTP</span>
              </label>
              <input type="text" v-model="settings.smtpServer" class="input input-sm w-full max-w-xs" placeholder="smtp.gmail.com" />
            </div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.smsService" class="checkbox checkbox-success" />
              <span class="text-sm">Service SMS</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.pushNotifications" class="checkbox checkbox-success" />
              <span class="text-sm">Notifications push</span>
            </label>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">API & Webhooks</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.apiEnabled" class="checkbox checkbox-info" />
              <span class="text-sm">API REST activée</span>
            </label>
            <div class="form-control" v-if="settings.apiEnabled">
              <label class="label">
                <span class="label-text text-sm">Clé API</span>
              </label>
              <input type="text" v-model="settings.apiKey" class="input input-sm w-full max-w-xs" readonly />
              <button class="btn btn-xs btn-outline mt-1" @click="generateApiKey">Générer</button>
            </div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.webhooksEnabled" class="checkbox checkbox-info" />
              <span class="text-sm">Webhooks activés</span>
            </label>
            <div class="form-control" v-if="settings.webhooksEnabled">
              <label class="label">
                <span class="label-text text-sm">URL Webhook</span>
              </label>
              <input type="url" v-model="settings.webhookUrl" class="input input-sm w-full max-w-xs" placeholder="https://..." />
            </div>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Maintenance -->
    <fieldset class="p-6 mb-6 bg-red-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-red-700 px-2">Maintenance & Système</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Maintenance</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.maintenanceMode" class="checkbox checkbox-error" />
              <span class="text-sm">Mode maintenance</span>
            </label>
            <div class="form-control" v-if="settings.maintenanceMode">
              <label class="label">
                <span class="label-text text-sm">Message de maintenance</span>
              </label>
              <textarea v-model="settings.maintenanceMessage" class="textarea textarea-sm w-full max-w-xs" rows="3" placeholder="Système en maintenance..."></textarea>
            </div>
            <button class="btn btn-sm btn-outline btn-error" @click="clearAllData">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Vider toutes les données
            </button>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Système</h4>
          <div class="space-y-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Version du système</span>
              </label>
              <input type="text" value="1.0.0" class="input input-sm w-full max-w-xs" readonly />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Dernière mise à jour</span>
              </label>
              <input type="text" :value="lastUpdateDate" class="input input-sm w-full max-w-xs" readonly />
            </div>
            <button class="btn btn-sm btn-outline btn-warning" @click="checkForUpdates">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Vérifier les mises à jour
            </button>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Statistiques avancées -->
    <fieldset class="p-6 mb-6 bg-yellow-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-yellow-700 px-2">Statistiques & Analytics</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Suivi d'utilisation</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.usageTracking" class="checkbox checkbox-warning" />
              <span class="text-sm">Suivi d'utilisation</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.errorTracking" class="checkbox checkbox-warning" />
              <span class="text-sm">Suivi des erreurs</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.performanceMonitoring" class="checkbox checkbox-warning" />
              <span class="text-sm">Monitoring des performances</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Niveau de détail</span>
              </label>
              <select v-model="settings.trackingLevel" class="select select-sm w-full max-w-xs">
                <option value="minimal">Minimal</option>
                <option value="standard">Standard</option>
                <option value="detailed">Détaillé</option>
              </select>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Rapports</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.weeklyReports" class="checkbox checkbox-warning" />
              <span class="text-sm">Rapports hebdomadaires</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.monthlyReports" class="checkbox checkbox-warning" />
              <span class="text-sm">Rapports mensuels</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.quarterlyReports" class="checkbox checkbox-warning" />
              <span class="text-sm">Rapports trimestriels</span>
            </label>
            <button class="btn btn-sm btn-outline btn-warning" @click="generateReport">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Générer un rapport
            </button>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Section Paramètres avancés -->
    <fieldset class="p-6 mb-6 bg-gray-50/60 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-gray-700 px-2">Paramètres avancés</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Développement</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.debugMode" class="checkbox checkbox-neutral" />
              <span class="text-sm">Mode debug</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.developerTools" class="checkbox checkbox-neutral" />
              <span class="text-sm">Outils développeur</span>
            </label>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-sm">Niveau de log</span>
              </label>
              <select v-model="settings.logLevel" class="select select-sm w-full max-w-xs">
                <option value="error">Erreur uniquement</option>
                <option value="warn">Avertissements</option>
                <option value="info">Informations</option>
                <option value="debug">Debug complet</option>
              </select>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Expérimental</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.betaFeatures" class="checkbox checkbox-neutral" />
              <span class="text-sm">Fonctionnalités bêta</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.experimentalUI" class="checkbox checkbox-neutral" />
              <span class="text-sm">Interface expérimentale</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="settings.autoUpdate" class="checkbox checkbox-neutral" />
              <span class="text-sm">Mises à jour automatiques</span>
            </label>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Résumé des paramètres -->
    <fieldset class="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm rounded-2xl border-0">
      <legend class="text-lg font-semibold text-blue-700 px-2">Résumé des paramètres</legend>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div class="bg-white/60 p-4 rounded-xl">
          <h5 class="font-semibold text-gray-800 mb-2">Thème actuel</h5>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded-full" :class="themeStore.theme === 'classic' ? 'bg-green-500' : 'bg-blue-500'"></div>
            <span class="text-sm font-medium">{{ themeStore.theme === 'classic' ? 'Classique' : 'Classic Modern' }}</span>
          </div>
        </div>
        <div class="bg-white/60 p-4 rounded-xl">
          <h5 class="font-semibold text-gray-800 mb-2">Notifications</h5>
          <div class="text-sm text-gray-600">
            {{ settings.emailNotifications ? 'Email ✓' : 'Email ✗' }} | 
            {{ settings.systemNotifications ? 'Système ✓' : 'Système ✗' }}
          </div>
        </div>
        <div class="bg-white/60 p-4 rounded-xl">
          <h5 class="font-semibold text-gray-800 mb-2">Sécurité</h5>
          <div class="text-sm text-gray-600">
            {{ settings.twoFactorAuth ? '2FA ✓' : '2FA ✗' }} | 
            {{ settings.auditLogs ? 'Audit ✓' : 'Audit ✗' }}
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
  backupFrequency: 'weekly',

  // Langue & Régionalisation
  language: 'fr',
  timezone: 'Africa/Douala',
  dateFormat: 'DD/MM/YYYY',
  currency: 'XAF',
  numberFormat: '1,234.56',
  autoDetectLocale: true,

  // Intégrations
  emailService: false,
  smtpServer: '',
  smsService: false,
  pushNotifications: false,
  apiEnabled: false,
  apiKey: '',
  webhooksEnabled: false,
  webhookUrl: '',

  // Maintenance
  maintenanceMode: false,
  maintenanceMessage: '',

  // Statistiques avancées
  usageTracking: true,
  errorTracking: true,
  performanceMonitoring: true,
  trackingLevel: 'standard',
  weeklyReports: true,
  monthlyReports: true,
  quarterlyReports: true,
  debugMode: false,
  developerTools: false,
  logLevel: 'info',
  betaFeatures: false,
  experimentalUI: false,
  autoUpdate: false
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
      backupFrequency: 'weekly',
      language: 'fr',
      timezone: 'Africa/Douala',
      dateFormat: 'DD/MM/YYYY',
      currency: 'XAF',
      numberFormat: '1,234.56',
      autoDetectLocale: true,
      emailService: false,
      smtpServer: '',
      smsService: false,
      pushNotifications: false,
      apiEnabled: false,
      apiKey: '',
      webhooksEnabled: false,
      webhookUrl: '',
      maintenanceMode: false,
      maintenanceMessage: '',
      usageTracking: true,
      errorTracking: true,
      performanceMonitoring: true,
      trackingLevel: 'standard',
      weeklyReports: true,
      monthlyReports: true,
      quarterlyReports: true
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
  } else if (format === 'csv') {
    content = 'emailNotifications,emailReports,emailAlerts,systemNotifications,soundNotifications,desktopNotifications,twoFactorAuth,sessionTimeout,sessionDuration,auditLogs,loginLogs,logRetention,itemsPerPage,autoRefresh,refreshInterval,enableCache,cacheDuration,autoBackup,backupFrequency,language,timezone,dateFormat,currency,numberFormat,autoDetectLocale,emailService,smtpServer,smsService,pushNotifications,apiEnabled,apiKey,webhooksEnabled,webhookUrl,maintenanceMode,maintenanceMessage,usageTracking,errorTracking,performanceMonitoring,trackingLevel,weeklyReports,monthlyReports,quarterlyReports\n'
    content += `${data.settings.emailNotifications},${data.settings.emailReports},${data.settings.emailAlerts},${data.settings.systemNotifications},${data.settings.soundNotifications},${data.settings.desktopNotifications},${data.settings.twoFactorAuth},${data.settings.sessionTimeout},${data.settings.sessionDuration},${data.settings.auditLogs},${data.settings.loginLogs},${data.settings.logRetention},${data.settings.itemsPerPage},${data.settings.autoRefresh},${data.settings.refreshInterval},${data.settings.enableCache},${data.settings.cacheDuration},${data.settings.autoBackup},${data.settings.backupFrequency},${data.settings.language},${data.settings.timezone},${data.settings.dateFormat},${data.settings.currency},${data.settings.numberFormat},${data.settings.autoDetectLocale},${data.settings.emailService},${data.settings.smtpServer},${data.settings.smsService},${data.settings.pushNotifications},${data.settings.apiEnabled},${data.settings.apiKey},${data.settings.webhooksEnabled},${data.settings.webhookUrl},${data.settings.maintenanceMode},${data.settings.maintenanceMessage},${data.settings.usageTracking},${data.settings.errorTracking},${data.settings.performanceMonitoring},${data.settings.trackingLevel},${data.settings.weeklyReports},${data.settings.monthlyReports},${data.settings.quarterlyReports}`
    filename = `parametres-${new Date().toISOString().split('T')[0]}.csv`
    mimeType = 'text/csv'
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

// Fonctions supplémentaires
function generateApiKey() {
  const newKey = 'api_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
  settings.apiKey = newKey
  showToast('Nouvelle clé API générée !')
}

function clearAllData() {
  if (confirm('ATTENTION: Cette action supprimera définitivement toutes les données. Êtes-vous absolument sûr ?')) {
    if (confirm('Dernière confirmation: Toutes les données seront perdues. Continuer ?')) {
      localStorage.clear()
      showToast('Toutes les données ont été supprimées !')
      // Recharger la page pour appliquer les changements
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }
}

function checkForUpdates() {
  showToast('Vérification des mises à jour...')
  // Simuler une vérification
  setTimeout(() => {
    showToast('Aucune mise à jour disponible. Version actuelle: 1.0.0')
  }, 2000)
}

function generateReport() {
  showToast('Génération du rapport en cours...')
  // Simuler la génération d'un rapport
  setTimeout(() => {
    const reportData = {
      date: new Date().toISOString(),
      settings: settings,
      systemInfo: {
        version: '1.0.0',
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rapport-parametres-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    showToast('Rapport généré et téléchargé !')
  }, 1500)
}

// Date de dernière mise à jour
const lastUpdateDate = new Date().toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

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