<script setup lang="ts">
import type { Price } from '~/schemas/event'

const props = defineProps<{
  prices: Price[]
  onSelect: (price: Price) => void
}>()

const dialog = useDialog()

const handleSelect = (price: Price) => {
  props.onSelect(price)
  dialog.close()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Select Pricing Option</DialogTitle>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <Button
      v-for="price in prices"
      :key="price.id"
      variant="secondary"
      class="w-full justify-between h-auto py-4"
      @click="handleSelect(price)"
    >
      <div class="flex flex-col items-start gap-1">
        <span class="font-medium">{{ price.name }}</span>
        <span class="text-sm text-muted-foreground">{{
          price.description
        }}</span>
      </div>
      <span class="font-bold whitespace-nowrap">
        {{ price.amount }} {{ price.currency }}
      </span>
    </Button>
  </div>

  <DialogFooter>
    <Button variant="ghost" @click="dialog.close">Cancel</Button>
  </DialogFooter>
</template>
