import { ref } from 'vue'

export function usePasswordStrength() {
  const strength = ref('weak')
  const strengthPercent = ref(0)

  function checkStrength(password: string) {
    if (!password) {
      strength.value = 'weak'
      strengthPercent.value = 0
      return
    }

    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Character type checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Set strength level
    if (score <= 2) {
      strength.value = 'weak'
      strengthPercent.value = 33
    } else if (score <= 4) {
      strength.value = 'medium'
      strengthPercent.value = 66
    } else {
      strength.value = 'strong'
      strengthPercent.value = 100
    }
  }

  return {
    strength,
    strengthPercent,
    checkStrength,
  }
}
