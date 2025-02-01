<script setup lang="ts">
import { dialogs } from './index'
import type { Component } from 'vue'

const dialog = useDialog()

const currentComponent = computed<Component>(() => {
  return dialogs[dialog.currentDialog.value?.component as keyof typeof dialogs]
})

const currentProps = computed(() => {
  return dialog.currentDialog.value?.props ?? {}
})

const isOpen = computed({
  get: () => dialog.isOpen.value,
  set: (value: boolean) => {
    dialog.isOpen.value = value
  },
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="isOpen = $event">
    <DialogContent>
      <component v-if="isOpen" :is="currentComponent" v-bind="currentProps" />
    </DialogContent>
  </Dialog>
</template>
