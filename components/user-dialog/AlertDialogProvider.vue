<script setup lang="ts">
const dialogProxy = useAlertDialog()

const isOpen = computed({
  get: () => dialogProxy.isOpen.value,
  set: (value: boolean) => {
    if (!value) {
      dialogProxy.close()
    }
  },
})

const dialog = computed(() => dialogProxy.currentDialog.value)
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ dialog?.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ dialog?.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="dialog?.onCancel">{{
          dialog?.cancelLabel
        }}</AlertDialogCancel>
        <AlertDialogAction @click="dialog?.onConfirm">{{
          dialog?.confirmLabel
        }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
