export const useAppAuth = () => {
  const uid = ref(null)
  const authQuery = useState<string>('auth-query', () => '')
  const authQueryLoading = useState<boolean>('auth-query-loading', () => false)

  const { signIn, signOut, data: session, status } = useAuth()

  const isLoggedIn = computed(() => status.value === 'authenticated')

  const { $clientPosthog } = useNuxtApp()
  watch(
    session,
    () => {
      if (process.client && session.value) {
        $clientPosthog.identify(session.value.user.id, {
          username: session.value.profile.username,
          email: session.value.user.email,
        })
      }
    },
    { immediate: true }
  )

  const auth = async (query: string) => {
    if (status.value === 'authenticated') {
      return session.value
    }

    return new Promise((resolve, reject) => {
      const unwatch = watch(
        [session, authQueryLoading],
        ([newSession, inProgress]) => {
          if (newSession) {
            unwatch()
            authQuery.value = ''
            resolve(newSession)
          }

          if (!inProgress) {
            const query = authQuery.value
            authQuery.value = ''
            unwatch()
            reject(new Error(`Can't ${query} without signing in.`))
          }
        }
      )

      authQuery.value = query
      authQueryLoading.value = true
    })
  }

  const login = async (provider: string, options?: any) => {
    const { error, url } = await signIn(provider, {
      ...options,
      redirect: false,
    })
    if (error) {
      return signInErrors[error] ? signInErrors[error] : error
    } else {
      if (authQueryLoading.value) {
        authQueryLoading.value = false
      } else {
        navigateTo(url, { external: true })
      }

      return null
    }
  }

  const signInErrors: { [key: string]: string } = {
    default: 'Unable to sign in.',
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallbackError: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'The e-mail could not be sent.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    SessionRequired: 'Please sign in to access this page.',
  }

  return {
    auth,
    login,
    signOut,
    signInErrors,
    uid,
    authQuery,
    authQueryLoading,
    isLoggedIn,
    session,
  }
}
