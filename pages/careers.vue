<script setup lang="ts">
const positions = [
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our engineering team to build and scale the WeDance platform. You'll work on exciting challenges in web development, real-time features, and dance-related technology.",
  },
  {
    title: "Community Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description:
      "Help grow and nurture our global dance community. You'll engage with dancers, organize online events, and ensure our platform remains a vibrant space for dance enthusiasts.",
  },
  {
    title: "Dance Content Creator",
    department: "Content",
    location: "Remote",
    type: "Part-time",
    description:
      "Create engaging content about dance, from tutorials to articles. Share your passion for dance while helping others learn and connect.",
  },
];

const benefits = [
  {
    title: "Remote-First Culture",
    description: "Work from anywhere in the world with flexible hours",
  },
  {
    title: "Learning & Development",
    description: "Budget for courses, conferences, and dance classes",
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs",
  },
  {
    title: "Team Events",
    description: "Regular virtual meetups and annual in-person gatherings",
  },
  {
    title: "Equipment Budget",
    description: "Get the tools you need to work effectively",
  },
  {
    title: "Dance Perks",
    description: "Free access to dance events and premium features",
  },
];
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Join Our Team</h1>
    <p class="text-xl text-muted-foreground mb-16">
      Help us build the future of dance community and technology
    </p>

    <div class="space-y-16">
      <!-- Mission -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Our Mission</h2>
        <div class="prose prose-muted max-w-none">
          <p>
            At WeDance, we're passionate about connecting dancers worldwide and
            making dance more accessible to everyone. We're building a platform
            where dancers can learn, share, and grow together.
          </p>
          <p>
            We're looking for talented individuals who share our passion for
            dance and technology. Join us in creating innovative solutions that
            bring joy to millions of dancers globally.
          </p>
        </div>
      </section>

      <!-- Open Positions -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Open Positions</h2>
        <div class="grid gap-6">
          <Card v-for="position in positions" :key="position.title">
            <CardHeader>
              <CardTitle>{{ position.title }}</CardTitle>
              <CardDescription class="flex gap-4 mt-2">
                <Badge variant="secondary">{{ position.department }}</Badge>
                <Badge variant="outline">{{ position.location }}</Badge>
                <Badge variant="outline">{{ position.type }}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">{{ position.description }}</p>
            </CardContent>
            <CardFooter>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <!-- Benefits -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Benefits & Perks</h2>
        <div class="grid gap-6 sm:grid-cols-2">
          <Card v-for="benefit in benefits" :key="benefit.title">
            <CardHeader>
              <CardTitle class="text-lg">{{ benefit.title }}</CardTitle>
              <CardDescription>{{ benefit.description }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <!-- Values -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Our Values</h2>
        <div class="prose prose-muted max-w-none">
          <ul>
            <li>
              <strong>Passion for Dance:</strong> We love dance and believe in
              its power to connect people
            </li>
            <li>
              <strong>Innovation:</strong> We embrace new technologies and ideas
              to improve the dance community
            </li>
            <li>
              <strong>Inclusivity:</strong> We create a welcoming space for
              dancers of all backgrounds
            </li>
            <li>
              <strong>Community First:</strong> We prioritize the needs of our
              dance community
            </li>
            <li>
              <strong>Continuous Learning:</strong> We encourage growth and
              development in both dance and technology
            </li>
          </ul>
        </div>
      </section>

      <!-- No Positions? -->
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Don't See a Perfect Fit?</CardTitle>
            <CardDescription>
              We're always looking for talented individuals who are passionate
              about dance and technology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Send us your resume and tell us how you can contribute to WeDance.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="secondary">
              <NuxtLink to="/contact">Contact Us</NuxtLink>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  </div>
</template>
