<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
    <div class="w-full max-w-xl bg-white rounded-2xl shadow-xl p-0 border border-blue-100">
      <div class="w-full bg-blue-600 py-5 px-6 flex items-center justify-center rounded-t-2xl">
        <h2 class="text-2xl font-bold text-white text-center w-full">Créer un utilisateur</h2>
      </div>
      <div class="px-8 py-8">
        <UserForm @submit="handleCreated" @cancel="handleCancel" />
      </div>
    </div>
    <div v-if="toastMessage" class="fixed bottom-8 right-8 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserForm from './UserForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toastMessage = ref('')
function handleCreated() {
  toastMessage.value = 'Utilisateur créé avec succès !'
  setTimeout(() => {
    toastMessage.value = ''
    router.push('/admin/accounts')
  }, 2000)
}
function handleCancel() {
  toastMessage.value = 'Création annulée.'
  setTimeout(() => {
    toastMessage.value = ''
    router.push('/admin/accounts')
  }, 2000)
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