<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const subjects = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Support', value: 'support' },
  { label: 'Safety Concern', value: 'safety' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Press', value: 'press' },
]

async function onSubmit() {
  // TODO: Implement form submission
  console.log('Form submitted:', form.value)
}
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
    <p class="text-xl text-muted-foreground mb-16">
      Have a question or concern? We're here to help.
    </p>

    <div class="grid gap-12 md:grid-cols-2">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Get in Touch</h2>
        <form @submit.prevent="onSubmit" class="space-y-6">
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input id="name" v-model="form.name" required />
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="form.email" required />
          </div>

          <div class="space-y-2">
            <Label for="subject">Subject</Label>
            <Select v-model="form.subject" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="item in subjects"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="message">Message</Label>
            <Textarea id="message" v-model="form.message" required />
          </div>

          <Button type="submit">Send Message</Button>
        </form>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-4">Other Ways to Connect</h2>
        <div class="space-y-6">
          <div>
            <h3 class="font-medium mb-2">Social Media</h3>
            <div class="space-y-2">
              <a href="#" class="text-muted-foreground hover:text-primary block"
                >Instagram</a
              >
              <a href="#" class="text-muted-foreground hover:text-primary block"
                >Facebook</a
              >
              <a href="#" class="text-muted-foreground hover:text-primary block"
                >Twitter</a
              >
            </div>
          </div>

          <div>
            <h3 class="font-medium mb-2">Press Inquiries</h3>
            <p class="text-muted-foreground">
              For press-related questions, please visit our
              <NuxtLink to="/press" class="text-primary hover:underline"
                >press page</NuxtLink
              >.
            </p>
          </div>

          <div>
            <h3 class="font-medium mb-2">Support</h3>
            <p class="text-muted-foreground">
              Need help? Check out our
              <NuxtLink to="/help" class="text-primary hover:underline"
                >help center</NuxtLink
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
