<template>
  <form class="max-w-md mx-auto p-0 bg-white rounded-2xl shadow overflow-hidden" @submit.prevent="onSubmit">
    <div class="w-full bg-blue-600 py-5 px-6 flex items-center justify-center">
      <h2 class="text-2xl font-bold text-white text-center w-full">Modifier un utilisateur</h2>
    </div>
    <div class="px-8 py-8 flex flex-col gap-6 items-center">
      <div class="grid grid-cols-1 gap-4 w-full">
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Nom</label>
          <input v-model="form.nom" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Prénom</label>
          <input v-model="form.prenom" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Email</label>
          <input v-model="form.email" type="email" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Numéro de téléphone</label>
          <input v-model="form.telephone" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Fonction</label>
          <input v-model="form.fonction" class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div class="form-control flex flex-col gap-1" v-if="form.roles[0] !== 'Soumissionnaire'">
          <label class="label font-bold text-black">Type / Catégorie</label>
          <select v-model="form.categorie" class="select select-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400">
            <option value="Admin">Admin</option>
            <option value="Utilisateur">Utilisateur</option>
            <option value="Consultant">Consultant</option>
            <option value="Prestataire">Prestataire</option>
            <option value="Soumissionnaire">Soumissionnaire</option>
          </select>
        </div>
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Rôles</label>
          <div class="relative">
            <input
              v-model="roleSearch"
              @focus="showRoleDropdown = true"
              @input="showRoleDropdown = true"
              @blur="() => setTimeout(() => showRoleDropdown = false, 150)"
              type="text"
              class="input input-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400"
              placeholder="Rechercher ou ajouter un rôle..."
            />
            <div v-if="showRoleDropdown" class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow max-h-40 overflow-auto">
              <div
                v-for="role in filteredRoles"
                :key="role"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                @mousedown.prevent="toggleRole(role)"
              >
                <span :class="form.roles.includes(role) ? 'font-bold text-blue-600' : ''">{{ role }}</span>
                <span v-if="form.roles.includes(role)" class="ml-2 text-xs text-blue-400">(sélectionné)</span>
              </div>
              <div v-if="roleSearch && !filteredRoles.includes(roleSearch)" class="px-3 py-2 text-gray-400 text-xs">Aucun résultat</div>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span v-for="role in form.roles" :key="role" class="badge badge-info text-xs flex items-center gap-1">
                {{ role }}
                <button type="button" class="ml-1 text-xs text-red-500 hover:text-red-700" @click="removeRole(role)">&times;</button>
              </span>
            </div>
          </div>
        </div>
        <div class="form-control flex flex-col gap-1">
          <label class="label font-bold text-black">Statut</label>
          <select v-model="form.actif" class="select select-bordered w-full bg-gray-100 text-gray-800 border-0 focus:ring-2 focus:ring-blue-400">
            <option :value="true">Actif</option>
            <option :value="false">Inactif</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-6 w-full">
        <button type="submit" class="btn btn-primary w-32">Enregistrer</button>
        <button type="button" class="btn btn-ghost w-32" @click="$emit('cancel')">Annuler</button>
      </div>
    </div>
    <div v-if="toastMessage" class="fixed bottom-8 right-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      <span>{{ toastMessage }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import { useUserStore, type User } from '../stores/userStore'

const props = defineProps<{ user?: User, userId?: number }>()
const emit = defineEmits(['submit', 'cancel'])
const userStore = useUserStore()

const allRoles = [
  'Administrateur', 'DGGT', 'CAF', 'CT', 'Finances', 'SPM', 'Caisse', 'Soumissionnaire', 'ARMP', 'DGCMP',
]

const isEdit = computed(() => props.userId !== undefined || !!props.user)

const form = ref({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  roles: [] as string[],
  actif: true,
  fonction: '',
  categorie: '',
  password: '',
})

// Si userId est fourni, charger l'utilisateur depuis le store
if (props.userId !== undefined) {
  const user = userStore.getUserById(props.userId)
  if (user) {
    form.value = { ...user, password: '' }
  }
}

watch(() => props.user, (user) => {
  if (user) {
    form.value = { ...user, password: '' }
  } else {
    // Si pas de user, reset le formulaire pour la création
    form.value = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      roles: [],
      actif: true,
      fonction: '',
      categorie: '',
      password: '',
    }
  }
}, { immediate: true })

const roleSearch = ref('')
const showRoleDropdown = ref(false)
const filteredRoles = computed(() => {
  if (!roleSearch.value) return allRoles.filter(r => !form.value.roles.includes(r))
  return allRoles.filter(r => r.toLowerCase().includes(roleSearch.value.toLowerCase()) && !form.value.roles.includes(r))
})

function toggleRole(role: string) {
  if (form.value.roles.includes(role)) {
    form.value.roles = form.value.roles.filter(r => r !== role)
  } else {
    form.value.roles.push(role)
  }
  roleSearch.value = ''
}

function removeRole(role: string) {
  form.value.roles = form.value.roles.filter(r => r !== role)
}

const toastMessage = ref('')
function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 2500)
}

function onSubmit() {
  if (isEdit.value) {
    const userToUpdate: User = {
      id: props.userId ?? props.user!.id,
      nom: form.value.nom,
      prenom: form.value.prenom,
      email: form.value.email,
      telephone: form.value.telephone,
      roles: form.value.roles,
      actif: form.value.actif,
      fonction: form.value.fonction,
      categorie: form.value.categorie,
      societe: props.user?.societe ?? '',
      avatar: props.user?.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(form.value.prenom + ' ' + form.value.nom)}&background=0D8ABC&color=fff&rounded=true&size=64`,
      dernierConnexion: props.user?.dernierConnexion ?? new Date().toISOString(),
      nombreConnexions: props.user?.nombreConnexions ?? 0,
      dateEnregistrement: props.user?.dateEnregistrement ?? new Date().toISOString(),
      connexionsReussies: props.user?.connexionsReussies ?? 0,
      deconnexionsReussies: props.user?.deconnexionsReussies ?? 0,
      connexionsEchouees: props.user?.connexionsEchouees ?? 0,
    }
    userStore.updateUser(userToUpdate)
    showToast('Utilisateur modifié avec succès !')
  } else {
    const userToAdd: User = {
      id: Date.now(),
      nom: form.value.nom,
      prenom: form.value.prenom,
      email: form.value.email,
      telephone: form.value.telephone,
      roles: form.value.roles,
      actif: form.value.actif,
      fonction: form.value.fonction,
      categorie: form.value.categorie,
      societe: '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.value.prenom + ' ' + form.value.nom)}&background=0D8ABC&color=fff&rounded=true&size=64`,
      dernierConnexion: new Date().toISOString(),
      nombreConnexions: 0,
      dateEnregistrement: new Date().toISOString(),
      connexionsReussies: 0,
      deconnexionsReussies: 0,
      connexionsEchouees: 0,
    }
    userStore.addUser(userToAdd)
    showToast('Utilisateur créé avec succès !')
  }
  setTimeout(() => emit('submit'), 800)
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
</style> 