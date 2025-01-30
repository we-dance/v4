<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Safety Guidelines</h1>
    <p class="text-xl text-muted-foreground mb-16">
      Your safety is our top priority. Please review these guidelines to ensure
      a secure and comfortable experience.
    </p>

    <div class="space-y-12">
      <section>
        <h2 class="text-2xl font-semibold mb-4">General Safety Tips</h2>
        <div class="space-y-4">
          <p>
            Always prioritize your personal safety when meeting new dance
            partners or attending events:
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Meet in public places for the first time</li>
            <li>Tell a friend about your plans</li>
            <li>Trust your instincts</li>
            <li>Keep your personal information private</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">At Dance Events</h2>
        <div class="space-y-4">
          <p>When attending dance events:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Respect personal boundaries</li>
            <li>Ask for consent before physical contact</li>
            <li>Stay aware of your surroundings</li>
            <li>Report any inappropriate behavior</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Reporting Concerns</h2>
        <div class="space-y-4">
          <p>If you experience or witness any concerning behavior:</p>
          <div class="not-prose mt-4">
            <Button asChild>
              <NuxtLink to="/contact">Contact Our Support Team</NuxtLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
