<script setup lang="ts">
const model = defineModel<string>('model')

const postTypeOptions = [
  { value: 'all', label: 'All Posts', icon: 'ph:list' },
  { value: 'event', label: 'Events', icon: 'ph:calendar' },
  { value: 'meet', label: 'Meet', icon: 'ph:users' },
  { value: 'note', label: 'Threads', icon: 'ph:chat-centered-dots' },
  { value: 'article', label: 'Articles', icon: 'ph:article-medium' },
  { value: 'review', label: 'Reviews', icon: 'ph:star' },
  { value: 'gig', label: 'Gigs', icon: 'ph:music-notes' },
  { value: 'ask_locals', label: 'Ask Locals', icon: 'ph:question' },
  { value: 'video', label: 'Videos', icon: 'ph:video-camera' },
]
</script>
<template>
  <div class="md:hidden flex items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" class="flex items-center gap-2">
          <Icon
            :name="
              postTypeOptions.find((t) => t.value === model)?.icon || 'ph:list'
            "
            class="w-4 h-4"
          />
          {{ postTypeOptions.find((t) => t.value === model)?.label }}
          <Icon name="ph:caret-down" class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          v-for="type in postTypeOptions"
          :key="type.value"
          @click="model = type.value"
          :class="{ 'bg-accent': model === type.value }"
        >
          <Icon :name="type.icon" class="w-4 h-4 mr-2" />
          {{ type.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
