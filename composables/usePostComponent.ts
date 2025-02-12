import type { Post } from '~/schemas/post'
import { ref, markRaw } from 'vue'

const components = {
  PostNote: () =>
    import('~/components/post/PostNote.vue').then((m) => markRaw(m.default)),
  PostArticle: () =>
    import('~/components/post/PostArticle.vue').then((m) => markRaw(m.default)),
  PostEvent: () =>
    import('~/components/post/PostEvent.vue').then((m) => markRaw(m.default)),
  PostMeet: () =>
    import('~/components/post/PostMeet.vue').then((m) => markRaw(m.default)),
  PostReview: () =>
    import('~/components/post/PostReview.vue').then((m) => markRaw(m.default)),
  PostGig: () =>
    import('~/components/post/PostGig.vue').then((m) => markRaw(m.default)),
  PostAskLocals: () =>
    import('~/components/post/PostAskLocals.vue').then((m) =>
      markRaw(m.default)
    ),
  PostAd: () =>
    import('~/components/post/PostAd.vue').then((m) => markRaw(m.default)),
  PostVideo: () =>
    import('~/components/post/PostVideo.vue').then((m) => markRaw(m.default)),
  PostCourse: () =>
    import('~/components/post/PostCourse.vue').then((m) => markRaw(m.default)),
  PostUnsupported: () =>
    import('~/components/post/PostUnsupported.vue').then((m) =>
      markRaw(m.default)
    ),
} as const

type ComponentName = keyof typeof components

export function usePostComponent() {
  const isLoading = ref(false)
  const loadError = ref<Error | null>(null)

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const getComponentName = (type: Post['type']): ComponentName => {
    if (!type || typeof type !== 'string') {
      return 'PostUnsupported'
    }

    const name = `Post${type
      .split('_')
      .map(capitalize)
      .join('')}` as ComponentName

    return name in components ? name : 'PostUnsupported'
  }

  const loadComponent = async (type: Post['type']) => {
    isLoading.value = true
    loadError.value = null

    try {
      await components[getComponentName(type)]()
    } catch (err) {
      loadError.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  return {
    components,
    getComponentName,
    isLoading,
    loadError,
    loadComponent,
  }
}
