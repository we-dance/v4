<script setup lang="ts">
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="heroicons:ellipsis-horizontal" class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem> Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
