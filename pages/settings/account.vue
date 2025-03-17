<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

const passwordSchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

const passwordForm = useForm({
  validationSchema: toTypedSchema(passwordSchema)
})

const emailForm = useForm({
  validationSchema: toTypedSchema(emailSchema)
})

const { data: user } = useAppAuth()

const onChangePassword = passwordForm.handleSubmit(async (values) => {
  try {
    // TODO: Implement API call to change password
    toast.success('Password changed successfully')
  } catch (error) {
    toast.error('Failed to change password')
  }
})

const onChangeEmail = emailForm.handleSubmit(async (values) => {
  try {
    // TODO: Implement API call to change email
    toast.success('Email changed successfully')
  } catch (error) {
    toast.error('Failed to change email')
  }
})

const handleDeleteAccount = async () => {
  // TODO: Implement account deletion
  toast.error('Account deletion not implemented yet')
}
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Account Settings</h1>
        <p class="text-muted-foreground mt-2">
          Manage your account security and preferences
        </p>
      </div>

      <div class="grid gap-6">
        <!-- Change Password -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Change Password</h2>
          <form @submit="onChangePassword" class="space-y-4">
            <FormField
              v-slot="{ componentField }"
              name="currentPassword"
            >
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="password"
                    autocomplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="newPassword">
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="password"
                    autocomplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirmPassword">
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="password"
                    autocomplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex justify-end">
              <Button type="submit">Change Password</Button>
            </div>
          </form>
        </div>

        <!-- Change Email -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Change Email</h2>
          <form @submit="onChangeEmail" class="space-y-4">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="email"
                    autocomplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="password"
                    autocomplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex justify-end">
              <Button type="submit">Change Email</Button>
            </div>
          </form>
        </div>

        <!-- Delete Account -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-destructive">Delete Account</h2>
          <p class="text-muted-foreground">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <div class="flex justify-start">
            <Button
              variant="destructive"
              @click="handleDeleteAccount"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 