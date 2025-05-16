<script setup lang="ts">
const model = defineModel() as Ref<any>

const { $client } = useNuxtApp()

const searchQuery = ref('')
const { data } = useQuery<any>({
  queryKey: ['profiles.search', searchQuery],
  queryFn: () => $client.profiles.search.query({ query: searchQuery.value }),
  retry: false,
})

const isOpen = ref(false)
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
          <ComboboxEmpty> No profiles found. </ComboboxEmpty>

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
