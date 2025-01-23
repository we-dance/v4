<script setup lang="ts">
definePageMeta({
  layout: "design",
});

const examplePost = {
  id: "123",
  title: "Salsa Night at Club Havana",
  description: "Join us for a night of Cuban salsa, bachata, and more!",
  type: "event",
  image: "/images/placeholder.jpg",
  date: "2024-04-15",
  location: "Club Havana, Berlin",
  organizer: {
    id: "456",
    username: "salsero",
    name: "Juan Rodriguez",
    photo: "/images/avatar.jpg",
  },
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Post Component</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        The Post component is a core building block of our platform, used to
        display various types of content like events, classes, venues, and
        social posts.
      </p>
    </section>

    <!-- Usage -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Usage</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">Import and use the Post component:</p>
        <pre class="p-4 rounded-lg bg-muted font-mono text-sm">
&lt;Post 
  :post="post"
  :show-actions="true"
  @like="handleLike"
  @share="handleShare"
/&gt;</pre
        >
      </div>
    </section>

    <!-- Props -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Props</h2>
      <div class="border rounded-lg">
        <div class="grid grid-cols-4 gap-4 p-4 border-b font-medium">
          <div>Name</div>
          <div>Type</div>
          <div>Default</div>
          <div>Description</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4 border-b">
          <div class="font-mono text-sm">post</div>
          <div class="text-muted-foreground">Post</div>
          <div class="text-muted-foreground">Required</div>
          <div class="text-muted-foreground">
            The post object containing all post data
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4 border-b">
          <div class="font-mono text-sm">showActions</div>
          <div class="text-muted-foreground">boolean</div>
          <div class="text-muted-foreground">false</div>
          <div class="text-muted-foreground">
            Whether to show like, share, and other action buttons
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4">
          <div class="font-mono text-sm">variant</div>
          <div class="text-muted-foreground">'card' | 'list'</div>
          <div class="text-muted-foreground">'card'</div>
          <div class="text-muted-foreground">The display style of the post</div>
        </div>
      </div>
    </section>

    <!-- Events -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Events</h2>
      <div class="border rounded-lg">
        <div class="grid grid-cols-3 gap-4 p-4 border-b font-medium">
          <div>Name</div>
          <div>Payload</div>
          <div>Description</div>
        </div>
        <div class="grid grid-cols-3 gap-4 p-4 border-b">
          <div class="font-mono text-sm">like</div>
          <div class="text-muted-foreground">{ id: string }</div>
          <div class="text-muted-foreground">
            Emitted when the like button is clicked
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 p-4">
          <div class="font-mono text-sm">share</div>
          <div class="text-muted-foreground">{ id: string }</div>
          <div class="text-muted-foreground">
            Emitted when the share button is clicked
          </div>
        </div>
      </div>
    </section>

    <!-- Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Examples</h2>

      <div class="space-y-8">
        <!-- Card Variant -->
        <div>
          <h3 class="text-lg font-medium mb-4">Card Variant</h3>
          <div class="p-4 border rounded-lg">
            <Post :post="examplePost" variant="card" :show-actions="true" />
          </div>
        </div>

        <!-- List Variant -->
        <div>
          <h3 class="text-lg font-medium mb-4">List Variant</h3>
          <div class="p-4 border rounded-lg">
            <Post :post="examplePost" variant="list" :show-actions="false" />
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Best Practices</h2>
      <div class="space-y-4">
        <div class="flex gap-4 items-start">
          <div
            class="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0"
          >
            ✓
          </div>
          <div>
            <p class="font-medium">Always provide alt text for images</p>
            <p class="text-muted-foreground">
              Ensure accessibility by providing descriptive alt text for post
              images
            </p>
          </div>
        </div>
        <div class="flex gap-4 items-start">
          <div
            class="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0"
          >
            ✓
          </div>
          <div>
            <p class="font-medium">Use appropriate variant for context</p>
            <p class="text-muted-foreground">
              Use card variant for grid layouts and list variant for feed-style
              layouts
            </p>
          </div>
        </div>
        <div class="flex gap-4 items-start">
          <div
            class="w-6 h-6 rounded-full bg-destructive flex items-center justify-center flex-shrink-0"
          >
            ✗
          </div>
          <div>
            <p class="font-medium">Don't modify post content directly</p>
            <p class="text-muted-foreground">
              Use event handlers to manage post interactions and state changes
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Types</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          The Post component uses the following TypeScript interfaces:
        </p>
        <pre
          class="p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap"
        >
interface Post {
  id: string
  title: string
  description: string
  type: 'event' | 'class' | 'venue' | 'social'
  image?: string
  date?: string
  location?: string
  organizer?: {
    id: string
    username: string
    name: string
    photo?: string
  }
}</pre
        >
      </div>
    </section>
  </div>
</template>
