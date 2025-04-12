<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const { session } = useAppAuth()

// Create a specific validation schema for social links
const socialLinksSchema = z.object({
  couchsurfing: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  airbnb: z.string().url().optional().or(z.literal('')),
  blablacar: z.string().url().optional().or(z.literal('')),
  spotify: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  vk: z.string().url().optional().or(z.literal('')),
  whatsapp: z.string().url().optional().or(z.literal('')),
  telegram: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  threads: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
})

// Initialize form with existing profile data
const form = useForm({
  validationSchema: toTypedSchema(socialLinksSchema),
  initialValues: socialLinksSchema.safeParse(session.value?.profile).data,
})

const { $client } = useNuxtApp()

const updateSocialLinksMutation = useMutation(
  async (values: any) => {
    const profileId = session.value?.profile?.id

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
      toast.success('Social links updated', {
        description: 'Your social links have been updated successfully.',
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to update social links.'
      toast.error('Error', {
        description: errorMessage,
      })
    },
  }
)

const isUpdating = computed(() => updateSocialLinksMutation.isLoading.value)

const canSubmit = computed(() => {
  const isDirty = form.meta.value.dirty
  const isLoading = isUpdating.value

  return isDirty && !isLoading
})

function onSubmit(e: Event) {
  e.preventDefault()
  updateSocialLinksMutation.mutate(form.values)
}
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:link" class="w-5 h-5" />
      Social Links
    </h2>

    <form @submit="onSubmit" class="space-y-6">
      <!-- All form fields stacked one per line -->
      <FormField v-slot="{ componentField }" name="couchsurfing">
        <FormItem>
          <FormLabel>Couchsurfing</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.couchsurfing.com/people/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="linkedin">
        <FormItem>
          <FormLabel>LinkedIn</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://linkedin.com/in/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="airbnb">
        <FormItem>
          <FormLabel>Airbnb</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.airbnb.com/users/show/000"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="blablacar">
        <FormItem>
          <FormLabel>BlaBlaCar</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.blablacar.de/user/show/000"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="spotify">
        <FormItem>
          <FormLabel>Spotify</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://open.spotify.com/user/000000000"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="youtube">
        <FormItem>
          <FormLabel>Youtube</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.youtube.com/c/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="instagram">
        <FormItem>
          <FormLabel>Instagram</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.instagram.com/username/"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="facebook">
        <FormItem>
          <FormLabel>Facebook</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.facebook.com/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="vk">
        <FormItem>
          <FormLabel>VK</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://vk.com/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="twitter">
        <FormItem>
          <FormLabel>Twitter</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://twitter.com/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="tiktok">
        <FormItem>
          <FormLabel>TikTok</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.tiktok.com/@username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="threads">
        <FormItem>
          <FormLabel>Threads</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://threads.net/@username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="whatsapp">
        <FormItem>
          <FormLabel>Whatsapp</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://wa.me/000000000000"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="telegram">
        <FormItem>
          <FormLabel>Telegram</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://t.me/username"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="website">
        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="url"
              placeholder="https://www.example.com/"
              class="w-full max-w-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Submit Button -->
      <div class="flex justify-start pt-4 gap-2">
        <Button
          type="submit"
          :disabled="!canSubmit"
          class="flex items-center gap-2"
        >
          <Icon
            v-if="isUpdating"
            name="heroicons:arrow-path"
            class="w-4 h-4 animate-spin"
          />
          <Icon v-else name="heroicons:check" class="w-4 h-4" />
          Save Social Links
        </Button>
      </div>
    </form>
  </div>
</template>
