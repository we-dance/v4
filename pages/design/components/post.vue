<script setup lang="ts">
definePageMeta({
  layout: "design",
});

import { mockPosts } from "~/data/mockPosts";

// Example post
const examplePost = mockPosts[0] as {
  type: "note";
  id: number;
  author: {
    id: string;
    name: string;
    image: string;
    location: string;
    points: number;
  };
  timestamp: string;
  content: { text: string; tags: string[] };
  stats: { likes: number; comments: number; shares: number };
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Post</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        Post component is a versatile building block used to display various
        types of content like events, classes, venues, and social posts. It
        supports dynamic loading of different post types with loading and error
        states.
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
  :standalone="false"
/&gt;</pre
        >
      </div>
    </section>

    <!-- Example -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Example</h2>
      <div class="flex-1 max-w-xl">
        <Post :post="examplePost" />
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
          <div class="text-muted-foreground">required</div>
          <div class="text-muted-foreground">
            Post data including author, content, and stats
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4">
          <div class="font-mono text-sm">standalone</div>
          <div class="text-muted-foreground">boolean</div>
          <div class="text-muted-foreground">false</div>
          <div class="text-muted-foreground">
            Whether the post is displayed standalone or in a list
          </div>
        </div>
      </div>
    </section>

    <!-- Post Types -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Post Types</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          The Post component supports different types of content:
        </p>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">note</code>
              - Text posts with optional polls and links
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">video</code>
              - Video posts with title and description
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded"
                >article</code
              >
              - Long-form content with cover image
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">meet</code>
              - Meet-up requests and social gatherings
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">review</code>
              - Venue and event reviews with ratings
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded"
                >ask_locals</code
              >
              - Questions for local community
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">gig</code>
              - Job postings and opportunities
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">ad</code>
              - Promotional content and special offers
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Post Structure -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Post Structure</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          The Post component consists of several sub-components:
        </p>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded"
                >PostHeader</code
              >
              - Displays author info and timestamp
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded"
                >PostContent</code
              >
              - Dynamic content based on post type
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded"
                >PostTags</code
              >
              - Shows post tags if available
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 text-muted-foreground"
            />
            <p>
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded"
                >PostActions</code
              >
              - Displays interaction stats and buttons
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Features</h2>
      <div class="space-y-4">
        <div class="flex gap-4 items-start">
          <div
            class="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0"
          >
            ✓
          </div>
          <div>
            <p class="font-medium">Dynamic Post Types</p>
            <p class="text-muted-foreground">
              Supports different post types with async loading
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
            <p class="font-medium">Loading States</p>
            <p class="text-muted-foreground">
              Shows skeleton loading state while content is being loaded
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
            <p class="font-medium">Error Handling</p>
            <p class="text-muted-foreground">
              Gracefully handles and displays errors with ErrorBoundary
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
            <p class="font-medium">Modal Support</p>
            <p class="text-muted-foreground">
              Opens post details in a modal when clicked (unless standalone)
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
