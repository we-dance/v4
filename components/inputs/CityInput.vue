<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  placeholder: {
    type: String,
    default: 'City',
  },
  noIcon: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel<{ id: string; name: string } | null>()

const open = ref(false)

const { citySearchResults: results, cityQuery: query } = useCities()

const onSelect = (city: { id: string; name: string }) => {
  model.value = city
  open.value = false
  query.value = ''
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        v-bind="$attrs"
        role="combobox"
        :aria-expanded="open"
        class="gap-2"
      >
        <Icon
          v-if="!noIcon"
          name="heroicons:map-pin"
          class="h-4 w-4 shrink-0 opacity-50"
        />
        <div class="flex-1 text-left">
          <template v-if="model?.name">
            {{ model.name }}
          </template>
          <template v-else>
            <span class="text-muted-foreground">{{ props.placeholder }}</span>
          </template>
        </div>
        <Icon
          name="heroicons:chevron-down"
          class="h-4 w-4 shrink-0 opacity-50"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[300px] p-0">
      <SearchableDropdown
        :items="results"
        v-model="model"
        v-model:searchQuery="query"
        placeholder="Search city..."
        itemKey="id"
        itemLabel="name"
        @select="(city) => onSelect({ id: city.id, name: city.name })"
      />
      <Button
        variant="outline"
        size="sm"
        class="w-full"
        @click="onSelect({ id: '', name: 'Anywhere' })"
      >
        <Icon name="heroicons:map-pin" class="h-4 w-4 shrink-0 opacity-50" />
        Anywhere
      </Button>
    </PopoverContent>
  </Popover>
</template>
