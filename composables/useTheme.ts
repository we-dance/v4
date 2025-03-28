import { ref } from 'vue'

export const useTheme = () => {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    // Here you would typically also update the actual theme in your app
    // For example, by toggling a class on the html element
    document.documentElement.classList.toggle('dark')
  }

  return {
    isDark,
    toggleTheme
  }
} 