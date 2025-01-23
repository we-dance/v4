<script setup lang="ts">
import { useForm } from "vee-validate";
import * as z from "zod";
import { useAuthStore } from "~/stores/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

const router = useRouter();
const auth = useAuthStore();

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    await auth.login(values.email, values.password);
    router.push("/feed");
  } catch (error) {
    toast.error(error);
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="mt-6 text-3xl font-bold text-foreground">Welcome back</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/register" class="text-primary hover:text-primary/80">
            Sign up
          </NuxtLink>
        </p>
      </div>

      <div class="bg-background rounded-xl shadow-sm border p-8">
        <form @submit="form.handleSubmit(onSubmit)" class="space-y-6">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  v-bind="componentField"
                  :disabled="auth.isLoading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  v-bind="componentField"
                  :disabled="auth.isLoading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex items-center justify-between">
            <NuxtLink
              to="/forgot-password"
              class="text-sm text-primary hover:text-primary/80"
            >
              Forgot your password?
            </NuxtLink>
          </div>

          <div v-if="auth.error" class="text-sm text-destructive">
            {{ auth.error }}
          </div>

          <Button type="submit" class="w-full" :disabled="auth.isLoading">
            <span v-if="auth.isLoading">Signing in...</span>
            <span v-else>Sign in</span>
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>
