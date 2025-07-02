<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <h2 class="text-2xl font-bold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2a3 3 0 013-3c1.657 0 3 1.343 3 3z" /></svg>
        <span>Audit — Journal des opérations (ISO 27001)</span>
      </h2>
    </div>
    <fieldset class="p-4 mb-6 bg-teal-50/60 shadow-sm rounded-2xl border-0">
      <div class="flex flex-wrap gap-3 mt-0 items-center justify-center">
        <!-- Recherche générale -->
        <input v-model="filters.keyword" type="text" placeholder="Recherche générale..." class="input input-xs w-44 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition placeholder-gray-400" />
        <!-- Dropdowns dynamiques -->
        <select v-model="filters.user" class="select select-xs w-36 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition hover:bg-teal-50/80">
          <option value="">Utilisateur</option>
          <option v-for="u in uniqueUsers" :key="u" :value="u">{{ u }}</option>
        </select>
        <select v-model="filters.action" class="select select-xs w-36 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition hover:bg-teal-50/80">
          <option value="">Action</option>
          <option v-for="a in uniqueActions" :key="a" :value="a">{{ a }}</option>
        </select>
        <select v-model="filters.type" class="select select-xs w-32 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition hover:bg-teal-50/80">
          <option value="">Type</option>
          <option v-for="t in uniqueTypes" :key="t" :value="t">{{ t }}</option>
        </select>
        <select v-model="filters.module" class="select select-xs w-36 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition hover:bg-teal-50/80">
          <option value="">Module</option>
          <option v-for="m in uniqueModules" :key="m" :value="m">{{ m }}</option>
        </select>
        <select v-model="filters.ip" class="select select-xs w-32 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition hover:bg-teal-50/80">
          <option value="">Adresse IP</option>
          <option v-for="ip in uniqueIPs" :key="ip" :value="ip">{{ ip }}</option>
        </select>
        <select v-model="filters.status" class="select select-xs w-28 rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition hover:bg-teal-50/80">
          <option value="">Statut</option>
          <option v-for="s in uniqueStatus" :key="s" :value="s">{{ s }}</option>
        </select>
        <button class="btn btn-xs btn-circle rounded-full shadow bg-white/80 border-0 text-teal-700 hover:bg-teal-100 transition" @click="resetFilters" title="Réinitialiser les filtres" :disabled="!hasActiveFilters">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </fieldset>
    <div class="flex flex-wrap items-center justify-end mb-2 gap-2">
      <button class="btn btn-xs btn-outline flex items-center gap-1" @click="exportSelected('json')" :disabled="!canExport"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg> JSON</button>
      <button class="btn btn-xs btn-outline flex items-center gap-1" @click="exportSelected('csv')" :disabled="!canExport"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg> CSV</button>
      <button class="btn btn-xs btn-outline flex items-center gap-1" @click="exportSelected('xml')" :disabled="!canExport"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg> XML</button>
      <button class="btn btn-xs btn-outline flex items-center gap-1" @click="printSelected" :disabled="!canExport"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9V2h12v7" /><rect width="16" height="13" x="4" y="9" rx="2" /><path d="M9 17h6" /></svg> Imprimer</button>
    </div>
    <div class="overflow-x-auto rounded-2xl shadow-lg bg-white">
      <table class="table w-full user-datagrid">
        <thead>
          <tr>
            <th class="bg-teal-50 px-2 w-8 text-center">
              <input type="checkbox" v-model="allSelected" />
            </th>
            <th class="bg-teal-50 px-4 min-w-[120px]">Date</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">Utilisateur</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">Action</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">Module</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">Objet</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">IP</th>
            <th class="bg-teal-50 px-4 min-w-[100px]">Statut</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">Session</th>
            <th class="bg-teal-50 px-4 min-w-[120px]">ISO 27001</th>
            <th class="bg-teal-50 px-4 min-w-[80px] text-center">Détail</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="log in paginatedLogs" :key="log.id">
            <tr class="align-middle hover:bg-teal-50/40 transition cursor-pointer" @click="selectLog(log)">
              <td class="px-2 text-center">
                <input type="checkbox" v-model="selectedIds" :value="log.id" @click.stop />
              </td>
              <td class="px-4">{{ log.date }} {{ log.heure }}</td>
              <td class="px-4 font-semibold text-gray-900 flex items-center gap-2">
                <span class="badge badge-info">{{ log.user }}</span>
              </td>
              <td class="px-4">{{ log.action }}</td>
              <td class="px-4">{{ log.module }}</td>
              <td class="px-4">{{ log.object }}</td>
              <td class="px-4 text-xs text-gray-500">{{ log.ip }}</td>
              <td class="px-4">
                <span :class="log.status === 'Succès' ? 'badge badge-success' : 'badge badge-error'">{{ log.status }}</span>
              </td>
              <td class="px-4 text-xs">{{ log.session }}</td>
              <td class="px-4 text-xs">{{ log.iso }}</td>
              <td class="px-4 text-center">
                <button class="btn btn-xs btn-circle btn-ghost" @click.stop="selectLog(log)" title="Voir le détail">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </td>
            </tr>
          </template>
          <tr v-if="paginatedLogs.length === 0">
            <td :colspan="12" class="text-center text-gray-400 py-8">Aucun log à afficher</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination avancée -->
      <fieldset class="p-4 mt-4 bg-gray-50/60 shadow-sm rounded-2xl border-0">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
          <div class="text-xs text-gray-500">Page {{ page }} / {{ totalPages }}</div>
          <div class="flex items-center gap-2">
            <label class="text-xs text-gray-500">Éléments/page</label>
            <select v-model.number="pageSize" class="select select-xs rounded-2xl shadow bg-white/80 focus:ring-2 focus:ring-teal-300 focus:bg-white border-0 transition">
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
        </div>
      </fieldset>
    </div>
    <div v-if="selectedLog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-teal-100 relative">
        <button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost" @click="selectedLog = null">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h3 class="text-xl font-bold mb-4 text-teal-700">Détail du log</h3>
        <div class="mb-2"><b>Date :</b> {{ selectedLog.date }}</div>
        <div class="mb-2"><b>Utilisateur :</b> {{ selectedLog.user }}</div>
        <div class="mb-2"><b>Action :</b> {{ selectedLog.action }}</div>
        <div class="mb-2"><b>Module :</b> {{ selectedLog.module }}</div>
        <div class="mb-2"><b>Objet :</b> {{ selectedLog.object }}</div>
        <div class="mb-2"><b>Adresse IP :</b> {{ selectedLog.ip }}</div>
        <div class="mb-2"><b>Statut :</b> {{ selectedLog.status }}</div>
        <div class="mb-2"><b>Session :</b> {{ selectedLog.session }}</div>
        <div class="mb-2"><b>Description :</b> {{ selectedLog.description }}</div>
        <div class="mb-2"><b>Conformité ISO 27001 :</b> {{ selectedLog.iso }}</div>
        <div class="mb-2 flex items-center gap-2"><b>Log brut :</b>
          <textarea class="textarea textarea-bordered w-full text-xs" rows="6" readonly>{{ JSON.stringify(selectedLog, null, 2) }}</textarea>
          <button class="btn btn-xs btn-outline ml-2" @click="copyRawLog(selectedLog)">Copier</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const logs = ref([
  { id: 1, date: '2024-06-01 10:12', heure: '10:12', user: 'admin', action: 'Création DAO', type: 'Création', module: 'DAO', object: 'DAO-2024-001', ip: '192.168.1.10', status: 'Succès', session: 'sess-001', description: 'DAO créé', iso: 'A.12.4.1', raw: {} },
  { id: 2, date: '2024-06-01 10:15', heure: '10:15', user: 'auditeur', action: 'Consultation PPM', type: 'Consultation', module: 'PPM', object: 'PPM-2024', ip: '192.168.1.22', status: 'Succès', session: 'sess-002', description: 'PPM consulté', iso: 'A.12.4.1', raw: {} },
  { id: 3, date: '2024-06-01 10:18', heure: '10:18', user: 'admin', action: 'Suppression utilisateur', type: 'Suppression', module: 'Utilisateurs', object: 'user-42', ip: '192.168.1.10', status: 'Erreur', session: 'sess-001', description: 'Suppression refusée', iso: 'A.12.4.2', raw: {} },
  // ...
])
const filters = ref({ keyword: '', user: '', action: '', type: '', module: '', heure: '', ip: '', status: '', session: '' })
const hasActiveFilters = computed(() => Object.values(filters.value).some(v => v))
const uniqueUsers = computed(() => [...new Set(logs.value.map(l => l.user))])
const uniqueActions = computed(() => [...new Set(logs.value.map(l => l.action))])
const uniqueModules = computed(() => [...new Set(logs.value.map(l => l.module))])
const uniqueIPs = computed(() => [...new Set(logs.value.map(l => l.ip))])
const uniqueStatus = computed(() => [...new Set(logs.value.map(l => l.status))])
const uniqueSessions = computed(() => [...new Set(logs.value.map(l => l.session))])
const uniqueHeures = computed(() => [...new Set(logs.value.map(l => l.heure))])
const uniqueTypes = computed(() => [...new Set(logs.value.map(l => l.type))])
const page = ref(1)
const pageSize = ref(10)
const selectedLog = ref<any>(null)
const selectedIds = ref<number[]>([])
const allSelected = computed({
  get() {
    return paginatedLogs.value.length > 0 && paginatedLogs.value.every((log: any) => selectedIds.value.includes(log.id))
  },
  set(val: boolean) {
    if (val) {
      const idsToAdd = paginatedLogs.value.map((log: any) => log.id).filter(id => !selectedIds.value.includes(id))
      selectedIds.value = [...selectedIds.value, ...idsToAdd]
    } else {
      const idsToRemove = paginatedLogs.value.map((log: any) => log.id)
      selectedIds.value = selectedIds.value.filter(id => !idsToRemove.includes(id))
    }
  }
})
const canExport = computed(() => paginatedLogs.value.length > 0 && (selectedIds.value.length > 0 || paginatedLogs.value.length > 0))
function resetFilters() { filters.value = { keyword: '', user: '', action: '', type: '', module: '', heure: '', ip: '', status: '', session: '' } }
const filteredLogs = computed(() => logs.value.filter(log =>
  (!filters.value.keyword || Object.values(log).some(v => String(v).toLowerCase().includes(filters.value.keyword.toLowerCase()))) &&
  (!filters.value.user || log.user === filters.value.user) &&
  (!filters.value.action || log.action === filters.value.action) &&
  (!filters.value.type || log.type === filters.value.type) &&
  (!filters.value.module || log.module === filters.value.module) &&
  (!filters.value.heure || log.heure === filters.value.heure) &&
  (!filters.value.ip || log.ip === filters.value.ip) &&
  (!filters.value.status || log.status === filters.value.status) &&
  (!filters.value.session || log.session === filters.value.session)
))
const totalPages = computed(() => Math.ceil(filteredLogs.value.length / pageSize.value) || 1)
const paginatedLogs = computed(() => filteredLogs.value.slice((page.value-1)*pageSize.value, page.value*pageSize.value))
function selectLog(log: any) { selectedLog.value = log }
function exportSelected(format: string) {
  const toExport = logs.value.filter((log: any) => selectedIds.value.length === 0 || selectedIds.value.includes(log.id))
  let dataStr = ''
  if (format === 'json') {
    dataStr = JSON.stringify(toExport, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    downloadFile(url, 'audit-logs.json')
  } else if (format === 'csv') {
    const csvRows = [Object.keys(toExport[0] || {}).join(',')]
    for (const log of toExport) {
      csvRows.push(Object.values(log).map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))
    }
    dataStr = csvRows.join('\n')
    const blob = new Blob([dataStr], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    downloadFile(url, 'audit-logs.csv')
  } else if (format === 'xml') {
    dataStr = '<logs>' + toExport.map(log => '<log>' + Object.entries(log).map(([k, v]) => `<${k}>${String(v).replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</${k}>`).join('') + '</log>').join('') + '</logs>'
    const blob = new Blob([dataStr], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    downloadFile(url, 'audit-logs.xml')
  }
}
function downloadFile(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}
function printSelected() {
  const toPrint = logs.value.filter((log: any) => selectedIds.value.length === 0 || selectedIds.value.includes(log.id))
  const win = window.open('', '', 'width=900,height=700')
  if (!win) return
  win.document.write('<html><head><title>Impression logs</title><style>body{font-family:sans-serif;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:6px;}th{background:#e6f7f7;}</style></head><body>')
  win.document.write('<h2>Logs d\'audit sélectionnés</h2>')
  win.document.write('<table><thead><tr>' + Object.keys(toPrint[0] || {}).map(k => `<th>${k}</th>`).join('') + '</tr></thead><tbody>')
  for (const log of toPrint) {
    win.document.write('<tr>' + Object.values(log).map(v => `<td>${v}</td>`).join('') + '</tr>')
  }
  win.document.write('</tbody></table></body></html>')
  win.document.close()
  win.focus()
  win.print()
}
const rowDetailsOpen = ref<Record<number, boolean>>({})
function toggleRowDetails(id: number) {
  rowDetailsOpen.value[id] = !rowDetailsOpen.value[id]
}
function copyRawLog(log: any) {
  navigator.clipboard.writeText(JSON.stringify(log, null, 2))
}
</script> 