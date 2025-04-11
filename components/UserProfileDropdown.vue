<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'
import { toast } from 'vue-sonner'

const { isDark, toggleTheme } = useTheme()
const { signOut, session } = useAppAuth()

// Mock user data - replace with actual user data from your auth system
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  image: null,
})

// Mock notification count - replace with actual count
const notificationCount = ref(3)

// Generate initials from name
const initials = computed(() => {
  return user.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

const handleSignOut = async () => {
  try {
    await signOut()
    toast.success('You have been logged out')
    navigateTo('/')
  } catch (error) {
    toast.error('Failed to log out')
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="relative h-8 w-8 rounded-full"
        aria-label="Open user menu"
      >
        <Avatar :profile="session?.profile" class="h-8 w-8" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end" :side-offset="5">
      <DropdownMenuLabel class="font-normal">
        <div class="flex items-center gap-3">
          <Avatar :profile="session?.profile" class="h-10 w-10" />
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ session?.user?.firstName }} {{ session?.user?.lastName }}
            </p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ session?.user?.email }}
            </p>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem as-child>
        <NuxtLink
          :to="`/@${session?.profile?.username}`"
          class="flex items-center"
        >
          <Icon name="lucide:user" class="mr-2 h-4 w-4" />
          My Profile
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/settings" class="flex items-center">
          <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
          Account Settings
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/" class="flex items-center">
          <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
          View as User
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <NuxtLink to="/help" class="flex items-center">
          <Icon name="lucide:help-circle" class="mr-2 h-4 w-4" />
          Help Center
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem @click="toggleTheme" class="flex items-center">
        <Icon
          :name="isDark ? 'lucide:sun' : 'lucide:moon'"
          class="mr-2 h-4 w-4"
        />
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        @click="handleSignOut"
        class="flex items-center text-destructive focus:text-destructive"
      >
        <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
