<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore'
// import { useToast } from 'vue-toastification' // Décommente si tu as installé vue-toastification

const sidebarOpen = ref(false)
const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
const userStore = useUserStore()
// const toast = useToast && useToast() // Décommente si tu as installé vue-toastification

// Utilisateur connecté fictif (id 1)
const currentUser = userStore.getUserById ? userStore.getUserById(1) : (userStore.users && userStore.users[0])

// Correction : rôle principal de l'utilisateur connecté (ex: 'admin', 'auditeur', etc.)
const currentUserRole = currentUser && currentUser.roles && currentUser.roles.length > 0
  ? (currentUser.roles.map(r => r.toLowerCase()).includes('administrateur') ? 'admin' : (currentUser.roles.map(r => r.toLowerCase()).includes('auditeur') ? 'auditeur' : ''))
  : ''

// Construction dynamique des liens de navigation
const navLinks = [
  { to: '/', label: 'Dashboard', icon: 'home' },
  {
    label: 'Utilisateur', icon: 'user', children: [
      { to: '/admin/accounts', label: 'Utilisateurs', icon: 'users' },
      { to: '/admin/privileges', label: 'Privilèges & rôles', icon: 'key' },
    ]
  },
]
// Ajout du menu Audit/Sécurité à la racine si le rôle le permet
if (currentUserRole === 'admin' || currentUserRole === 'auditeur') {
  const auditChildren = [
    { to: '/admin/audit', label: 'Audit', icon: 'search' },
  ]
  if (currentUserRole === 'admin') {
    auditChildren.push({ to: '/admin/security', label: 'Sécurité', icon: 'lock' })
  }
  // Si plusieurs sous-menus, on regroupe, sinon on met à plat
  if (auditChildren.length > 1) {
    navLinks.push({ label: 'Audit', icon: 'search', children: auditChildren })
  } else {
    navLinks.push(auditChildren[0])
  }
}

function handleMenuAction(action: string) {
  if (!currentUser) return
  // const toast = useToast && useToast() // Optionnel, si tu veux des toasts dans la fonction
  switch (action) {
    case 'edit':
      router.push(`/admin/accounts/${currentUser.id}/edit`)
      break
    case 'password':
      // toast && toast.info('Formulaire de changement de mot de passe à venir !')
      break
    case 'alerts':
      // toast && toast.info('Page alertes à venir !')
      break
    case 'notifications':
      // toast && toast.info('Page notifications à venir !')
      break
    case 'preferences':
      // toast && toast.info('Page préférences à venir !')
      break
    case 'logout':
      // toast && toast.success('Déconnexion réussie !')
      // Ici tu pourrais router vers /login ou reset le store
      break
  }
}

// --- Correction menu utilisateur ---
const isUserMenuOpen = ref(false)
function openUserMenu() { isUserMenuOpen.value = true }
function closeUserMenu() { isUserMenuOpen.value = false }
function handleUserMenuAction(action: string) {
  handleMenuAction(action)
  closeUserMenu()
}
// Fermer le menu si clic en dehors
function onClickOutsideUserMenu(e: MouseEvent) {
  const menu = document.getElementById('user-menu-dropdown')
  if (menu && !menu.contains(e.target as Node)) {
    closeUserMenu()
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('click', onClickOutsideUserMenu)
}

function getIcon(icon: string) {
  switch (icon) {
    case 'home':
      return `<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v2' /></svg>`
    case 'users':
      return `<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75' /></svg>`
    case 'user':
      return `<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z' /></svg>`
    case 'key':
      return `<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 10a2 2 0 11-4 0 2 2 0 014 0zm-2-2v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2' /></svg>`
    case 'search':
      return `<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='11' cy='11' r='7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><line x1='21' y1='21' x2='16.65' y2='16.65' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`
    case 'lock':
      return `<svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='5' y='11' width='14' height='10' rx='2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M7 11V7a5 5 0 0110 0v4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`
    default:
      return ''
  }
}
</script>

<template>
  <div :data-theme="isDark ? 'dark' : 'light'" class="min-h-screen flex flex-col font-sans bg-white text-black w-full h-full">
    <!-- Header neutre -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white flex items-center px-6 h-16 w-full" style="border: none; box-shadow: none;">
      <button class="btn btn-ghost btn-circle mr-4" @click="sidebarOpen = true" aria-label="Ouvrir le menu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <router-link to="/" class="flex items-center gap-2 no-underline hover:opacity-80 transition">
        <img src="https://ui-avatars.com/api/?name=DGGT&background=0D8ABC&color=fff&rounded=true&size=40" class="h-9 w-9 rounded-full border border-gray-200" alt="Avatar DGGT" />
        <span class="font-semibold text-lg tracking-tight">DGGT | Marchés Publics</span>
      </router-link>
      <div class="flex-1"></div>
      <!-- Bouton dark/light mode -->
      <button class="btn btn-ghost btn-circle mr-4" @click="toggleDark" aria-label="Basculer mode sombre/clair">
        <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      </button>
      <!-- Utilisateur connecté + menu -->
      <div class="relative" v-if="currentUser">
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition" @click.stop="isUserMenuOpen = !isUserMenuOpen" @mouseenter="openUserMenu" @mouseleave="closeUserMenu">
          <img :src="`https://ui-avatars.com/api/?name=${currentUser.prenom}+${currentUser.nom}&background=0D8ABC&color=fff&rounded=true&size=32`" class="h-8 w-8 rounded-full border border-gray-200" alt="Avatar utilisateur" />
          <span class="font-semibold text-gray-800 dark:text-white">{{ currentUser.prenom }} {{ currentUser.nom }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <div id="user-menu-dropdown" v-show="isUserMenuOpen" class="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-2 z-50" @mouseenter="openUserMenu" @mouseleave="closeUserMenu">
          <div class="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
            <div class="font-bold text-gray-900 dark:text-white">{{ currentUser.prenom }} {{ currentUser.nom }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ currentUser.roles.join(', ') }} — {{ currentUser.fonction }}</div>
          </div>
          <button class="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition" @click="handleUserMenuAction('edit')">Modifier mes informations</button>
          <button class="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition" @click="handleUserMenuAction('password')">Changer mon mot de passe</button>
          <button class="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition" @click="handleUserMenuAction('alerts')">Mes alertes</button>
          <button class="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition" @click="handleUserMenuAction('notifications')">Mes notifications</button>
          <button class="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition" @click="handleUserMenuAction('preferences')">Mes préférences</button>
          <div class="border-t border-gray-100 dark:border-slate-700 my-2"></div>
          <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 font-semibold transition" @click="handleUserMenuAction('logout')">Se déconnecter</button>
        </div>
      </div>
    </header>

    <!-- Sidebar neutre -->
    <transition name="slide-ltr">
      <aside v-if="sidebarOpen" class="fixed inset-0 z-40 flex">
        <nav class="w-72 h-full bg-white p-8 flex flex-col animate-slide-in" style="box-shadow: none; border: none;">
          <button class="btn btn-ghost btn-circle self-end mb-8" @click="sidebarOpen = false" aria-label="Fermer le menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <ul class="flex flex-col gap-4">
            <li v-for="link in navLinks" :key="link.label">
              <template v-if="!link.children">
                <router-link :to="link.to" class="px-3 py-2 rounded text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 block flex items-center gap-2" @click="sidebarOpen = false">
                  <span v-html="getIcon(link.icon)"></span>
                  {{ link.label }}
                </router-link>
              </template>
              <template v-else>
                <div class="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                  <span v-html="getIcon(link.icon)"></span>
                  {{ link.label }}
                </div>
                <ul class="ml-6 flex flex-col gap-2">
                  <li v-for="sublink in link.children" :key="sublink.label">
                    <router-link :to="sublink.to" class="px-3 py-2 rounded text-base text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 block flex items-center gap-2" @click="sidebarOpen = false">
                      <span v-html="getIcon(sublink.icon)"></span>
                      {{ sublink.label }}
                    </router-link>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </nav>
        <div class="flex-1 bg-black/10 h-full" @click="sidebarOpen = false"></div>
      </aside>
    </transition>

    <!-- Contenu principal 100% -->
    <main class="flex-1 w-full h-full flex flex-col p-0 m-0 pt-16">
      <router-view />
    </main>

    <!-- Footer neutre -->
    <footer class="bg-white/90 border-t border-gray-200 py-6 text-center text-xs text-gray-400 font-normal tracking-wide w-full">
      © {{ new Date().getFullYear() }} DGGT — Ministère des Grands Travaux. Tous droits réservés.
    </footer>
  </div>
</template>

<style scoped>
.slide-ltr-enter-active, .slide-ltr-leave-active {
  transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s;
}
.slide-ltr-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-ltr-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-ltr-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-ltr-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.btn, .btn-ghost, .btn-circle {
  background: none !important;
  box-shadow: none !important;
  border: none !important;
  color: inherit;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.18s;
}
.btn:hover, .btn-ghost:hover {
  background: #f3f4f6 !important;
}

::-webkit-scrollbar {
  width: 8px;
  background: #f3f4f6;
}
::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
</style>
