import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    daoTotal: 27,
    daoPubliesMois: 4,
    offresRecues: 18,
    daoAttribues: 7,
    daoEnDepouillement: 2,
    daoAnnules: 1,
    reclamations: 5,
    utilisateurs: 14,
    utilisateursActifsMois: 9,
    notificationsNonLues: 3,
    connexionsJour: 6,
    daoParSecteur: {
      BTP: 12,
      Services: 8,
      Fournitures: 7,
    },
  }),
  getters: {
    totalDao: (state) => state.daoTotal,
    totalReclamations: (state) => state.reclamations,
    totalUtilisateurs: (state) => state.utilisateurs,
    totalDaoPubliesMois: (state) => state.daoPubliesMois,
    totalOffresRecues: (state) => state.offresRecues,
    totalDaoAttribues: (state) => state.daoAttribues,
    totalDaoEnDepouillement: (state) => state.daoEnDepouillement,
    totalDaoAnnules: (state) => state.daoAnnules,
    totalUtilisateursActifsMois: (state) => state.utilisateursActifsMois,
    totalNotificationsNonLues: (state) => state.notificationsNonLues,
    totalConnexionsJour: (state) => state.connexionsJour,
    daoParSecteur: (state) => state.daoParSecteur,
  },
}) 