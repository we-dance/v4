<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:location", value: string | null): void;
}>();

const props = defineProps({
  location: {
    type: String as () => string | null,
    default: null,
  },
});

const locationSearch = ref("");

const regions = [
  { name: "Europe", count: "15k+" },
  { name: "North America", count: "12k+" },
  { name: "Latin America", count: "8k+" },
  { name: "Asia", count: "5k+" },
];

const cities = [
  { name: "New York", count: "2.5k+" },
  { name: "London", count: "2k+" },
  { name: "Madrid", count: "1.8k+" },
  { name: "Berlin", count: "1.5k+" },
];

const filteredRegions = computed(() => {
  const search = locationSearch.value.toLowerCase();
  return regions.filter((region) => region.name.toLowerCase().includes(search));
});

const filteredCities = computed(() => {
  const search = locationSearch.value.toLowerCase();
  return cities.filter((city) => city.name.toLowerCase().includes(search));
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <Input v-model="locationSearch" placeholder="Search location...">
      <template #prefix>
        <Icon
          name="ph:magnifying-glass"
          class="w-4 h-4 text-muted-foreground"
        />
      </template>
    </Input>

    <div class="flex flex-col gap-1">
      <div class="font-medium text-sm text-muted-foreground">
        Popular Regions
      </div>
      <Button
        v-for="region in filteredRegions"
        :key="region.name"
        variant="ghost"
        class="justify-start"
        :class="{ 'bg-accent': props.location === region.name }"
        @click="emit('update:location', region.name)"
      >
        {{ region.name }}
        <span class="ml-auto text-sm text-muted-foreground">{{
          region.count
        }}</span>
      </Button>

      <div class="font-medium text-sm text-muted-foreground mt-2">
        Popular Cities
      </div>
      <Button
        v-for="city in filteredCities"
        :key="city.name"
        variant="ghost"
        class="justify-start"
        :class="{ 'bg-accent': props.location === city.name }"
        @click="emit('update:location', city.name)"
      >
        {{ city.name }}
        <span class="ml-auto text-sm text-muted-foreground">{{
          city.count
        }}</span>
      </Button>
    </div>
  </div>
</template>
