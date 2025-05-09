<script setup lang="ts">
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

const communities = ref([
  { name: 'Salsa', id: 'salsa' },
  { name: 'Bachata', id: 'bachata' },
  { name: 'Kizomba', id: 'kizomba' },
  { name: 'Zouk', id: 'zouk' },
])
</script>

<template>
  <Combobox v-model="model" v-model:open="open" by="name">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button v-bind="$attrs" role="combobox">
          <template v-if="model?.label">
            {{ model.label }}
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
          v-for="community in communities"
          :key="community.id"
          :value="community"
          @select="open = false"
        >
          {{ community.name }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
