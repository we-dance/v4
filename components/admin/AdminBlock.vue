<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger
      class="flex p-2 px-4 w-full font-semibold rounded bg-muted"
    >
      {{ props.title }}
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="p-4 border">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
