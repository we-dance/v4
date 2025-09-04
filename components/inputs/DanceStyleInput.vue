<script setup lang="ts">
import type { DanceStyle } from '@prisma/client'
import { computed, ref } from 'vue'
import { X } from 'lucide-vue-next'

const { $client } = useNuxtApp()

const { data: allDanceStyles } = await $client.styles.list.useQuery()

const selectedStyles = defineModel<DanceStyle[]>({
  required: true,
  default: () => [],
})

const open = ref(false)
const searchQuery = ref('')

const filteredStyles = computed(() => {
  const items = allDanceStyles.value ?? []
  const q = searchQuery.value.trim().toLocaleLowerCase()
  if (!q) return items
  return items.filter((style) => style.name.toLocaleLowerCase().includes(q))
})

function toggleStyle(style: DanceStyle) {
  const index = selectedStyles.value.findIndex((s) => s.id === style.id)
  if (index > -1) {
    const newSelection = [...selectedStyles.value]
    newSelection.splice(index, 1)
    selectedStyles.value = newSelection
  } else {
    selectedStyles.value = [...selectedStyles.value, style]
  }
}
</script>

<template>
  <div>
    <div v-if="selectedStyles.length > 0" class="flex flex-wrap gap-2 mb-2">
      <Badge
        v-for="style in selectedStyles"
        :key="style.id"
        variant="secondary"
        class="flex items-center gap-x-1.5"
      >
        {{ style.name }}
        <button
          type="button"
          :aria-label="`Remove ${style.name}`"
          @click="toggleStyle(style)"
        >
          <X class="h-3 w-3" />
        </button>
      </Badge>
    </div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="secondary"
          role="combobox"
          :aria-expanded="open"
          aria-haspopup="listbox"
          :aria-controls="'dance-style-dropdown'"
          class="font-normal text-left"
        >
          <span class="truncate">
            {{
              selectedStyles.length > 0
                ? `${selectedStyles.length} selected`
                : 'Select dance styles…'
            }}
          </span>
          <Icon
            name="heroicons:chevron-down"
            class="h-4 w-4 shrink-0 ml-2 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent id="dance-style-dropdown" class="p-0">
        <SearchableDropdown
          :items="filteredStyles"
          :selection="selectedStyles"
          v-model:searchQuery="searchQuery"
          placeholder="Search dance style..."
          itemKey="id"
          itemLabel="name"
          @select="toggleStyle"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
