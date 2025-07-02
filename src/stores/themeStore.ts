import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('classic')

  function setTheme(newTheme: string) {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
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