import { defineStore } from 'pinia'

export interface User {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  categorie: string
  societe: string
  roles: string[]
  actif: boolean
  fonction: string
  avatar: string // URL de l'avatar
  dernierConnexion: string // ISO date
  nombreConnexions: number
  dateEnregistrement?: string
  connexionsReussies?: number
  deconnexionsReussies?: number
  connexionsEchouees?: number
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        telephone: '+225 01 23 45 67',
        categorie: 'Admin',
        societe: 'DGGT',
        roles: ['Administrateur', 'DGGT'],
        actif: true,
        fonction: 'Chef de projet',
        avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=0D8ABC&color=fff&rounded=true&size=64',
        dernierConnexion: '2024-06-10T09:15:00Z',
        nombreConnexions: 42,
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@example.com',
        telephone: '+225 07 89 12 34',
        categorie: 'Soumissionnaire',
        societe: 'Société ABC',
        roles: ['Soumissionnaire'],
        actif: false,
        fonction: 'Consultante',
        avatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=F472B6&color=fff&rounded=true&size=64',
        dernierConnexion: '2024-06-08T14:22:00Z',
        nombreConnexions: 7,
      },
      {
        id: 3,
        nom: 'Nguyen',
        prenom: 'Thierry',
        email: 'thierry.nguyen@example.com',
        telephone: '+225 05 67 89 01',
        categorie: 'Finances',
        societe: 'CAF',
        roles: ['Finances', 'CAF'],
        actif: true,
        fonction: 'Responsable financier',
        avatar: 'https://ui-avatars.com/api/?name=Thierry+Nguyen&background=34D399&color=fff&rounded=true&size=64',
        dernierConnexion: '2024-06-09T18:40:00Z',
        nombreConnexions: 19,
      },
    ] as User[],
  }),
  getters: {
    getUsers: (state) => state.users,
    getUserById: (state) => (id: number) => state.users.find(u => u.id === id),
  },
  actions: {
    fetchUsers() {
      // À remplacer par un appel API plus tard
      return this.users
    },
    addUser(user: User) {
      this.users.push(user)
    },
    updateUser(updated: User) {
      const idx = this.users.findIndex(u => u.id === updated.id)
      if (idx !== -1) this.users[idx] = updated
    },
    removeUser(id: number) {
      this.users = this.users.filter(u => u.id !== id)
    },
    resetPassword() {
      // Logique de réinitialisation de mot de passe
      console.log('Réinitialisation du mot de passe')
    },
    toggleActive(id: number) {
      const user = this.users.find(u => u.id === id)
      if (user) user.actif = !user.actif
    },
  },
}) 