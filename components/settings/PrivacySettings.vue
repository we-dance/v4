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
  if (!data.value?.user?.privacySettings) {
    return defaultPrivacySettings
  }

  try {
    return privacySettingsSchema.parse(data.value.user.privacySettings)
  } catch (error) {
    console.error('Invalid privacy settings format:', error)
    return defaultPrivacySettings
  }
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
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:shield-check" class="w-5 h-5" />
      Privacy Settings
    </h2>

    <form @submit.prevent="savePrivacySettings" class="space-y-8">
      <!-- Profile Visibility -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Profile Visibility</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Control who can see your profile and personal information
        </p>

        <FormField v-slot="{ componentField }" name="profileVisibility">
          <FormItem class="space-y-3">
            <FormLabel>Who can see your profile?</FormLabel>
            <FormControl>
              <RadioGroup v-bind="componentField" class="space-y-2">
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="public" />
                  </FormControl>
                  <FormLabel class="font-normal"
                    >Public - Anyone can view my profile</FormLabel
                  >
                </FormItem>
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="members" />
                  </FormControl>
                  <FormLabel class="font-normal"
                    >Members Only - Only registered users can view my
                    profile</FormLabel
                  >
                </FormItem>
                <FormItem class="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="connections" />
                  </FormControl>
                  <FormLabel class="font-normal"
                    >Connections Only - Only my connections can view my
                    profile</FormLabel
                  >
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              This controls who can see your profile information and dance
              details
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <!-- Contact Preferences -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Contact Preferences</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Manage how others can contact you on the platform
        </p>

        <div class="space-y-3">
          <FormField
            v-slot="{ value, handleChange }"
            name="contactPreferences.allowMessages"
          >
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Allow direct messages</FormLabel>
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
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Show email address</FormLabel>
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
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Show phone number</FormLabel>
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
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Activity Visibility</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Control what others can see about your activity on the platform
        </p>

        <div class="space-y-3">
          <FormField
            v-slot="{ value, handleChange }"
            name="activityVisibility.showOnlineStatus"
          >
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Show online status</FormLabel>
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
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Show event attendance</FormLabel>
                <FormDescription>
                  Other users can see which events you're attending
                </FormDescription>
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Data Usage -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Data Usage</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Control how your data is used on the platform
        </p>

        <div class="space-y-3">
          <FormField
            v-slot="{ value, handleChange }"
            name="dataUsage.allowAnalytics"
          >
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Allow analytics</FormLabel>
                <FormDescription>
                  We collect anonymous usage data to improve the platform
                </FormDescription>
              </div>
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ value, handleChange }"
            name="dataUsage.allowPersonalization"
          >
            <FormItem class="flex flex-row items-start space-y-0 gap-x-3">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel>Allow personalization</FormLabel>
                <FormDescription>
                  We use your preferences to personalize your experience
                </FormDescription>
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
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
