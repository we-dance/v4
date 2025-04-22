<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { profileSchema } from '~/schemas/profile'

const { session } = useAppAuth()

const form = useForm({
  validationSchema: toTypedSchema(profileSchema),
})

form.setValues({
  ...session.value?.profile,
})

const { $client } = useNuxtApp()

const updateProfileMutation = useMutation({
  mutationFn: async (values: any) => {
    const profileId = session.value?.profile?.id

    if (!profileId) {
      throw new Error('User not authenticated')
    }

    return await $client.profiles.update.mutate({
      id: profileId,
      data: values,
    })
  },
  onSuccess: () => {
    toast.success('Profile updated', {
      description: 'Your profile information has been updated successfully.',
    })
  },
  onError: (error: any) => {
    const errorMessage =
      error?.message || 'Failed to update profile information.'
    toast.error('Error', {
      description: errorMessage,
    })
  },
})

const isUpdatingProfile = computed(() => updateProfileMutation.isPending.value)

const canSubmit = computed(() => {
  const isDirty = form.meta.value.dirty
  const isLoading = isUpdatingProfile.value

  return isDirty && !isLoading
})

function onSubmit(e: Event) {
  e.preventDefault()
  updateProfileMutation.mutate(form.values)
}
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:identification" class="w-5 h-5" />
      Profile Information
    </h2>

    <form @submit="onSubmit" class="space-y-6">
      <FormField v-slot="{ componentField }" name="photo">
        <FormItem>
          <FormLabel>Photo</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://example.com/your-photo.jpg"
              class="max-w-md"
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Name
            <span class="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Your display name"
              class="max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="flex items-center gap-1">
            Username
            <span class="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Your unique username"
              class="max-w-md"
            />
          </FormControl>
          <FormDescription>
            This will be your profile URL: wedance.vip/@username
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              v-bind="componentField"
              placeholder="Tell us about yourself"
              class="max-w-2xl"
              rows="4"
            />
          </FormControl>
          <FormDescription>
            Share your dance journey, interests, and what you're looking for
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-start pt-4 gap-2">
        <Button
          type="submit"
          :disabled="!canSubmit"
          class="flex items-center gap-2"
        >
          <Icon
            v-if="isUpdatingProfile"
            name="heroicons:arrow-path"
            class="w-4 h-4 animate-spin"
          />
          <Icon v-else name="heroicons:check" class="w-4 h-4" />
          Save Profile
        </Button>
      </div>
    </form>
  </div>
</template>
