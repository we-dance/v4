<script setup lang="ts">
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { privacySettingsSchema, type PrivacySettings } from '~/schemas/user'

const { data } = useAppAuth()

// Default privacy settings
const defaultPrivacySettings: PrivacySettings = {
  profileVisibility: 'public',
  contactPreferences: {
    allowMessages: true,
    showEmail: false,
    showPhone: false,
  },
  activityVisibility: {
    showOnlineStatus: true,
    showEventAttendance: true,
  },
  dataUsage: {
    allowAnalytics: true,
    allowPersonalization: true,
  },
}

// Get user's privacy settings or use defaults
const userPrivacySettings = computed(() => {
  // Since privacySettings is not yet in the database schema, we'll use defaults
  // When the database schema is updated, this can be replaced with actual data
  return defaultPrivacySettings
})

const form = useForm({
  validationSchema: toTypedSchema(privacySettingsSchema),
  initialValues: userPrivacySettings.value,
})

const privacySettings = computed(() => form.values as PrivacySettings)

const isUpdating = ref(false)

const savePrivacySettings = async () => {
  isUpdating.value = true

  try {
    // TODO: When API is ready, uncomment this code
    // const { $client } = useNuxtApp()
    // await $client.users.updatePrivacySettings.mutate({
    //   id: data.value?.user?.id,
    //   data: privacySettings.value,
    // })

    // For now, just show success message
    await new Promise((resolve) => setTimeout(resolve, 500))

    toast.success('Privacy settings updated', {
      description: 'Your privacy preferences have been saved successfully.',
    })
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to update privacy settings.'
    toast.error('Error', {
      description: errorMessage,
    })
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <div class="bg-card rounded-lg shadow p-5 mb-4">
    <h2 class="text-xl font-semibold mb-3 flex items-center gap-2">
      <Icon name="heroicons:shield-check" class="w-5 h-5" />
      Privacy Settings
    </h2>

    <form @submit.prevent="savePrivacySettings" class="space-y-5">
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
          <FormField
            v-slot="{ value, handleChange }"
            name="contactPreferences.allowMessages"
          >
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

          <FormField
            v-slot="{ value, handleChange }"
            name="contactPreferences.showEmail"
          >
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

          <FormField
            v-slot="{ value, handleChange }"
            name="contactPreferences.showPhone"
          >
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
          <FormField
            v-slot="{ value, handleChange }"
            name="activityVisibility.showOnlineStatus"
          >
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
            name="activityVisibility.showEventAttendance"
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
        <Button type="submit" :disabled="isUpdating">
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
