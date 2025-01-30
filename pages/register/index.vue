<script setup lang="ts">
const router = useRouter();
const { createAccount, isLoading, error } = useRegistration();

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  userType: "dancer",
  terms: false,
});

const handleSubmit = async () => {
  try {
    const success = await createAccount(form);
    if (success) {
      router.push({
        path: "/register/styles",
        query: { type: form.userType },
      });
    }
  } catch (e) {
    console.error("Registration failed:", e);
  }
};
</script>

<template>
  <div class="bg-muted">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-3">Join WeDance</h1>
        <p class="text-muted-foreground">
          Create your free account and start connecting with the dance community
        </p>
      </div>

      <div class="bg-background rounded-xl border p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- User Type Selection -->
          <UserTypeSelect v-model="form.userType" :simplified="false" />

          <!-- Name Fields -->
          <NameFields
            v-model:firstName="form.firstName"
            v-model:lastName="form.lastName"
          />

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <Input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              Phone
            </label>
            <Input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your phone number"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-2 border rounded-lg"
              placeholder="Create a password"
            />
          </div>

          <!-- Terms -->
          <TermsCheckbox v-model="form.terms" />

          <!-- Error Message -->
          <div v-if="error" class="text-destructive text-sm">
            {{ error }}
          </div>

          <Button type="submit" :disabled="isLoading" class="w-full">
            <template v-if="isLoading">Creating Account...</template>
            <template v-else>Create Account</template>
          </Button>
        </form>
      </div>

      <div class="text-center text-sm text-muted-foreground mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-primary hover:text-primary/80">
          Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
