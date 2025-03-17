<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const schema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends']),
  showLocation: z.boolean(),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
  allowMessages: z.boolean(),
  allowTagging: z.boolean(),
  showInSearch: z.boolean(),
  shareActivity: z.boolean()
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    profileVisibility: 'public',
    showLocation: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    allowTagging: true,
    showInSearch: true,
    shareActivity: true
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    // TODO: Implement API call to update privacy settings
    toast.success('Privacy settings updated successfully')
  } catch (error) {
    toast.error('Failed to update privacy settings')
  }
})
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Privacy Settings</h1>
        <p class="text-muted-foreground mt-2">
          Control your privacy and visibility settings
        </p>
      </div>

      <form @submit="onSubmit" class="space-y-8">
        <div class="grid gap-6">
          <!-- Profile Visibility -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Profile Visibility</h2>
            <FormField v-slot="{ value, handleChange }" name="profileVisibility">
              <FormItem class="space-y-4">
                <FormLabel>Who can see your profile?</FormLabel>
                <FormControl>
                  <RadioGroup :value="value" @update:value="handleChange">
                    <div class="space-y-2">
                      <RadioGroupItem value="public">
                        <div class="space-y-1">
                          <RadioGroupItemLabel>Public</RadioGroupItemLabel>
                          <RadioGroupItemDescription>
                            Anyone can view your profile
                          </RadioGroupItemDescription>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="friends">
                        <div class="space-y-1">
                          <RadioGroupItemLabel>Friends Only</RadioGroupItemLabel>
                          <RadioGroupItemDescription>
                            Only your connections can view your profile
                          </RadioGroupItemDescription>
                        </div>
                      </RadioGroupItem>
                      <RadioGroupItem value="private">
                        <div class="space-y-1">
                          <RadioGroupItemLabel>Private</RadioGroupItemLabel>
                          <RadioGroupItemDescription>
                            Only you can view your profile
                          </RadioGroupItemDescription>
                        </div>
                      </RadioGroupItem>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- Contact Information -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Contact Information</h2>
            <FormField v-slot="{ value, handleChange }" name="showLocation">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Show Location</FormLabel>
                  <FormDescription>
                    Display your city/region on your profile
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="showEmail">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Show Email</FormLabel>
                  <FormDescription>
                    Display your email on your profile
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="showPhone">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Show Phone Number</FormLabel>
                  <FormDescription>
                    Display your phone number on your profile
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <!-- Interaction Settings -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Interaction Settings</h2>
            <FormField v-slot="{ value, handleChange }" name="allowMessages">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Allow Messages</FormLabel>
                  <FormDescription>
                    Let others send you direct messages
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="allowTagging">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Allow Tagging</FormLabel>
                  <FormDescription>
                    Let others tag you in posts and photos
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>

          <!-- Discovery Settings -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Discovery Settings</h2>
            <FormField v-slot="{ value, handleChange }" name="showInSearch">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Show in Search</FormLabel>
                  <FormDescription>
                    Let others find you in search results
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="shareActivity">
              <FormItem class="flex items-center justify-between space-x-2">
                <div class="space-y-0.5">
                  <FormLabel>Share Activity</FormLabel>
                  <FormDescription>
                    Share your dance activity with others
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="value" @update:checked="handleChange" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  </div>
</template> 