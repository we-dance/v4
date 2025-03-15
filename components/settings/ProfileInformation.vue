<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { useMutation } from 'vue-query'
import { profileSchema } from '~/schemas/profile'

const { data } = useAppAuth()

const profileForm = useForm({
  validationSchema: profileSchema,
  initialValues: data.value?.profile,
})

const { $client } = useNuxtApp()

const updateProfileMutation = useMutation(
  async (values: any) => {
    const profileId = data.value?.profile.id

    if (!profileId) {
      throw new Error('User not authenticated')
    }

    return await $client.profiles.update.mutate({
      id: profileId,
      data: values,
    })
  },
  {
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
  }
)

const isUpdatingProfile = computed(() => updateProfileMutation.isLoading.value)

const canSubmit = computed(() => {
  return profileForm.meta.value.dirty && !isUpdatingProfile.value
})

const onSubmit = profileForm.handleSubmit(async (values) => {
  updateProfileMutation.mutate(values)
})

const profileTypes = [
  { value: 'dancer', label: 'Dancer' },
  { value: 'artist', label: 'Artist' },
  { value: 'organizer', label: 'Organizer' },
  { value: 'venue', label: 'Venue' },
  { value: 'community', label: 'Community' },
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
]
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:user" class="w-5 h-5" />
      Profile Information
    </h2>

    <form @submit.prevent="onSubmit" class="space-y-6">
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

      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>
            Profile Type
            <span class="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Select v-bind="componentField" placeholder="Select profile type">
              <SelectTrigger class="max-w-md">
                <SelectValue placeholder="Select profile type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="type in profileTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            Choose the type that best represents you in the dance community
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div>
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

        <div>
          <FormField v-slot="{ componentField }" name="location">
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="text"
                  placeholder="Your city or location"
                  class="max-w-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="languages">
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <div class="flex flex-wrap gap-2 max-w-md">
                  <Badge
                    v-for="lang in languageOptions"
                    :key="lang.value"
                    :variant="
                      value?.includes(lang.value) ? 'default' : 'outline'
                    "
                    class="cursor-pointer"
                    @click="
                      handleChange(
                        value?.includes(lang.value)
                          ? value.filter((l: string) => l !== lang.value)
                          : [...(value || []), lang.value]
                      )
                    "
                  >
                    {{ lang.label }}
                  </Badge>
                </div>
              </FormControl>
              <FormDescription> Select languages you speak </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>

      <div class="flex justify-start pt-4">
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
