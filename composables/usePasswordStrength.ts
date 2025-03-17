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

    // Calculate score based on both length and character variety
    let score = 0
    const length = password.length

    // Length scoring
    if (length >= 8) score += 1
    if (length >= 12) score += 1
    if (length >= 16) score += 2

    // Character variety scoring
    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumbers = /[0-9]/.test(password)
    const hasSymbols = /[^A-Za-z0-9]/.test(password)

    if (hasLowercase) score += 1
    if (hasUppercase) score += 1
    if (hasNumbers) score += 1
    if (hasSymbols) score += 2

    // Set strength level
    if (score <= 2) {
      strength.value = 'weak'
      strengthPercent.value = 33
    } else if (score <= 5) {
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
