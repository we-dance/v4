<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  phone: z.string().optional(),
  danceStyles: z.array(z.string()).default([]),
  roles: z.array(z.string()).default([]),
  experience: z.string().optional()
})

const { data: user } = useAppAuth()

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    firstName: user.value?.firstName || '',
    lastName: user.value?.lastName || '',
    username: user.value?.username || '',
    bio: user.value?.bio || '',
    location: user.value?.location || '',
    website: user.value?.website || '',
    phone: user.value?.phone || '',
    danceStyles: user.value?.danceStyles || [],
    roles: user.value?.roles || [],
    experience: user.value?.experience || ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    // TODO: Implement API call to update profile
    toast.success('Profile updated successfully')
  } catch (error) {
    toast.error('Failed to update profile')
  }
})

const danceStyleOptions = [
  'Salsa',
  'Bachata',
  'Kizomba',
  'Zouk',
  'Tango',
  'Swing',
  'Ballet',
  'Contemporary',
  'Hip Hop'
]

const roleOptions = ['Lead', 'Follow', 'Both']

const experienceOptions = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional'
]
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Profile Settings</h1>
        <p class="text-muted-foreground mt-2">
          Update your personal information and preferences
        </p>
      </div>

      <form @submit="onSubmit" class="space-y-8">
        <div class="grid gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Basic Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="firstName">
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="lastName">
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="bio">
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  Tell others about yourself and your dance journey.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- Contact Information -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Contact Information</h2>
            <FormField v-slot="{ componentField }" name="location">
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  Your city or region to help find local events.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="website">
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- Dance Information -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Dance Information</h2>
            <FormField v-slot="{ value, handleChange }" name="danceStyles">
              <FormItem>
                <FormLabel>Dance Styles</FormLabel>
                <FormControl>
                  <div class="flex flex-wrap gap-2">
                    <Button
                      v-for="style in danceStyleOptions"
                      :key="style"
                      type="button"
                      :variant="value?.includes(style) ? 'default' : 'outline'"
                      @click="
                        handleChange(
                          value?.includes(style)
                            ? value.filter((s) => s !== style)
                            : [...(value || []), style]
                        )
                      "
                    >
                      {{ style }}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Select all dance styles you practice.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="roles">
              <FormItem>
                <FormLabel>Dance Roles</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Button
                      v-for="role in roleOptions"
                      :key="role"
                      type="button"
                      :variant="value?.includes(role) ? 'default' : 'outline'"
                      @click="
                        handleChange(
                          value?.includes(role)
                            ? value.filter((r) => r !== role)
                            : [...(value || []), role]
                        )
                      "
                    >
                      {{ role }}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="experience">
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Button
                      v-for="level in experienceOptions"
                      :key="level"
                      type="button"
                      :variant="value === level ? 'default' : 'outline'"
                      @click="handleChange(level)"
                    >
                      {{ level }}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
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