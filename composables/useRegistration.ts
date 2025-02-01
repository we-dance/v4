interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  userType: string
  terms: boolean
}

// Mock users for testing
const mockUsers = [
  'test@example.com',
  'john@example.com',
  'jane@example.com',
  'demo@example.com',
]

export const useRegistration = () => {
  const isLoading = ref(false)
  const error = ref('')

  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockUsers.includes(email.toLowerCase())
    } catch (e) {
      error.value = 'Could not verify email. Please try again.'
      return false
    }
  }

  const createAccount = async (data: RegistrationData) => {
    try {
      isLoading.value = true
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user data (replace with actual API call)
      mockUsers.push(data.email.toLowerCase())

      return true
    } catch (e) {
      error.value = 'Could not create account. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const exists = await checkEmail(email)
      if (!exists) {
        error.value = 'Invalid email or password'
        return false
      }

      return true
    } catch (e) {
      error.value = 'Could not log in. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    checkEmail,
    createAccount,
    login,
  }
}
