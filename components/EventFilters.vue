<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  layout: {
    type: String,
    default: 'vertical', // or 'grid'
  },
})

const emit = defineEmits([
  'update:type',
  'update:status',
  'update:month',
  'update:search',
])

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'party', label: 'Parties' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'festival', label: 'Festivals' },
  { value: 'concert', label: 'Concerts' },
  { value: 'congress', label: 'Congresses' },
]

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Happening Now' },
  { value: 'past', label: 'Past Events' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Search -->
    <div class="space-y-2">
      <label class="text-sm font-medium">Search</label>
      <Input
        :value="filters.search"
        @input="(e) => emit('update:search', e.target.value)"
        placeholder="Search events..."
        type="search"
      >
        <template #prefix>
          <Icon
            name="ph:magnifying-glass"
            class="h-4 w-4 text-muted-foreground"
          />
        </template>
      </Input>
    </div>

    <!-- Event Type -->
    <div class="space-y-2">
      <label class="text-sm font-medium">Event Type</label>
      <div :class="layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'grid gap-2'">
        <Button
          v-for="type in typeOptions"
          :key="type.value"
          :variant="filters.type === type.value ? 'default' : 'outline'"
          @click="emit('update:type', type.value)"
          class="justify-start w-full"
        >
          {{ type.label }}
        </Button>
      </div>
    </div>

    <!-- Status -->
    <div class="space-y-2">
      <label class="text-sm font-medium">Status</label>
      <div :class="layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'grid gap-2'">
        <Button
          v-for="status in statusOptions"
          :key="status.value"
          :variant="filters.status === status.value ? 'default' : 'outline'"
          @click="emit('update:status', status.value)"
          class="justify-start w-full"
        >
          {{ status.label }}
        </Button>
      </div>
    </div>

    <!-- Month -->
    <div class="space-y-2">
      <label class="text-sm font-medium">Month</label>
      <Select
        :value="filters.month"
        @update:value="emit('update:month', $event)"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Months</SelectItem>
          <SelectItem value="1">January</SelectItem>
          <SelectItem value="2">February</SelectItem>
          <SelectItem value="3">March</SelectItem>
          <SelectItem value="4">April</SelectItem>
          <SelectItem value="5">May</SelectItem>
          <SelectItem value="6">June</SelectItem>
          <SelectItem value="7">July</SelectItem>
          <SelectItem value="8">August</SelectItem>
          <SelectItem value="9">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
