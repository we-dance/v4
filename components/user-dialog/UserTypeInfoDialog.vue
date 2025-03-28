<script setup lang="ts">
const props = defineProps<{
  types: Array<{
    id: string
    label: string
    icon: string
    description: string
  }>
}>()

const dialog = useDialog()
</script>

<template>
  <DialogHeader>
    <DialogTitle>Choose Your Role</DialogTitle>
    <DialogDescription>
      Your role helps us personalize your experience and connect you with
      relevant opportunities in the dance community.
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <div v-for="type in types" :key="type.id" class="space-y-2">
      <div class="flex items-center gap-2">
        <Icon :name="type.icon" class="w-5 h-5 text-primary" />
        <h3 class="font-medium">{{ type.label }}</h3>
      </div>
      <p class="text-sm text-muted-foreground pl-7">{{ type.description }}</p>
    </div>
  </div>

  <DialogFooter>
    <Button variant="ghost" @click="dialog.close">Close</Button>
  </DialogFooter>
</template>
