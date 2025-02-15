import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '~/schemas/user'
import type { Profile } from '~/schemas/profile'
const { signIn, signOut, data, status } = useAuth();

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const profile = ref<Profile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userPoints = computed(() => profile.value?.points || 0)
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
      user.value = {
        id: '1',
        type: 'dancer',
        firstName: 'Alex',
        lastName: 'Razbakov',
        email,
        phone: '111',
        termsSigned: true,
        termsSignedAt: new Date(),
      }
      
      const { error: signInError, url } = await signIn(provider, {
        ...options,
        redirect: false,
        callbackUrl,
      });
      if (error) {
        return signInErrors[signInError] ? signInErrors[signInError] : signInError;
      } else {
        if (authQueryLoading.value) {
          authQueryLoading.value = false;
        } else {
          navigateTo(url, { external: true });
        }
  
        return null;
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
    profile.value = null
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
