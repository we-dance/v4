import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Profile } from '~/schemas/profile'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<Profile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userPoints = computed(() => user.value?.points || 0)
  const userLevel = computed(() => {
    const points = userPoints.value
    if (points >= 2000) return 'Guardian'
    if (points >= 1000) return 'Expert'
    if (points >= 500) return 'Trusted'
    if (points >= 200) return 'Established'
    if (points >= 50) return 'Regular'
    return 'Newcomer'
  })

  // Actions
  async function login(email: string, password: string) {
    try {
      isLoading.value = true
      error.value = null
      // TODO: Implement actual login logic
      // This is a placeholder for the actual implementation
      user.value = {
        id: '1',
        name: 'Test User',
        email,
        points: 0,
        // Add other required profile fields
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    // Additional cleanup if needed
  }

  return {
    // State
    user,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    userPoints,
    userLevel,
    // Actions
    login,
    logout,
  }
})
