<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'reka-ui'

const props = defineProps<DialogCloseProps>()
</script>

<template>
  <DialogClose v-bind="props" class="text-foreground">
    <slot />
  </DialogClose>
</template>
