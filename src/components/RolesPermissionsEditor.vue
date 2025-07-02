<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <h2 class="text-2xl font-bold">Gestion des privilèges & rôles</h2>
      <div class="flex items-center gap-2">
        <label class="font-semibold text-gray-700">Sélectionner un rôle :</label>
        <select v-model="selectedRoleId" class="select select-sm rounded-2xl shadow bg-white/80 border-0">
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
      </div>
    </div>
    <!-- Barre de recherche et actions -->
    <fieldset class="p-4 mb-6 bg-blue-50/60 shadow-sm rounded-2xl border-0">
      <div class="flex flex-wrap gap-3 mt-0 items-center justify-center">
        <input v-model="search" type="text" placeholder="Rechercher un module ou une action" class="input input-xs w-44 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition placeholder-gray-400" />
        <button class="btn btn-xs btn-circle rounded-full shadow bg-white/80 border-0 text-blue-700 hover:bg-blue-100 transition" @click="resetSearch" title="Réinitialiser la recherche" :disabled="!search">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </fieldset>
    <div class="bg-white rounded-2xl shadow-lg p-2 w-full overflow-x-auto">
      <table class="table w-full user-datagrid">
        <thead>
          <tr>
            <th class="bg-blue-50">Action / Module</th>
            <th v-for="module in filteredModules" :key="module.id" class="bg-blue-50 text-center whitespace-nowrap">{{ module.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="action in filteredActions" :key="action.id" class="align-middle hover:bg-blue-50/40 transition">
            <td class="font-semibold text-gray-900">{{ action.name }}</td>
            <td v-for="module in filteredModules" :key="module.id" class="text-center">
              <input type="checkbox" class="checkbox checkbox-sm" :checked="permissions[action.id]?.[module.id]" @change="togglePermission(action.id, module.id, $event.target.checked)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Actions export, impression, pagination -->
    <fieldset class="p-4 mt-8 bg-gray-50/60 shadow-sm rounded-2xl border-0">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
        <div class="flex flex-row gap-2 ml-4 mt-2 md:mt-0">
          <span class="text-xs text-gray-500 flex items-center mr-2">Exporter vers / Imprimer&nbsp;:</span>
          <span @click="exportJSON" title="Exporter JSON" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M7 7c-2 2-2 6 0 8m10-8c2 2 2 6 0 8" stroke="#f59e42" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9v6m4-6v6" stroke="#f59e42" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <span @click="exportPDF" title="Exporter PDF" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" fill="#ef4444" opacity="0.15"/><rect x="5" y="4" width="14" height="16" rx="2" stroke="#ef4444" stroke-width="2"/><path d="M9 8h6M9 12h6M9 16h2" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/><text x="12" y="19" text-anchor="middle" font-size="6" fill="#ef4444" font-family="monospace">PDF</text></svg>
          </span>
          <span @click="printTable" title="Imprimer" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="6" y="9" width="12" height="8" rx="2" fill="#a3a3a3" opacity="0.15"/><rect x="6" y="9" width="12" height="8" rx="2" stroke="#6b7280" stroke-width="1.5"/><rect x="8" y="5" width="8" height="4" rx="1" fill="#e5e7eb" stroke="#6b7280" stroke-width="1.5"/><circle cx="12" cy="13" r="1" fill="#6b7280"/><path d="M9 17h6" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round"/></svg>
          </span>
        </div>
      </div>
    </fieldset>
    <!-- Bouton flottant Ajouter -->
    <button
      class="fixed bottom-8 right-8 z-50 btn btn-primary btn-circle shadow-lg flex items-center justify-center w-16 h-16 text-3xl"
      @click="showAddRole = true"
      title="Ajouter un rôle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <!-- Toast visuel -->
    <div v-if="toast" class="fixed bottom-8 right-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      <span>{{ toast }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'SPM' },
  { id: 3, name: 'CAF' },
  { id: 4, name: 'CMPR' },
  { id: 5, name: 'CT' },
  { id: 6, name: 'Finances' },
  { id: 7, name: 'Caisse' },
  { id: 8, name: 'DGCMP' },
  { id: 9, name: 'ARMP' },
  { id: 10, name: 'Soumissionnaire' },
  { id: 11, name: 'Public' },
])
const modules = ref([
  { id: 'dao', name: 'DAO' },
  { id: 'decomptes', name: 'Décomptes' },
  { id: 'suivi', name: 'Suivi' },
  { id: 'attribution', name: 'Attribution' },
  { id: 'paiements', name: 'Paiements' },
  { id: 'observatoire', name: 'Observatoire' },
  { id: 'utilisateurs', name: 'Utilisateurs' },
  { id: 'ano', name: 'ANO' },
  { id: 'armp', name: 'ARMP' },
  { id: 'contentieux', name: 'Contentieux' },
])
const actions = ref([
  { id: 'consulter', name: 'Consulter' },
  { id: 'creer', name: 'Créer' },
  { id: 'modifier', name: 'Modifier' },
  { id: 'supprimer', name: 'Supprimer' },
  { id: 'valider', name: 'Valider' },
  { id: 'publier', name: 'Publier' },
  { id: 'soumettre', name: 'Soumettre' },
  { id: 'attacher', name: 'Attacher' },
  { id: 'voir_attachements', name: 'Voir Attachements' },
  { id: 'stats', name: 'Observatoire Stats' },
])
const selectedRoleId = ref(roles.value[0].id)
const selectedRoleName = computed(() => roles.value.find(r => r.id === selectedRoleId.value)?.name || '')

const defaultPermissions: Record<number, Record<string, Record<string, boolean>>> = {
  1: Object.fromEntries(actions.value.map(a => [a.id, Object.fromEntries(modules.value.map(m => [m.id, true]))])), // Admin : tout à true
  2: { // SPM = CMPR
    consulter: { dao: true, decomptes: true, suivi: true, attribution: true, observatoire: true, ano: true },
    creer: { dao: true },
    publier: { dao: true },
    attacher: { dao: true },
    valider: { dao: true },
    // autres droits à false
  },
  3: { // CAF
    consulter: { dao: true, decomptes: true, facture: true, finances: true },
    creer: { decomptes: true, facture: true, finances: true },
    // autres droits à false
  },
  4: { // CMPR
    consulter: { dao: true, decomptes: true, suivi: true, attribution: true, observatoire: true, ano: true },
    creer: { dao: true },
    publier: { dao: true },
    attacher: { dao: true },
    valider: { dao: true },
    // autres droits à false
  },
  5: { // CT
    consulter: { dao: true, attachements: true, decomptes: true },
    attacher: { attachements: true },
    // autres droits à false
  },
  6: { // Finances
    consulter: { dao: true, decomptes: true, facture: true, finances: true },
    creer: { decomptes: true, facture: true, finances: true },
    // autres droits à false
  },
  7: { // Caisse
    consulter: { dao: true },
    // autres droits à false
  },
  8: { // DGCMP
    consulter: { dao: true, dgcpm: true },
    // autres droits à false
  },
  9: { // ARMP
    consulter: { dao: true, armp: true },
    // autres droits à false
  },
  10: { // Soumissionnaire
    consulter: {
      dao: true,
      decomptes: true,
      paiements: true,
      observatoire: true,
      ano: true,
      armp: true,
      contentieux: true,
    },
    modifier: {
      paiements: true
    },
    stats: {
      dao: true,
      observatoire: true
    },
    // Créer, Supprimer : tout à false
  },
  11: { // Public
    consulter: { dao: true, utilisateurs: true, observatoire: true },
    // autres droits à false
  },
}

const permissions = ref<Record<string, Record<string, boolean>>>({})
const toast = ref('')
const search = ref('')
const showAddRole = ref(false)

function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, 2000)
}

function loadPermissions(roleId: number) {
  if (defaultPermissions[roleId]) {
    // Deep clone pour éviter la mutation
    const p: Record<string, Record<string, boolean>> = {}
    for (const action of actions.value) {
      p[action.id] = {}
      for (const module of modules.value) {
        // Tous les profils peuvent consulter les DAO
        if (action.id === 'consulter' && module.id === 'dao') {
          p[action.id][module.id] = true
        } else {
          p[action.id][module.id] = !!defaultPermissions[roleId][action.id]?.[module.id]
        }
      }
    }
    permissions.value = p
  } else {
    // fallback tout à false sauf consulter DAO
    const p: Record<string, Record<string, boolean>> = {}
    for (const action of actions.value) {
      p[action.id] = {}
      for (const module of modules.value) {
        p[action.id][module.id] = (action.id === 'consulter' && module.id === 'dao')
      }
    }
    permissions.value = p
  }
}
watch(selectedRoleId, (id) => loadPermissions(id))
loadPermissions(selectedRoleId.value)

function togglePermission(actionId: string, moduleId: string, checked: boolean) {
  if (!permissions.value[actionId]) permissions.value[actionId] = {}
  permissions.value[actionId][moduleId] = checked
}
function resetPermissions() {
  loadPermissions(selectedRoleId.value)
  showToast('Droits réinitialisés !')
}
function exportJSON() {
  const blob = new Blob([JSON.stringify(permissions.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `droits_role_${selectedRoleId.value}.json`
  a.click()
  URL.revokeObjectURL(url)
  showToast('Export JSON effectué !')
}
function exportPDF() { window.print() }
function printTable() { window.print() }
function resetSearch() { search.value = '' }
const filteredModules = computed(() => modules.value.filter(m => m.name.toLowerCase().includes(search.value.toLowerCase())))
const filteredActions = computed(() => actions.value.filter(a => a.name.toLowerCase().includes(search.value.toLowerCase())))
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s cubic-bezier(.4,0,.2,1);
}
.table th, .table td { border: 1px solid #e5e7eb; }
.table th.sticky, .table td.sticky { position: sticky; left: 0; background: #fff; z-index: 2; }
</style> 