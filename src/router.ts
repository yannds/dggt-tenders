import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import UserForm from './components/UserForm.vue'
import UserCreate from './components/UserCreate.vue'
import PrivilegesRoles from './components/PrivilegesRoles.vue'
// import StatsDashboard from './components/StatsDashboard.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/StatsDashboard.vue')
  },
  {
    path: '/admin/accounts',
    name: 'AdminAccounts',
    component: () => import('./components/UserList.vue'),
  },
  {
    path: '/admin/accounts/create',
    name: 'UserCreate',
    component: UserCreate,
    props: {},
  },
  {
    path: '/admin/accounts/:id/edit',
    name: 'UserEdit',
    component: UserForm,
    props: route => ({ userId: Number(route.params.id) }),
  },
  {
    path: '/stats-avancees',
    name: 'AdvancedStats',
    component: () => import('./components/AdvancedStatsPage.vue'),
  },
  {
    path: '/admin/privileges',
    name: 'PrivilegesRoles',
    component: PrivilegesRoles,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: { template: '<div style="background: #ffe0e0; padding: 2rem; text-align: center;">404 NOT FOUND</div>' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router 