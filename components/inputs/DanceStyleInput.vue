<script setup lang="ts">
const { $client } = useNuxtApp();

const { data: allDanceStyles } = await $client.styles.list.useQuery();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const open = ref(false);
const searchQuery = ref("");

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const onSelect = (newValue: any) => {
  value.value = newValue.hashtag;
  open.value = false;
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="font-normal text-left"
      >
        <div class="flex-1">
          <template v-if="value">
            {{ allDanceStyles?.find((style) => style.hashtag === value)?.name }}
          </template>
          <template v-else>
            <span class="text-muted-foreground">Dance style</span>
          </template>
        </div>
        <Icon
          name="heroicons:chevron-down"
          class="h-4 w-4 shrink-0 ml-2 opacity-50"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0">
      <SearchableDropdown
        :items="allDanceStyles ?? []"
        v-model="value"
        v-model:searchQuery="searchQuery"
        placeholder="Search dance style..."
        itemKey="hashtag"
        itemLabel="name"
        @select="onSelect"
      />
    </PopoverContent>
  </Popover>
</template>
