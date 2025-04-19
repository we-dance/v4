<script setup lang="ts">
import { Form } from 'vee-validate'

definePageMeta({
  layout: 'design',
})
</script>

<template>
  <div class="container py-10">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">Photo Input</h1>
      <p class="text-muted-foreground">
        The PhotoInput component allows users to upload images to Cloudinary and
        returns the image URL.
      </p>
      <div
        class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800"
      >
        <p class="text-sm flex items-center gap-2">
          <Icon name="ph:info" class="h-5 w-5" />
          <span>
            This component requires proper Cloudinary configuration in your Nuxt
            runtime config. Add the following to your .env file:
            <code class="block bg-amber-100 p-1 mt-1 rounded">
              NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name<br />
              NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
            </code>
          </span>
        </p>
      </div>
    </div>

    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 border rounded-lg bg-card">
          <Form class="space-y-6">
            <FormField v-slot="{ componentField }" name="photoUrl">
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <PhotoInput
                    v-bind="componentField"
                    :width="500"
                    :height="300"
                    :testMode="true"
                  />
                </FormControl>
                <FormDescription>
                  Upload a cover image for your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </Form>
        </div>
        <div>
          <pre
            class="p-4 rounded-lg bg-muted overflow-auto"
          ><code>&lt;FormField v-slot="{ componentField }" name="photoUrl"&gt;
  &lt;FormItem&gt;
    &lt;FormLabel&gt;Cover Image&lt;/FormLabel&gt;
    &lt;FormControl&gt;
      &lt;PhotoInput v-bind="componentField" :width="500" :height="300" /&gt;
    &lt;/FormControl&gt;
    &lt;FormDescription&gt;
      Upload a cover image for your profile
    &lt;/FormDescription&gt;
    &lt;FormMessage /&gt;
  &lt;/FormItem&gt;
&lt;/FormField&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-4">Square Format</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 border rounded-lg bg-card">
          <Form class="space-y-6">
            <FormField v-slot="{ componentField }" name="avatarUrl">
              <FormItem>
                <FormLabel>Profile Photo</FormLabel>
                <FormControl>
                  <PhotoInput
                    v-bind="componentField"
                    :width="250"
                    :height="250"
                    :testMode="true"
                    placeholder="Upload profile photo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </Form>
        </div>
        <div>
          <pre
            class="p-4 rounded-lg bg-muted overflow-auto"
          ><code>&lt;FormField v-slot="{ componentField }" name="avatarUrl"&gt;
  &lt;FormItem&gt;
    &lt;FormLabel&gt;Profile Photo&lt;/FormLabel&gt;
    &lt;FormControl&gt;
      &lt;PhotoInput 
        v-bind="componentField" 
        :width="250" 
        :height="250" 
        placeholder="Upload profile photo" 
      /&gt;
    &lt;/FormControl&gt;
    &lt;FormMessage /&gt;
  &lt;/FormItem&gt;
&lt;/FormField&gt;</code></pre>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Properties</h2>
      <div class="border rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="p-3 text-left">Prop</th>
              <th class="p-3 text-left">Type</th>
              <th class="p-3 text-left">Default</th>
              <th class="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td class="p-3 font-mono text-sm">modelValue</td>
              <td class="p-3">String</td>
              <td class="p-3">''</td>
              <td class="p-3">The URL of the uploaded image</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">width</td>
              <td class="p-3">Number</td>
              <td class="p-3">1024</td>
              <td class="p-3">Width of the upload area and preview</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">height</td>
              <td class="p-3">Number</td>
              <td class="p-3">1024</td>
              <td class="p-3">Height of the upload area and preview</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">placeholder</td>
              <td class="p-3">String</td>
              <td class="p-3">'Upload photo'</td>
              <td class="p-3">Text shown in the upload area</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">maxSize</td>
              <td class="p-3">Number</td>
              <td class="p-3">5</td>
              <td class="p-3">Maximum file size in MB</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">acceptedFileTypes</td>
              <td class="p-3">Array</td>
              <td class="p-3">['.jpg', '.jpeg', '.png', '.gif', '.webp']</td>
              <td class="p-3">Accepted file types</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">testMode</td>
              <td class="p-3">Boolean</td>
              <td class="p-3">false</td>
              <td class="p-3">
                When true, uses local preview instead of uploading to Cloudinary
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
