<script setup lang="ts">
const pressReleases = [
  {
    title: "WeDance Launches Global Dance Community Platform",
    date: "2024-03-20",
    excerpt:
      "WeDance introduces a revolutionary platform connecting dancers worldwide...",
  },
  {
    title: "WeDance Reaches 100,000 Active Users",
    date: "2024-02-15",
    excerpt:
      "Major milestone achieved as dance community grows exponentially...",
  },
];

const mediaAssets = [
  {
    title: "Brand Kit",
    description: "Download our logo, brand guidelines, and visual assets.",
    link: "#",
  },
  {
    title: "Press Photos",
    description: "High-resolution photos of our platform and community events.",
    link: "#",
  },
  {
    title: "Fact Sheet",
    description: "Key statistics and information about WeDance.",
    link: "#",
  },
];
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Press & Media</h1>
    <p class="text-xl text-muted-foreground mb-16">
      Resources and information for media professionals
    </p>

    <div class="space-y-16">
      <!-- Press Contact -->
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Press Contact</CardTitle>
            <CardDescription>
              For press inquiries, please contact our media relations team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <p>Email: press@wedance.com</p>
              <p>Response time: Within 24 hours</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <NuxtLink to="/contact?subject=press"
                >Contact Press Team</NuxtLink
              >
            </Button>
          </CardFooter>
        </Card>
      </section>

      <!-- Press Releases -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Latest Press Releases</h2>
        <div class="space-y-8">
          <article
            v-for="release in pressReleases"
            :key="release.title"
            class="group"
          >
            <time class="text-sm text-muted-foreground">{{
              release.date
            }}</time>
            <h3 class="text-xl font-semibold mt-2 group-hover:text-primary">
              {{ release.title }}
            </h3>
            <p class="text-muted-foreground mt-2">{{ release.excerpt }}</p>
            <Button variant="link" class="px-0 mt-2">Read More</Button>
          </article>
        </div>
      </section>

      <!-- Media Assets -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Media Resources</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card v-for="asset in mediaAssets" :key="asset.title">
            <CardHeader>
              <CardTitle>{{ asset.title }}</CardTitle>
              <CardDescription>{{ asset.description }}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="secondary">
                <a :href="asset.link">Download</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <!-- About WeDance -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">About WeDance</h2>
        <div class="prose prose-slate max-w-none">
          <p>
            WeDance is the world's leading platform for connecting dancers,
            dance instructors, and dance enthusiasts. Our mission is to make
            dance more accessible and create a vibrant global dance community.
          </p>
          <h3>Key Facts</h3>
          <ul>
            <li>Founded in 2024</li>
            <li>Active in over 50 countries</li>
            <li>Supporting all dance styles</li>
            <li>Focused on community safety and inclusivity</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
