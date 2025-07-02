<script setup lang="ts">
import { useFilter } from 'reka-ui'
const model = defineModel<{ placeId: string; label: string } | null>()

defineOptions({
  inheritAttrs: false,
})

const open = ref(false)

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Community',
  },
})

const { $client } = useNuxtApp()

const { data: communities } = useQuery<any>({
  queryKey: ['communities.list'],
  queryFn: () => $client.communities.list.query(),
  staleTime: 1000 * 60 * 60 * 24, // 1 day cache
})

const searchTerm = ref('')
const { startsWith } = useFilter({ sensitivity: 'base' })
const filteredCommunities = computed(() =>
  communities.value
    ?.filter((p) => startsWith(p.name, searchTerm.value))
    .slice(0, 5)
)

const selectCommunity = (community: DanceStyle) => {
  model.value = community
  open.value = false
}
</script>

<template>
  <Combobox v-model="model" v-model:open="open" by="name" :ignore-filter="true">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button v-bind="$attrs" role="combobox">
          <template v-if="model?.name">
            {{ model.name }}
          </template>
          <template v-else>
            <span class="text-muted-foreground">{{ props.placeholder }}</span>
          </template>

          <Icon
            name="heroicons:chevron-down"
            class="w-4 h-4 shrink-0 opacity-50"
          />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
          placeholder="Search community..."
          v-model="searchTerm"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
        >
          <Icon
            name="ph:magnifying-glass"
            class="size-4 text-muted-foreground"
          />
        </span>
      </div>

      <ComboboxEmpty> No community found. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="community in filteredCommunities"
          :key="community.id"
          :value="community"
          @select="selectCommunity(community)"
        >
          {{ community.name }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
