<script setup lang="ts">
const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign Up" button in the top right corner and follow the registration process. You\'ll need to provide your email address and create a password.',
      },
      {
        q: 'How do I find dance events?',
        a: 'Use our event search feature to find events near you. You can filter by dance style, date, and location.',
      },
      {
        q: 'How do I connect with other dancers?',
        a: 'You can browse dancer profiles, join communities, and interact with posts. Make sure to complete your profile to attract potential dance partners.',
      },
    ],
  },
  {
    category: 'Account Settings',
    questions: [
      {
        q: 'How do I update my profile?',
        a: 'Go to your profile settings to update your information, including your dance styles, experience level, and preferences.',
      },
      {
        q: 'How do I change my password?',
        a: "Visit your account settings to change your password. You'll need to enter your current password first.",
      },
    ],
  },
  {
    category: 'Safety & Privacy',
    questions: [
      {
        q: 'How do I report inappropriate behavior?',
        a: 'Use the report button on any content or profile, or contact our support team directly through the contact form.',
      },
      {
        q: 'How is my data protected?',
        a: 'We take data protection seriously. Read our Privacy Policy to learn about how we protect your information.',
      },
    ],
  },
]
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Help Center</h1>
    <p class="text-xl text-muted-foreground mb-16">
      Find answers to common questions and learn how to make the most of WeDance
    </p>

    <div class="space-y-12">
      <!-- Quick Links -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Quick Links</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Need help? Our support team is here for you.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" class="w-full">
                <NuxtLink to="/contact">Get Help</NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Learn about our safety recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" class="w-full">
                <NuxtLink to="/safety">View Guidelines</NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Review our community guidelines.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" class="w-full">
                <NuxtLink to="/community-guidelines">Read Rules</NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <!-- FAQs -->
      <section v-for="category in faqs" :key="category.category">
        <h2 class="text-2xl font-semibold mb-6">{{ category.category }}</h2>
        <div class="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem
              v-for="(faq, index) in category.questions"
              :key="index"
              :value="'item-' + index"
            >
              <AccordionTrigger>{{ faq.q }}</AccordionTrigger>
              <AccordionContent>
                <p class="text-muted-foreground">{{ faq.a }}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <!-- Still Need Help -->
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Our support team is ready to
              assist you.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <NuxtLink to="/contact">Contact Support</NuxtLink>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  </div>
</template>
