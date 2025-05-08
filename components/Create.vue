<script setup>
const { session } = useAppAuth()

const communities = ref([
  { label: 'Salsa', value: 'salsa' },
  { label: 'Bachata', value: 'bachata' },
  { label: 'Kizomba', value: 'kizomba' },
  { label: 'Zouk', value: 'zouk' },
])
const selectedCommunity = ref(null)

const cities = ref([
  { label: 'New York', value: 'new-york' },
  { label: 'Los Angeles', value: 'los-angeles' },
  { label: 'Chicago', value: 'chicago' },
])
const selectedCity = ref(null)
</script>

<template>
  <div
    class="flex items-center justify-between bg-primary/10 p-2 px-4 rounded-lg"
  >
    <div class="text-sm text-primary font-medium">Share your dance journey</div>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" class="flex items-center gap-2">
          <Icon name="ph:plus" class="w-5 h-5" />
          Post
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <DialogDescription>
            Share your dance story, ask questions, or post an event.
          </DialogDescription>
        </DialogHeader>
        <div class="flex items-start gap-3">
          <Avatar
            :profile="session?.profile"
            class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
          />
          <div class="flex-1">
            <div
              class="font-medium text-foreground hover:text-primary transition-colors"
            >
              {{ session?.profile?.name }}
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Combobox v-model="selectedCommunity" by="label">
                <ComboboxAnchor as-child>
                  <ComboboxTrigger as-child>
                    <Button
                      variant="outline"
                      size="skinny"
                      class="w-auto text-xs"
                    >
                      {{ selectedCommunity?.label ?? 'Community' }}

                      <Icon name="ph:caret-down" class="w-4 h-4" />
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
                      <Search class="size-4 text-muted-foreground" />
                    </span>
                  </div>

                  <ComboboxEmpty> No community found. </ComboboxEmpty>

                  <ComboboxGroup>
                    <ComboboxItem
                      v-for="community in communities"
                      :key="community.value"
                      :value="community"
                    >
                      {{ community.label }}

                      <ComboboxItemIndicator>
                        <Icon
                          name="ph:check"
                          class="ml-auto h-4 w-4"
                          :class="
                            selectedCommunity?.value === community.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          "
                        />
                      </ComboboxItemIndicator>
                    </ComboboxItem>
                  </ComboboxGroup>
                </ComboboxList>
              </Combobox>

              <Combobox v-model="selectedCity" by="label">
                <ComboboxAnchor as-child>
                  <ComboboxTrigger as-child>
                    <Button
                      variant="outline"
                      size="skinny"
                      class="w-auto text-xs"
                    >
                      {{ selectedCity?.label ?? 'City' }}

                      <Icon name="ph:caret-down" class="w-4 h-4" />
                    </Button>
                  </ComboboxTrigger>
                </ComboboxAnchor>

                <ComboboxList>
                  <div class="relative w-full max-w-sm items-center">
                    <ComboboxInput
                      class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
                      placeholder="Search city..."
                    />
                    <span
                      class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
                    >
                      <Search class="size-4 text-muted-foreground" />
                    </span>
                  </div>

                  <ComboboxEmpty> No community found. </ComboboxEmpty>

                  <ComboboxGroup>
                    <ComboboxItem
                      v-for="city in cities"
                      :key="city.value"
                      :value="city"
                    >
                      {{ city.label }}

                      <ComboboxItemIndicator>
                        <Icon
                          name="ph:check"
                          class="ml-auto h-4 w-4"
                          :class="
                            selectedCity?.value === city.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          "
                        />
                      </ComboboxItemIndicator>
                    </ComboboxItem>
                  </ComboboxGroup>
                </ComboboxList>
              </Combobox>
            </div>
          </div>
        </div>
        <Textarea
          v-model="content"
          placeholder="Share your dance story, ask questions, or post an event..."
          class="resize-none text-base"
        />
        <div class="flex justify-start">
          <Button size="icon" variant="ghost">
            <Icon name="ph:image-square-bold" class="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Icon name="ph:link-simple-bold" class="w-4 h-4" />
          </Button>
          <div class="flex-1"></div>
          <Button variant="primary">Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
