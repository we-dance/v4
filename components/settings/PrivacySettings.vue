<script setup lang="ts">
import { computed } from 'vue'
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { privacySettingsSchema, type PrivacySettings } from '~/schemas/profile'
import { useMutation } from 'vue-query'

const { session } = useAppAuth()

const form = useForm({
  validationSchema: toTypedSchema(privacySettingsSchema),
  initialValues: privacySettingsSchema.safeParse(
    session.value?.profile?.privacySettings
  ).data,
})

const { $client } = useNuxtApp()

const updatePrivacySettingsMutation = useMutation(
  async (values: PrivacySettings) => {
    const profileId = session.value?.profile?.id

    if (!profileId) {
      throw new Error('User not authenticated')
    }

    return await $client.profiles.updatePrivacySettings.mutate({
      id: profileId,
      data: values,
    })
  },
  {
    onSuccess: () => {
      toast.success('Privacy settings updated', {
        description: 'Your privacy preferences have been saved successfully.',
      })
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || 'Failed to update privacy settings.'
      toast.error('Error', {
        description: errorMessage,
      })
    },
  }
)

const isUpdating = computed(() => updatePrivacySettingsMutation.isLoading.value)

const canSubmit = computed(() => {
  return form.meta.value.dirty && !isUpdating.value
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log('onSubmit', values)
  updatePrivacySettingsMutation.mutate(values)
})
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-3 flex items-center gap-2">
      <Icon name="heroicons:lock-closed" class="w-5 h-5" />
      Privacy Settings
    </h2>

    <form @submit.prevent="onSubmit" class="space-y-5">
      <!-- Profile Visibility -->
      <div>
        <h3 class="text-lg font-medium">Profile Visibility</h3>
        <p class="text-sm text-muted-foreground mb-2">
          Control who can see your profile and personal information
        </p>

        <div class="space-y-2 border rounded-md p-3">
          <FormField v-slot="{ componentField }" name="profileVisibility">
            <FormItem class="space-y-1">
              <FormLabel class="text-base">Who can see your profile?</FormLabel>
              <FormDescription class="mb-2">
                This controls who can see your profile information and dance
                details
              </FormDescription>
              <FormControl>
                <RadioGroup v-bind="componentField">
                  <FormItem class="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <div class="space-y-0.5">
                      <FormLabel class="font-medium">Public</FormLabel>
                      <FormDescription class="text-sm">
                        Anyone can view your profile
                      </FormDescription>
                    </div>
                  </FormItem>
                  <FormItem class="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="members" />
                    </FormControl>
                    <div class="space-y-0.5">
                      <FormLabel class="font-medium">Members Only</FormLabel>
                      <FormDescription class="text-sm">
                        Only registered users can view your profile
                      </FormDescription>
                    </div>
                  </FormItem>
                  <FormItem class="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="connections" />
                    </FormControl>
                    <div class="space-y-0.5">
                      <FormLabel class="font-medium"
                        >Connections Only</FormLabel
                      >
                      <FormDescription class="text-sm">
                        Only your connections can view your profile
                      </FormDescription>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Contact Preferences -->
      <div>
        <h3 class="text-lg font-medium">Contact Preferences</h3>
        <p class="text-sm text-muted-foreground mb-2">
          Manage how others can contact you on the platform
        </p>

        <div class="space-y-2 border rounded-md p-3">
          <FormField v-slot="{ value, handleChange }" name="allowMessages">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3 py-1">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-medium">Allow direct messages</FormLabel>
                <FormDescription>
                  Other users can send you direct messages on the platform
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="showEmail">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3 py-1">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-medium">Show email address</FormLabel>
                <FormDescription>
                  Your email will be visible to other users on your profile
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="showPhone">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3 py-1">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-medium">Show phone number</FormLabel>
                <FormDescription>
                  Your phone number will be visible to other users on your
                  profile
                </FormDescription>
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Activity Visibility -->
      <div>
        <h3 class="text-lg font-medium">Activity Visibility</h3>
        <p class="text-sm text-muted-foreground mb-2">
          Control what others can see about your activity on the platform
        </p>

        <div class="space-y-2 border rounded-md p-3">
          <FormField v-slot="{ value, handleChange }" name="showOnlineStatus">
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3 py-1">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-medium">Show online status</FormLabel>
                <FormDescription>
                  Other users can see when you're active on the platform
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ value, handleChange }"
            name="showEventAttendance"
          >
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3 py-1">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-medium">Show event attendance</FormLabel>
                <FormDescription>
                  Other users can see which events you're attending
                </FormDescription>
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end mt-4">
        <Button type="submit" :disabled="!canSubmit">
          <Icon
            v-if="isUpdating"
            name="heroicons:arrow-path"
            class="w-4 h-4 mr-2 animate-spin"
          />
          {{ isUpdating ? 'Saving...' : 'Save Changes' }}
        </Button>
      </div>
    </form>
  </div>
</template>
