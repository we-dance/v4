import type { Post } from '~/schemas/post'
import { validateContent } from '~/utils/post'

export function usePostValidation(post: Post) {
  const validationResult = computed(() => {
    return validateContent(post.type, post.content)
  })

  const hasError = computed(() => !validationResult.value.success)

  const validationError = computed(() => {
    if (validationResult.value.success) return null
    return validationResult.value.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ')
  })

  return {
    hasError,
    validationError,
  }
}
