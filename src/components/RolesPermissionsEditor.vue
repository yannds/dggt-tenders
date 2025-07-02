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
            <th class="bg-blue-50 px-6 min-w-[160px]">Action / Module</th>
            <th v-for="module in filteredModules" :key="module.id" class="bg-blue-50 text-center whitespace-nowrap px-6 min-w-[120px]">{{ module.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="action in filteredActions" :key="action.id" class="align-middle hover:bg-blue-50/40 transition">
            <td class="font-semibold text-gray-900 px-6">{{ action.name }}</td>
            <td v-for="module in filteredModules" :key="module.id" class="text-center px-6">
              <input type="checkbox" class="checkbox checkbox-sm" :checked="permissions[action.id]?.[module.id]" @change="togglePermission(action.id, module.id, ($event.target as HTMLInputElement)?.checked)" />
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
      @click="openAddRoleModal"
      title="Ajouter un rôle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <!-- Modale création rôle -->
    <div v-if="showAddRole" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 relative">
        <button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost" @click="showAddRole = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h3 class="text-xl font-bold mb-4 text-blue-700">{{ isEditMode ? 'Modifier le rôle' : 'Créer un nouveau rôle' }}</h3>
        <form @submit.prevent="addRole">
          <div class="mb-4">
            <label class="label font-bold text-black">Nom du rôle</label>
            <input v-model="newRole.name" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div class="mb-4">
            <label class="label font-bold text-black">Description</label>
            <input v-model="newRole.description" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" />
          </div>
          <div class="mb-4">
            <label class="label font-bold text-black">Permissions</label>
            <div class="overflow-x-auto rounded-xl border border-blue-100 bg-blue-50/30 p-2">
              <table class="table w-full text-xs">
                <thead>
                  <tr>
                    <th class="bg-blue-50 px-2 min-w-[100px]">Action / Module</th>
                    <th v-for="module in modules" :key="module.id" class="bg-blue-50 text-center px-2 min-w-[80px]">{{ module.name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="action in actions" :key="action.id">
                    <td class="font-semibold text-gray-900 px-2">{{ action.name }}</td>
                    <td v-for="module in modules" :key="module.id" class="text-center px-2">
                      <input type="checkbox" class="checkbox checkbox-xs" v-model="newRole.permissions[action.id][module.id]" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button type="submit" class="btn btn-primary btn-sm">{{ isEditMode ? 'Enregistrer' : 'Créer' }}</button>
            <button type="button" class="btn btn-ghost btn-sm" @click="showAddRole = false">Annuler</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Toast visuel -->
    <div v-if="toast" class="fixed bottom-8 right-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      <span>{{ toast }}</span>
    </div>
    <!-- Tableau des rôles existants -->
    <div class="bg-white rounded-2xl shadow-lg p-2 w-full overflow-x-auto mt-8">
      <h3 class="text-lg font-bold mb-4 text-blue-700">Liste des rôles</h3>
      <table class="table w-full user-datagrid">
        <thead>
          <tr>
            <th class="bg-blue-50 px-6 min-w-[160px]">Nom</th>
            <th class="bg-blue-50 px-6 min-w-[160px]">Description</th>
            <th class="bg-blue-50 px-6 min-w-[240px]">Droits</th>
            <th class="bg-blue-50 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles as any[]" :key="role.id" class="align-middle hover:bg-blue-50/40 transition cursor-pointer" @click="editRole(role)">
            <td class="font-bold text-blue-700 px-6">{{ role.name }}</td>
            <td class="text-sm text-gray-700 px-6">{{ role.description }}</td>
            <td class="text-xs text-gray-600 max-w-xs whitespace-nowrap px-6">
              <template v-if="getRoleRightsBadges(role.id).length">
                <span v-for="(badge, i) in getRoleRightsBadges(role.id).slice(0, 3)" :key="badge.text" :class="'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ' + badge.class + ' mr-1'">
                  <span v-if="badge.icon">{{ badge.icon }}</span> {{ badge.text }}
                </span>
                <span v-if="getRoleRightsBadges(role.id).length > 3" class="badge badge-ghost text-xs font-medium align-middle cursor-pointer" :title="getRoleRightsTooltip(role.id)">
                  +{{ getRoleRightsBadges(role.id).length - 3 }}
                </span>
              </template>
              <span v-else>-</span>
            </td>
            <td class="flex gap-2 justify-center items-center px-6" @click.stop>
              <button class="btn btn-xs btn-circle bg-white/80 border-0 shadow hover:bg-blue-100" @click.stop="deleteRole(role)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modale voir/modifier rôle -->
    <div v-if="modalRole" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 relative">
        <button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost" @click="modalRole = null">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h3 class="text-xl font-bold mb-4 text-blue-700">Détail du rôle : {{ modalRole.name }}</h3>
        <div class="mb-2"><b>Description :</b> {{ modalRole.description }}</div>
        <div class="mb-2"><b>Droits :</b>
          <ul class="list-disc ml-6 text-xs">
            <li v-for="(mods, act) in defaultPermissions[modalRole.id]" :key="act">
              <span class="font-semibold">{{ act }}</span> :
              <span v-for="(v, mod) in mods" :key="mod">
                <span v-if="v">{{ modules.find((m: any) => m.id === mod)?.name || mod }}, </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
type Role = { id: number; name: string; description: string }
let roles: Role[] = [
  { id: 1, name: 'Admin', description: '' },
  { id: 2, name: 'SPM', description: '' },
  { id: 3, name: 'CAF', description: '' },
  { id: 4, name: 'CMPR', description: '' },
  { id: 5, name: 'CT', description: '' },
  { id: 6, name: 'Finances', description: '' },
  { id: 7, name: 'Caisse', description: '' },
  { id: 8, name: 'DGCMP', description: '' },
  { id: 9, name: 'ARMP', description: '' },
  { id: 10, name: 'Soumissionnaire', description: '' },
  { id: 11, name: 'Public', description: '' },
  { id: 12, name: 'Auditeur', description: "Accès aux logs d'audit (ISO 27001)" },
]
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
  { id: 'audit', name: 'Audit' },
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
const selectedRoleId = ref(roles[0].id)
const selectedRoleName = computed(() => roles.find(r => r.id === selectedRoleId.value)?.name || '')

const defaultPermissions: Record<number, Record<string, Record<string, boolean>>> = {
  1: Object.fromEntries(actions.value.map(a => [a.id, Object.fromEntries(modules.value.map(m => [m.id, true]))])),
  2: {
    consulter: { dao: true, decomptes: true, suivi: true, attribution: true, observatoire: true, ano: true },
    creer: { dao: true },
    publier: { dao: true },
    attacher: { dao: true },
    valider: { dao: true }
  },
  3: {
    consulter: { dao: true, decomptes: true, facture: true, finances: true },
    creer: { decomptes: true, facture: true, finances: true }
  },
  4: {
    consulter: { dao: true, decomptes: true, suivi: true, attribution: true, observatoire: true, ano: true },
    creer: { dao: true },
    publier: { dao: true },
    attacher: { dao: true },
    valider: { dao: true }
  },
  5: {
    consulter: { dao: true, attachements: true, decomptes: true },
    attacher: { attachements: true }
  },
  6: {
    consulter: { dao: true, decomptes: true, facture: true, finances: true },
    creer: { decomptes: true, facture: true, finances: true }
  },
  7: {
    consulter: { dao: true }
  },
  8: {
    consulter: { dao: true, dgcpm: true }
  },
  9: {
    consulter: { dao: true, armp: true }
  },
  10: {
    consulter: {
      dao: true,
      decomptes: true,
      paiements: true,
      observatoire: true,
      ano: true,
      armp: true,
      contentieux: true
    },
    modifier: {
      paiements: true
    },
    stats: {
      dao: true,
      observatoire: true
    }
  },
  11: {
    consulter: { dao: true, utilisateurs: true, observatoire: true }
  },
  12: {
    consulter: {
      dao: true,
      decomptes: true,
      paiements: true,
      observatoire: true,
      ano: true,
      armp: true,
      contentieux: true,
      audit: true
    },
    modifier: {
      paiements: true
    },
    stats: {
      dao: true,
      observatoire: true
    }
  }
}

const permissions = ref<Record<string, Record<string, boolean>>>({})
const toast = ref('')
const search = ref('')
const showAddRole = ref(false)
const newRole = ref<{ id?: number; name: string; description: string; permissions: Record<string, Record<string, boolean>> }>({ name: '', description: '', permissions: {} })
const modalRole = ref(null)
const isEditMode = ref(false)

// Palette et icônes pour chaque module
const moduleMetaMap: Record<string, { color: string; icon: string }> = {
  dao: { color: 'bg-blue-100 text-blue-800', icon: '📁' },
  decomptes: { color: 'bg-green-100 text-green-800', icon: '💰' },
  suivi: { color: 'bg-cyan-100 text-cyan-800', icon: '🔎' },
  attribution: { color: 'bg-pink-100 text-pink-800', icon: '📝' },
  paiements: { color: 'bg-orange-100 text-orange-800', icon: '💸' },
  observatoire: { color: 'bg-purple-100 text-purple-800', icon: '📊' },
  utilisateurs: { color: 'bg-gray-200 text-gray-800', icon: '👤' },
  ano: { color: 'bg-yellow-100 text-yellow-800', icon: '🏛️' },
  armp: { color: 'bg-red-100 text-red-800', icon: '⚖️' },
  contentieux: { color: 'bg-gray-100 text-gray-700', icon: '📂' },
  facture: { color: 'bg-orange-200 text-orange-900', icon: '🧾' },
  finances: { color: 'bg-emerald-100 text-emerald-800', icon: '💵' },
  dgcpm: { color: 'bg-cyan-200 text-cyan-900', icon: '🏢' },
  attachements: { color: 'bg-indigo-100 text-indigo-800', icon: '📎' },
  audit: { color: 'bg-teal-100 text-teal-800', icon: '🔍' },
}

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
const filteredModules = computed(() => modules.value.filter((m: any) => m.name.toLowerCase().includes(search.value.toLowerCase())))
const filteredActions = computed(() => actions.value.filter((a: any) => a.name.toLowerCase().includes(search.value.toLowerCase())))

function addRole() {
  if (!newRole.value.name) return
  if (isEditMode.value && newRole.value.id) {
    // Edition : met à jour le rôle existant
    const idx = roles.findIndex((r: any) => r.id === newRole.value.id)
    if (idx !== -1) {
      roles[idx].name = newRole.value.name
      roles[idx].description = newRole.value.description
      defaultPermissions[newRole.value.id] = JSON.parse(JSON.stringify(newRole.value.permissions))
      showToast('Rôle modifié !')
    }
  } else {
    // Création
    const newId = Date.now()
    roles.push({
      id: newId,
      name: newRole.value.name,
      description: newRole.value.description,
    })
    defaultPermissions[newId] = JSON.parse(JSON.stringify(newRole.value.permissions))
    showToast('Rôle créé !')
  }
  showAddRole.value = false
  isEditMode.value = false
  newRole.value = { name: '', description: '', permissions: {} }
}

function openAddRoleModal() {
  // Initialise la matrice permissions à false pour tous modules/actions
  const perms: Record<string, Record<string, boolean>> = {}
  for (const action of actions.value) {
    perms[action.id] = {}
    for (const module of modules.value) {
      perms[action.id][module.id] = false
    }
  }
  newRole.value = { name: '', description: '', permissions: perms }
  showAddRole.value = true
}

function viewRole(role: any) { modalRole.value = role }
function editRole(role: any) {
  // Pré-remplit le formulaire avec les infos du rôle
  isEditMode.value = true
  const perms = defaultPermissions[role.id]
  // Deep clone pour éviter la mutation
  const permsClone: Record<string, Record<string, boolean>> = {}
  for (const action of actions.value) {
    permsClone[action.id] = {}
    for (const module of modules.value) {
      permsClone[action.id][module.id] = perms?.[action.id]?.[module.id] || false
    }
  }
  newRole.value = {
    name: role.name,
    description: role.description,
    permissions: permsClone
  }
  showAddRole.value = true
  // Stocke l'id du rôle à éditer
  newRole.value.id = role.id
}
function deleteRole(role: any) {
  if (window.confirm('Supprimer ce rôle ?')) {
    roles = roles.filter((r: any) => r.id !== role.id)
    showToast('Rôle supprimé !')
    delete defaultPermissions[role.id]
  }
}

function getRoleRightsText(roleId: number): string {
  const perms = defaultPermissions[roleId]
  if (!perms || typeof perms !== 'object') return '-'
  let rights: string[] = []
  for (const act in perms) {
    if (!perms[act] || typeof perms[act] !== 'object') continue
    for (const mod in perms[act]) {
      if (perms[act][mod]) {
        const modName = modules.value.find((m: any) => m.id === mod)?.name || mod
        rights.push(`${act} ${modName}`)
      }
    }
  }
  return rights.length ? rights.join(', ') : '-'
}

function getRoleRightsBadges(roleId: number): { text: string; class: string; icon: string }[] {
  const perms = defaultPermissions[roleId]
  if (!perms || typeof perms !== 'object') return []
  const badges: { text: string; class: string; icon: string }[] = []
  for (const act in perms) {
    if (!perms[act] || typeof perms[act] !== 'object') continue
    for (const mod in perms[act]) {
      if (perms[act][mod]) {
        const modName = modules.value.find((m: any) => m.id === mod)?.name || mod
        const meta = moduleMetaMap[mod] || { color: 'bg-gray-100 text-gray-700', icon: '' }
        badges.push({
          text: `${act} ${modName}`,
          class: meta.color + ' shadow-sm',
          icon: meta.icon
        })
      }
    }
  }
  return badges
}

function getRoleRightsTooltip(roleId: number): string {
  return getRoleRightsBadges(roleId).map((b: {text: string}) => b.text).join(', ')
}

function goToEditRole(role: any) {
  router.push(`/admin/roles/${role.id}/edit`)
}
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