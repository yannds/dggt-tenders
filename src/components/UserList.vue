<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <h2 class="text-2xl font-bold">Liste des utilisateurs</h2>
    </div>
    <fieldset class="p-4 mb-6 bg-blue-50/60 shadow-sm rounded-2xl border-0">
      <div class="flex flex-wrap gap-3 mt-0 items-center justify-center">
        <input v-model="filters.nom" type="text" placeholder="Nom" class="input input-xs w-44 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition placeholder-gray-400" />
        <select v-model="filters.categorie" class="select select-xs w-32 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition hover:bg-blue-50/80" >
          <option value="">Catégorie</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <select v-model="filters.fonction" class="select select-xs w-32 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition hover:bg-blue-50/80" >
          <option value="">Fonction</option>
          <option v-for="fct in uniqueFunctions" :key="fct" :value="fct">{{ fct }}</option>
        </select>
        <select v-model="filters.societe" class="select select-xs w-32 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition hover:bg-blue-50/80" >
          <option value="">Société</option>
          <option v-for="soc in uniqueSocietes" :key="soc" :value="soc">{{ soc }}</option>
        </select>
        <select v-model="filters.actif" class="select select-xs w-28 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition hover:bg-blue-50/80">
          <option value="">Actif/Désactivé</option>
          <option value="true">Actif</option>
          <option value="false">Désactivé</option>
        </select>
        <button class="btn btn-xs btn-circle rounded-full shadow bg-white/80 border-0 text-blue-700 hover:bg-blue-100 transition" @click="resetSearch" title="Réinitialiser la recherche" :disabled="false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </fieldset>
    <div class="bg-white rounded-2xl shadow-lg p-2 w-full">
      <table class="table w-full user-datagrid">
        <thead>
          <tr>
            <th @click="sortBy('nom')" class="cursor-pointer select-none">Utilisateur</th>
            <th @click="sortBy('categorie')" class="cursor-pointer select-none">Catégorie</th>
            <th @click="sortBy('societe')" class="cursor-pointer select-none">Société</th>
            <th @click="sortBy('telephone')" class="cursor-pointer select-none">Téléphone</th>
            <th @click="sortBy('email')" class="cursor-pointer select-none">Email</th>
            <th @click="sortBy('roles')" class="cursor-pointer select-none">Rôle système</th>
            <th @click="sortBy('actif')" class="cursor-pointer select-none">Statut</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="align-middle cursor-pointer hover:bg-blue-50/40 transition" @click="showUserModal(user)">
            <td class="flex items-center gap-4 py-3">
              <img :src="user.avatar" class="h-12 w-12 rounded-full border border-gray-200 shadow-sm" :alt="user.prenom + ' ' + user.nom" />
              <div>
                <div class="font-bold text-gray-900 text-sm">{{ user.prenom }} {{ user.nom }}</div>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span v-for="role in user.roles.slice(1)" :key="role" class="badge badge-info text-xs font-normal">{{ role }}</span>
                </div>
              </div>
            </td>
            <td class="text-sm font-normal truncate whitespace-nowrap overflow-hidden">{{ user.categorie }}</td>
            <td class="text-sm font-normal truncate whitespace-nowrap overflow-hidden">{{ user.societe }}</td>
            <td class="text-sm font-normal truncate whitespace-nowrap overflow-hidden">{{ user.telephone }}</td>
            <td class="text-sm font-normal truncate whitespace-nowrap overflow-hidden">{{ user.email }}</td>
            <td class="text-sm font-normal truncate whitespace-nowrap overflow-hidden">
              <span class="badge badge-primary text-xs font-normal">{{ user.roles[0] }}</span>
            </td>
            <td class="text-sm font-normal truncate whitespace-nowrap overflow-hidden">
              <span v-if="user.actif" class="badge badge-success">Actif</span>
              <span v-else class="badge badge-error">Désactivé</span>
            </td>
            <td @click.stop class="flex flex-row gap-2 justify-center items-center">
              <button class="btn btn-xs btn-circle bg-white/80 border-0 shadow hover:bg-blue-100 transition" @click.stop="showUserModal(user)" title="Modifier">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h12" /></svg>
              </button>
              <button class="btn btn-xs btn-circle bg-white/80 border-0 shadow hover:bg-blue-100 transition" @click.stop="modalInteractionUser = user" title="Voir interactions">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
              <button class="btn btn-xs btn-circle bg-white/80 border-0 shadow hover:bg-blue-100 transition" @click.stop="resetPassword()" title="Réinitialiser MDP">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2a3 3 0 013-3c1.657 0 3 1.343 3 3z" /></svg>
              </button>
              <button class="btn btn-xs btn-circle bg-white/80 border-0 shadow hover:bg-blue-100 transition" @click.stop="toggleActive(user.id)" :title="user.actif ? 'Désactiver' : 'Activer'">
                <svg v-if="user.actif" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17a2 2 0 002-2V9a2 2 0 00-4 0v6a2 2 0 002 2zm0 0v2m0-2v-2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8V7a5 5 0 00-10 0v1a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17a2 2 0 002-2V9a2 2 0 00-4 0v6a2 2 0 002 2zm0 0v2m0-2v-2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8V7a5 5 0 00-10 0v1a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" /></svg>
              </button>
              <button class="btn btn-xs btn-circle bg-white/80 border-0 shadow hover:bg-blue-100 transition" @click.stop="removeUser(user.id)" title="Supprimer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <fieldset class="p-4 mt-8 bg-gray-50/60 shadow-sm rounded-2xl border-0">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
        <div class="text-xs text-gray-500">Page {{ page }} / {{ totalPages }}</div>
        <div class="flex items-center gap-2">
          <label class="text-xs text-gray-500">Éléments/page</label>
          <select v-model.number="pageSize" class="select select-xs rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-blue-300 focus:bg-white border-0 transition">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <div class="flex items-center gap-1 ml-2">
            <button class="btn btn-xs btn-circle" :disabled="page === 1" @click="page = Math.max(1, page - 1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span class="text-xs px-1">{{ page }}</span>
            <button class="btn btn-xs btn-circle" :disabled="page === totalPages" @click="page = Math.min(totalPages, page + 1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div class="join"></div>
        <div class="flex flex-row gap-2 ml-4 mt-2 md:mt-0">
          <span class="text-xs text-gray-500 flex items-center mr-2">Exporter vers / Imprimer&nbsp;:</span>
          <!-- JSON -->
          <span @click="exportJSON" title="Exporter JSON" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M7 7c-2 2-2 6 0 8m10-8c2 2 2 6 0 8" stroke="#f59e42" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9v6m4-6v6" stroke="#f59e42" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <!-- XML -->
          <span @click="exportXML" title="Exporter XML" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 7h-4v10h4" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          <!-- XLSX -->
          <span @click="exportXLSX" title="Exporter XLSX" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" fill="#22c55e" opacity="0.15"/><rect x="4" y="6" width="16" height="12" rx="2" stroke="#22c55e" stroke-width="2"/><path d="M8 10h8M8 14h8" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="10" r="1" fill="#22c55e"/><circle cx="8" cy="14" r="1" fill="#22c55e"/></svg>
          </span>
          <!-- PDF -->
          <span @click="exportPDF" title="Exporter PDF" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" fill="#ef4444" opacity="0.15"/><rect x="5" y="4" width="14" height="16" rx="2" stroke="#ef4444" stroke-width="2"/><path d="M9 8h6M9 12h6M9 16h2" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/><text x="12" y="19" text-anchor="middle" font-size="6" fill="#ef4444" font-family="monospace">PDF</text></svg>
          </span>
          <!-- Impression -->
          <span @click="printUsers" title="Imprimer" style="cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="6" y="9" width="12" height="8" rx="2" fill="#a3a3a3" opacity="0.15"/><rect x="6" y="9" width="12" height="8" rx="2" stroke="#6b7280" stroke-width="1.5"/><rect x="8" y="5" width="8" height="4" rx="1" fill="#e5e7eb" stroke="#6b7280" stroke-width="1.5"/><circle cx="12" cy="13" r="1" fill="#6b7280"/><path d="M9 17h6" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round"/></svg>
          </span>
        </div>
      </div>
    </fieldset>
    <div v-if="modalUser" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white rounded-2xl shadow-xl p-0 w-auto max-w-sm border border-blue-100 relative flex flex-col items-center justify-center">
        <button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost" @click="modalUser = null">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <UserForm :user="modalUser" @submit="modalUser = null" @cancel="modalUser = null" />
      </div>
    </div>
    <div v-if="modalInteractionUser" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs md:max-w-md border border-blue-100 relative">
        <button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost" @click="modalInteractionUser = null">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div class="flex flex-col items-center gap-2 mb-4">
          <img :src="modalInteractionUser.avatar" class="h-16 w-16 rounded-full border border-gray-200 shadow" :alt="modalInteractionUser.prenom + ' ' + modalInteractionUser.nom" />
          <div class="font-bold text-lg text-gray-900">{{ modalInteractionUser.prenom }} {{ modalInteractionUser.nom }}</div>
        </div>
        <div class="flex flex-col gap-2 text-sm">
          <div><span class="font-semibold">Date d'enregistrement :</span> {{ formatDate(modalInteractionUser.dateEnregistrement) }}</div>
          <div><span class="font-semibold">Dernière connexion :</span> {{ formatDate(modalInteractionUser.dernierConnexion) }}</div>
          <div><span class="font-semibold">Connexions réussies :</span> {{ modalInteractionUser.connexionsReussies }}</div>
          <div><span class="font-semibold">Déconnexions réussies :</span> {{ modalInteractionUser.deconnexionsReussies }}</div>
          <div><span class="font-semibold">Connexions échouées :</span> {{ modalInteractionUser.connexionsEchouees }}</div>
        </div>
      </div>
    </div>
    <!-- Bouton flottant Ajouter -->
    <button
      class="fixed bottom-8 right-8 z-50 btn btn-primary btn-circle shadow-lg flex items-center justify-center w-16 h-16 text-3xl"
      @click="goToCreateUser"
      title="Ajouter un utilisateur"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <!-- Toast visuel -->
    <div v-if="toastMessage" class="fixed bottom-8 right-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'
import UserForm from './UserForm.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const search = ref('')
const page = ref(1)
const pageSize = ref(10)
const modalUser = ref(null)
const sortField = ref('')
const sortAsc = ref(true)
const modalInteractionUser = ref<null | any>(null)
const toastMessage = ref('')

const filters = ref({
  nom: '',
  categorie: '',
  fonction: '',
  actif: '',
  societe: '',
})

const router = useRouter()

const uniqueCategories = computed(() => Array.from(new Set(users.value.map(u => u.categorie).filter(Boolean))))
const uniqueFunctions = computed(() => Array.from(new Set(users.value.map(u => u.fonction).filter(Boolean))))
const uniqueSocietes = computed(() => Array.from(new Set(users.value.map(u => u.societe).filter(Boolean))))

function sortBy(field: string) {
  if (sortField.value === field) {
    sortAsc.value = !sortAsc.value
  } else {
    sortField.value = field
    sortAsc.value = true
  }
}

const filteredUsers = computed(() => {
  let arr = users.value
  // Recherche globale
  const q = search.value.trim().toLowerCase()
  if (q) {
    arr = arr.filter(u =>
      u.nom.toLowerCase().includes(q) ||
      u.prenom.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.fonction.toLowerCase().includes(q) ||
      u.roles.some(r => r.toLowerCase().includes(q)) ||
      u.telephone.toLowerCase().includes(q) ||
      u.categorie.toLowerCase().includes(q) ||
      u.societe.toLowerCase().includes(q)
    )
  }
  // Filtres multi-critères (ET logique)
  if (filters.value.nom) arr = arr.filter(u => u.nom.toLowerCase().includes(filters.value.nom.toLowerCase()))
  if (filters.value.categorie) arr = arr.filter(u => u.categorie === filters.value.categorie)
  if (filters.value.fonction) arr = arr.filter(u => u.fonction === filters.value.fonction)
  if (filters.value.societe) arr = arr.filter(u => u.societe === filters.value.societe)
  if (filters.value.actif !== '') arr = arr.filter(u => String(u.actif) === filters.value.actif)
  // Tri dynamique
  if (sortField.value) {
    arr = [...arr].sort((a, b) => {
      let va = (a as any)[sortField.value]
      let vb = (b as any)[sortField.value]
      if (typeof va === 'string' && typeof vb === 'string') {
        va = va.toLowerCase(); vb = vb.toLowerCase()
      }
      if (va < vb) return sortAsc.value ? -1 : 1
      if (va > vb) return sortAsc.value ? 1 : -1
      return 0
    })
  }
  return arr
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize.value)))
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredUsers.value.slice(start, start + pageSize.value)
})

function resetSearch() {
  filters.value = { nom: '', categorie: '', fonction: '', actif: '', societe: '' }
  search.value = ''
  page.value = 1
}
function exportJSON() {
  const data = JSON.stringify(filteredUsers.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'utilisateurs.json'
  a.click()
  URL.revokeObjectURL(url)
}
function exportXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<utilisateurs>\n'
  filteredUsers.value.forEach(u => {
    xml += '  <utilisateur>\n'
    Object.entries(u).forEach(([k, v]) => {
      xml += `    <${k}>${String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</${k}>\n`
    })
    xml += '  </utilisateur>\n'
  })
  xml += '</utilisateurs>'
  const blob = new Blob([xml], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'utilisateurs.xml'
  a.click()
  URL.revokeObjectURL(url)
}
function exportXLSX() {
  // Simple CSV for now, can be opened in Excel
  const rows = [
    ['Nom', 'Prénom', 'Catégorie', 'Fonction', 'Société', 'Téléphone', 'Email', 'Rôle système', 'Rôles secondaires', 'Statut'],
    ...filteredUsers.value.map(u => [u.nom, u.prenom, u.categorie, u.fonction, u.societe, u.telephone, u.email, u.roles[0], u.roles.slice(1).join(' | '), u.actif ? 'Actif' : 'Inactif'])
  ]
  const csv = rows.map(r => '"' + r.join('","') + '"').join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'utilisateurs.xlsx.csv'
  a.click()
  URL.revokeObjectURL(url)
}
function exportPDF() {
  window.print()
}
function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 2500)
}
function resetPassword() {
  userStore.resetPassword()
  showToast('Email de réinitialisation envoyé !')
}
function toggleActive(id: number) {
  userStore.toggleActive(id)
}
function removeUser(id: number) {
  if (window.confirm("Supprimer cet utilisateur ?")) {
    userStore.removeUser(id)
    showToast("Utilisateur supprimé avec succès !")
  }
}
function showUserModal(user: any) {
  modalUser.value = user
}
function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })
}
function printUsers() {
  window.print()
}
function goToCreateUser() {
  router.push('/admin/accounts/create')
}

// --- Ajout de 15 nouveaux utilisateurs tests variés ---
if (users.value.length < 15) {
  users.value.splice(0, users.value.length, // reset array
    {
      id: 201,
      prenom: 'Arsène', nom: 'Mabiala', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', categorie: 'Admin', fonction: 'DSI', societe: 'DGGT', telephone: '+242 06 123 45 67', email: 'arsene.mabiala@dggt.cg', roles: ['Administrateur'], actif: true, dernierConnexion: '2024-06-01', nombreConnexions: 18, dateEnregistrement: '2024-06-01', connexionsReussies: 18, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 202,
      prenom: 'Clarisse', nom: 'Ngoma', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', categorie: 'Utilisateur', fonction: 'Comptable', societe: 'DGGT', telephone: '+242 05 234 56 78', email: 'clarisse.ngoma@dggt.cg', roles: ['Utilisateur'], actif: true, dernierConnexion: '2024-06-02', nombreConnexions: 9, dateEnregistrement: '2024-06-02', connexionsReussies: 9, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 203,
      prenom: 'Blaise', nom: 'Makosso', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', categorie: 'Consultant', fonction: 'Consultant', societe: 'Cabinet K', telephone: '+242 06 345 67 89', email: 'blaise.makosso@cabk.cg', roles: ['Consultant'], actif: false, dernierConnexion: '2024-05-30', nombreConnexions: 3, dateEnregistrement: '2024-05-30', connexionsReussies: 0, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 204,
      prenom: 'Prisca', nom: 'Mouanda', avatar: 'https://randomuser.me/api/portraits/women/14.jpg', categorie: 'Utilisateur', fonction: 'Juriste', societe: 'DGGT', telephone: '+242 05 456 78 90', email: 'prisca.mouanda@dggt.cg', roles: ['Utilisateur', 'Juriste'], actif: true, dernierConnexion: '2024-06-03', nombreConnexions: 12, dateEnregistrement: '2024-06-03', connexionsReussies: 12, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 205,
      prenom: 'Davy', nom: 'Koumba', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', categorie: 'Admin', fonction: 'Chef SI', societe: 'DGGT', telephone: '+242 06 567 89 01', email: 'davy.koumba@dggt.cg', roles: ['Administrateur'], actif: true, dernierConnexion: '2024-06-04', nombreConnexions: 22, dateEnregistrement: '2024-06-04', connexionsReussies: 22, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 206,
      prenom: 'Sylvie', nom: 'Mabounda', avatar: 'https://randomuser.me/api/portraits/women/16.jpg', categorie: 'Prestataire', fonction: 'Développeuse', societe: 'IT Africa', telephone: '+242 05 678 90 12', email: 'sylvie.mabounda@itafrica.cg', roles: ['Prestataire'], actif: false, dernierConnexion: '2024-05-28', nombreConnexions: 2, dateEnregistrement: '2024-05-28', connexionsReussies: 0, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 207,
      prenom: 'Gervais', nom: 'Moukouba', avatar: 'https://randomuser.me/api/portraits/men/17.jpg', categorie: 'Utilisateur', fonction: 'Opérateur', societe: 'DGGT', telephone: '+242 06 789 01 23', email: 'gervais.moukouba@dggt.cg', roles: ['Utilisateur'], actif: true, dernierConnexion: '2024-06-05', nombreConnexions: 7, dateEnregistrement: '2024-06-05', connexionsReussies: 7, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 208,
      prenom: 'Patricia', nom: 'Ndinga', avatar: 'https://randomuser.me/api/portraits/women/18.jpg', categorie: 'Consultant', fonction: 'Consultante', societe: 'Cabinet Y', telephone: '+242 05 890 12 34', email: 'patricia.ndinga@caby.cg', roles: ['Consultant'], actif: true, dernierConnexion: '2024-06-06', nombreConnexions: 5, dateEnregistrement: '2024-06-06', connexionsReussies: 5, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 209,
      prenom: 'Wilfried', nom: 'Mabiala', avatar: 'https://randomuser.me/api/portraits/men/19.jpg', categorie: 'Prestataire', fonction: 'Designer', societe: 'Studio Z', telephone: '+242 06 901 23 45', email: 'wilfried.mabiala@studioz.cg', roles: ['Prestataire'], actif: false, dernierConnexion: '2024-05-29', nombreConnexions: 4, dateEnregistrement: '2024-05-29', connexionsReussies: 0, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 210,
      prenom: 'Josiane', nom: 'Kikadidi', avatar: 'https://randomuser.me/api/portraits/women/20.jpg', categorie: 'Utilisateur', fonction: 'Assistante', societe: 'DGGT', telephone: '+242 05 012 34 56', email: 'josiane.kikadidi@dggt.cg', roles: ['Utilisateur'], actif: true, dernierConnexion: '2024-06-07', nombreConnexions: 10, dateEnregistrement: '2024-06-07', connexionsReussies: 10, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 211,
      prenom: 'Rodolphe', nom: 'Ngouabi', avatar: 'https://randomuser.me/api/portraits/men/21.jpg', categorie: 'Admin', fonction: 'Responsable RH', societe: 'DGGT', telephone: '+242 06 234 12 34', email: 'rodolphe.ngouabi@dggt.cg', roles: ['Administrateur'], actif: true, dernierConnexion: '2024-06-08', nombreConnexions: 19, dateEnregistrement: '2024-06-08', connexionsReussies: 19, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 212,
      prenom: 'Mireille', nom: 'Makaya', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', categorie: 'Consultant', fonction: 'Consultante', societe: 'Cabinet Z', telephone: '+242 05 345 23 45', email: 'mireille.makaya@cabz.cg', roles: ['Consultant'], actif: false, dernierConnexion: '2024-06-09', nombreConnexions: 3, dateEnregistrement: '2024-06-09', connexionsReussies: 0, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 213,
      prenom: 'Landry', nom: 'Mabika', avatar: 'https://randomuser.me/api/portraits/men/23.jpg', categorie: 'Utilisateur', fonction: 'Opérateur', societe: 'DGGT', telephone: '+242 06 456 34 56', email: 'landry.mabika@dggt.cg', roles: ['Utilisateur'], actif: true, dernierConnexion: '2024-06-10', nombreConnexions: 8, dateEnregistrement: '2024-06-10', connexionsReussies: 8, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 214,
      prenom: 'Solange', nom: 'Mavoungou', avatar: 'https://randomuser.me/api/portraits/women/24.jpg', categorie: 'Prestataire', fonction: 'Développeuse', societe: 'IT Africa', telephone: '+242 05 567 45 67', email: 'solange.mavoungou@itafrica.cg', roles: ['Prestataire'], actif: true, dernierConnexion: '2024-06-11', nombreConnexions: 6, dateEnregistrement: '2024-06-11', connexionsReussies: 6, deconnexionsReussies: 0, connexionsEchouees: 0
    },
    {
      id: 215,
      prenom: 'Boris', nom: 'Ndounga', avatar: 'https://randomuser.me/api/portraits/men/25.jpg', categorie: 'Utilisateur', fonction: 'Juriste', societe: 'DGGT', telephone: '+242 06 678 56 78', email: 'boris.ndounga@dggt.cg', roles: ['Utilisateur', 'Juriste'], actif: false, dernierConnexion: '2024-06-12', nombreConnexions: 2, dateEnregistrement: '2024-06-12', connexionsReussies: 0, deconnexionsReussies: 0, connexionsEchouees: 0
    }
  )
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .user-datagrid, .user-datagrid * {
    visibility: visible;
  }
  .user-datagrid {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    background: white;
    box-shadow: none;
  }
  .print-only-data {
    display: none !important;
  }
}
</style>
<style>
@media print {
  .user-datagrid thead { display: table-header-group !important; }
  .user-datagrid tr { page-break-inside: avoid; }
}
</style>
<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s cubic-bezier(.4,0,.2,1);
}
</style> 