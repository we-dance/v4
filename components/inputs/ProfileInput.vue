<script setup lang="ts">
import { toast } from 'vue-sonner'

const model = defineModel<any>()
const { $client } = useNuxtApp()
const searchQuery = ref('')
const queryKey = computed(() => ['profiles.search', searchQuery.value.trim()])
const { data } = useQuery<any>({
  queryKey,
  queryFn: ({ queryKey: [, term] }) =>
    $client.profiles.search.query({ query: term as string }),
  enabled: computed(() => !!(queryKey.value[1] as string)),
  retry: false,
})
const isOpen = ref(false)

const instagramUsername = computed(() => {
  return extractInstagramUsername(searchQuery.value)
})

const importFromInstagram = async () => {
  if (!instagramUsername.value) return

  const promise = $client.profiles.createFromInstagram.mutate({
    instagramUrl: `https://instagram.com/${instagramUsername.value}`,
  })

  toast.promise(promise, {
    loading: 'Scheduling profile import...',
    success: (profile: any) => {
      if (profile) {
        model.value = profile
        isOpen.value = false
        searchQuery.value = ''
        return 'Profile import scheduled successfully!'
      }
      return 'Profile import scheduled but no profile returned'
    },
    error: (error: any) => (error as Error).message,
  })
}

// Browser-safe duplication of the backend parsing logic.
function isValidInstagramUsername(username: string): boolean {
  if (!username || username.length === 0) return false
  if (username.length > 30) return false // Instagram username limit

  const validPattern = /^[a-zA-Z0-9_]([a-zA-Z0-9_.]*[a-zA-Z0-9_])?$/
  const hasConsecutivePeriods = /\.\./.test(username)

  return validPattern.test(username) && !hasConsecutivePeriods
}

function extractInstagramUsername(input: string): string {
  const raw = input.trim()

  if (raw.startsWith('@')) {
    const username = raw.replace(/^@+/, '').split(/[/?#]/, 1)[0].toLowerCase()
    return isValidInstagramUsername(username) ? username : ''
  }
  const match = raw.match(/instagram\.com\/([a-zA-Z0-9_.]+)/)
  const candidate = match ? match[1] : ''

  // A guard for the most common non-profile routes
  if (/^(p|reel|stories)$/i.test(candidate)) {
    return ''
  }

  const normalized = candidate.toLowerCase()
  return isValidInstagramUsername(normalized) ? normalized : ''
}
</script>

<template>
  <Popover :open="isOpen" @update:open="(v) => (isOpen = v)">
    <PopoverTrigger>
      <div
        v-if="model"
        class="flex items-center justify-start gap-4 border p-4 rounded-md"
      >
        <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <Avatar :profile="model" class="w-full h-full object-cover" />
        </div>
        <div class="text-left flex-1">
          <div class="font-bold">{{ model.name }}</div>
          <div class="text-sm text-gray-500">@{{ model.username }}</div>
        </div>
        <Icon name="heroicons:chevron-down" class="w-4 h-4" />
      </div>
      <div
        v-else
        class="flex items-center justify-start gap-4 border p-4 rounded-md"
      >
        <div class="text-left flex-1">
          <div class="font-bold">Select a profile</div>
        </div>
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <Combobox by="label" v-model="model">
        <ComboboxAnchor class="w-[260px]">
          <div class="relative w-full max-w-sm items-center">
            <ComboboxInput
              class="pl-9 w-full"
              placeholder="Search profile..."
              v-model="searchQuery"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
            >
              <Icon
                name="heroicons:magnifying-glass"
                class="size-4 text-muted-foreground"
              />
            </span>
          </div>
        </ComboboxAnchor>

        <ComboboxList class="w-[260px]">
          <div v-if="instagramUsername">
            <div
              class="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              @click="importFromInstagram"
            >
              <Icon name="heroicons:link" class="h-4 w-4" />
              <span>Import @{{ instagramUsername }} from Instagram</span>
            </div>
          </div>

          <ComboboxEmpty
            v-if="!data?.length && !instagramUsername && searchQuery"
          >
            No profiles found.
          </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem
              v-for="profile in data"
              :key="profile.id"
              :value="profile"
              @select="isOpen = false"
            >
              <div
                class="w-12 h-12 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden"
              >
                <Avatar :profile="profile" class="w-full h-full object-cover" />
              </div>
              <div class="text-left flex-1">
                <div class="font-bold">{{ profile.name }}</div>
                <div class="text-sm text-gray-500">@{{ profile.username }}</div>
              </div>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    </PopoverContent>
  </Popover>
</template>
