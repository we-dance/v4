<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/utils";

interface Item {
  [key: string]: any;
}

const props = defineProps<{
  items: Item[];
  modelValue: any;
  searchQuery: string;
  placeholder: string;
  itemKey: string;
  itemLabel: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "update:searchQuery", value: string): void;
  (e: "select", item: Item): void;
}>();

const filteredItems = computed(() => {
  const query = props.searchQuery.toLowerCase();
  return props.items
    .filter((item) => item[props.itemLabel].toLowerCase().includes(query))
    .slice(0, 10);
});

const onSelect = (item: Item) => {
  emit("update:modelValue", item[props.itemKey]);
  emit("select", item);
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center border-b px-3">
      <Icon name="lucide:search" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        :value="searchQuery"
        @input="
          emit('update:searchQuery', ($event.target as HTMLInputElement).value)
        "
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-controls=""
        aria-disabled="false"
        aria-autocomplete="list"
        autocomplete="off"
        :placeholder="placeholder"
        class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
    <div
      v-if="searchQuery.length >= 2 && filteredItems.length === 0"
      class="p-2 text-gray-500"
    >
      No items found.
    </div>
    <ul v-else class="max-h-60 overflow-auto">
      <li
        v-for="item in filteredItems"
        :key="item[itemKey]"
        @click="() => onSelect(item)"
        class="flex items-center p-2 cursor-pointer hover:bg-gray-100"
      >
        <Icon
          name="heroicons:check"
          :class="
            cn(
              'mr-2 h-4 w-4',
              modelValue === item[itemKey] ? 'opacity-100' : 'opacity-0'
            )
          "
        />
        {{ item[itemLabel] }}
      </li>
    </ul>
  </div>
</template>
