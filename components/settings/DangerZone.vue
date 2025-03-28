<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const { $client } = useNuxtApp()
const { data, signOut } = useAppAuth()

const isDeleteDialogOpen = ref(false)
const deleteConfirmation = ref('')
const isDeletingAccount = ref(false)

function confirmDeleteAccount() {
  isDeleteDialogOpen.value = true
}

async function deleteAccount() {
  if (deleteConfirmation.value !== 'delete my account') return

  isDeletingAccount.value = true

  try {
    await $client.users.delete.mutate({
      id: data.value?.user.id,
    })

    toast.success('Account deleted', {
      description: 'Your account has been deleted successfully.',
    })

    signOut()
    navigateTo('/')
  } catch (error: any) {
    const errorMessage = error?.data?.message || 'Failed to delete account.'
    toast.error('Error', {
      description: errorMessage,
    })
  } finally {
    isDeleteDialogOpen.value = false
    deleteConfirmation.value = ''
    isDeletingAccount.value = false
  }
}
</script>

<template>
  <div class="bg-card rounded-lg border border-destructive/20 shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-destructive flex items-center">
      Danger Zone
    </h2>

    <Alert variant="destructive" class="mb-4">
      <AlertTitle>Account Deletion Warning</AlertTitle>
      <AlertDescription>
        Deleting your account will permanently remove all your data, including
        profile information, connections, and activity history. This action
        cannot be undone.
      </AlertDescription>
    </Alert>

    <Button
      type="button"
      variant="destructive"
      @click="confirmDeleteAccount"
      class="flex items-center gap-2"
    >
      <Icon name="heroicons:trash" class="w-4 h-4" />
      Delete Account
    </Button>
  </div>

  <Dialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2 text-destructive">
          <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
          Delete Account
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete your account? This action cannot be
          undone and will immediately log you out of all devices.
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <p class="mb-4">
          Please type <strong>delete my account</strong> to confirm:
        </p>
        <Input
          v-model="deleteConfirmation"
          placeholder="delete my account"
          class="w-full"
          aria-label="Confirmation text"
        />
        <p class="text-sm text-muted-foreground mt-2">
          This will delete all your data including profile information,
          connections, and activity history.
        </p>
      </div>

      <DialogFooter>
        <div class="flex items-center gap-3">
          <Button variant="outline" @click="isDeleteDialogOpen = false">
            Cancel
          </Button>
          <Button
            variant="destructive"
            @click="deleteAccount"
            :disabled="
              deleteConfirmation !== 'delete my account' || isDeletingAccount
            "
            class="flex items-center gap-2"
          >
            <Icon
              v-if="isDeletingAccount"
              name="heroicons:arrow-path"
              class="w-4 h-4 animate-spin"
            />
            <Icon v-else name="heroicons:trash" class="w-4 h-4" />
            Delete Account
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
