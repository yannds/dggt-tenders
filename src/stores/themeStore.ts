import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('classic')

  function setTheme(newTheme: string) {
    theme.value = newTheme
    
    // Appliquer sur l'élément HTML racine
    document.documentElement.setAttribute('data-theme', newTheme)
    
    // Appliquer aussi sur le body pour s'assurer
    document.body.setAttribute('data-theme', newTheme)
    
    localStorage.setItem('theme', newTheme)
  }

  function toggleTheme() {
    const newTheme = theme.value === 'classic' ? 'classicmodern' : 'classic'
    setTheme(newTheme)
  }

  function initTheme() {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
    } else {
      setTheme('classic')
    }
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme
  }
}) 