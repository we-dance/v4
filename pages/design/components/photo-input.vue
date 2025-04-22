<script setup lang="ts">
import { Form } from 'vee-validate'
import { ref } from 'vue'

definePageMeta({
  layout: 'design',
})

const coverImageUrl = ref('')
const profileImageUrl = ref('')

function mockUpload() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
      )
    }, 1000)
  })
}

const isUploading = ref(false)
async function handleCoverUpload() {
  isUploading.value = true
  coverImageUrl.value = (await mockUpload()) as string
  isUploading.value = false
}

async function handleProfileUpload() {
  isUploading.value = true
  profileImageUrl.value = (await mockUpload()) as string
  isUploading.value = false
}

function clearCoverImage() {
  coverImageUrl.value = ''
}

function clearProfileImage() {
  profileImageUrl.value = ''
}
</script>

<template>
  <div class="container py-10">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">Photo Input</h1>
      <p class="text-muted-foreground mb-4">
        The PhotoInput component provides a clean, user-friendly interface for
        uploading images to Cloudinary and returns the image URL.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div class="border p-6 rounded-lg shadow-sm">
          <h3 class="text-base font-semibold mb-4">Empty state</h3>
          <div
            class="w-full aspect-square flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center hover:border-primary transition-colors cursor-pointer"
            @click="handleCoverUpload"
          >
            <div v-if="isUploading" class="flex flex-col items-center gap-2">
              <Icon
                name="ph:spinner"
                class="h-12 w-12 animate-spin text-muted-foreground"
              />
              <span class="text-lg font-medium text-muted-foreground"
                >Uploading...</span
              >
            </div>
            <div v-else class="flex flex-col items-center gap-2">
              <Icon
                name="ph:cloud-arrow-up"
                class="h-12 w-12 text-muted-foreground"
              />
              <span class="text-lg font-medium text-muted-foreground"
                >Upload photo</span
              >
              <span class="text-sm text-muted-foreground">Click to select</span>
              <span class="text-xs text-muted-foreground mt-3">
                Supported formats: .jpg, .jpeg, .png, .gif, .webp
              </span>
              <span class="text-xs text-muted-foreground"> Max size: 5MB </span>
            </div>
          </div>
        </div>

        <div class="border p-6 rounded-lg shadow-sm">
          <h3 class="text-base font-semibold mb-4">With image</h3>
          <div
            class="w-full aspect-square relative overflow-hidden bg-muted rounded-lg"
          >
            <img
              src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
              alt="Sample image"
              class="h-full w-full object-cover"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200"
            >
              <div class="flex gap-2">
                <Button variant="destructive" size="sm">
                  <Icon name="ph:trash" class="h-4 w-4 mr-1" />
                  Remove
                </Button>
                <Button variant="secondary" size="sm">
                  <Icon name="ph:arrow-clockwise" class="h-4 w-4 mr-1" />
                  Replace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 mb-8"
      >
        <p class="text-sm flex items-start gap-2">
          <Icon name="ph:info" class="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong class="font-medium">Configuration required:</strong> This
            component needs Cloudinary setup in your Nuxt runtime config. Add
            the following to your .env file:
            <code class="block bg-amber-100 p-2 mt-2 rounded font-mono text-xs">
              NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name<br />
              NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
            </code>
          </span>
        </p>
      </div>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 pb-2 border-b">Basic Usage</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 border rounded-lg bg-card shadow-sm">
          <div class="space-y-6">
            <div>
              <label class="text-base font-medium mb-1.5 block"
                >Cover Image</label
              >
              <!-- Mock PhotoInput component -->
              <div class="relative flex flex-col items-center justify-center">
                <!-- Image preview -->
                <div
                  v-if="coverImageUrl"
                  class="relative overflow-hidden bg-muted rounded-lg"
                  style="width: 400px; height: 250px; max-width: 100%"
                >
                  <img
                    :src="coverImageUrl"
                    alt="Cover Image"
                    class="h-full w-full object-cover"
                  />
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100"
                  >
                    <div class="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        @click="clearCoverImage"
                      >
                        <Icon name="ph:trash" class="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        @click="handleCoverUpload"
                      >
                        <Icon name="ph:arrow-clockwise" class="h-4 w-4 mr-1" />
                        Replace
                      </Button>
                    </div>
                  </div>
                </div>

                <!-- Upload area -->
                <div v-else>
                  <div
                    class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center transition-all hover:border-primary"
                    style="width: 400px; height: 250px; max-width: 100%"
                    @click="handleCoverUpload"
                  >
                    <div
                      v-if="isUploading"
                      class="flex flex-col items-center gap-2 text-foreground"
                    >
                      <Icon name="ph:spinner" class="h-12 w-12 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                    <div
                      v-else
                      class="flex flex-col items-center gap-2 text-muted-foreground"
                    >
                      <Icon name="ph:cloud-arrow-up" class="h-12 w-12" />
                      <span class="text-lg font-medium">Upload photo</span>
                      <span class="text-sm">Click to select</span>
                      <span class="text-xs text-muted-foreground">
                        Supported formats: .jpg, .jpeg, .png, .gif, .webp
                      </span>
                      <span class="text-xs text-muted-foreground">
                        Max size: 5MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-muted-foreground mt-1.5">
                Upload a cover image for your profile
              </p>
            </div>
          </div>
        </div>
        <div>
          <pre
            class="p-4 rounded-lg bg-muted overflow-auto text-sm"
          ><code>&lt;FormField v-slot="{ componentField }" name="photoUrl"&gt;
  &lt;FormItem&gt;
    &lt;FormLabel&gt;Cover Image&lt;/FormLabel&gt;
    &lt;FormControl&gt;
      &lt;PhotoInput v-bind="componentField" :width="400" :height="250" /&gt;
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

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 pb-2 border-b">Square Format</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-6 border rounded-lg bg-card shadow-sm">
          <div class="space-y-6">
            <div>
              <label class="text-base font-medium mb-1.5 block"
                >Profile Photo</label
              >
              <!-- Mock PhotoInput component -->
              <div class="relative flex flex-col items-center justify-center">
                <!-- Image preview -->
                <div
                  v-if="profileImageUrl"
                  class="relative overflow-hidden bg-muted rounded-lg"
                  style="width: 250px; height: 250px; max-width: 100%"
                >
                  <img
                    :src="profileImageUrl"
                    alt="Profile Photo"
                    class="h-full w-full object-cover"
                  />
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100"
                  >
                    <div class="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        @click="clearProfileImage"
                      >
                        <Icon name="ph:trash" class="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        @click="handleProfileUpload"
                      >
                        <Icon name="ph:arrow-clockwise" class="h-4 w-4 mr-1" />
                        Replace
                      </Button>
                    </div>
                  </div>
                </div>

                <!-- Upload area -->
                <div v-else>
                  <div
                    class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center transition-all hover:border-primary"
                    style="width: 250px; height: 250px; max-width: 100%"
                    @click="handleProfileUpload"
                  >
                    <div
                      v-if="isUploading"
                      class="flex flex-col items-center gap-2 text-foreground"
                    >
                      <Icon name="ph:spinner" class="h-12 w-12 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                    <div
                      v-else
                      class="flex flex-col items-center gap-2 text-muted-foreground"
                    >
                      <Icon name="ph:cloud-arrow-up" class="h-12 w-12" />
                      <span class="text-lg font-medium"
                        >Upload profile photo</span
                      >
                      <span class="text-sm">Click to select</span>
                      <span class="text-xs text-muted-foreground">
                        Supported formats: .jpg, .jpeg, .png, .gif, .webp
                      </span>
                      <span class="text-xs text-muted-foreground">
                        Max size: 5MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <pre
            class="p-4 rounded-lg bg-muted overflow-auto text-sm"
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

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 pb-2 border-b">Properties</h2>
      <div class="border rounded-lg overflow-hidden shadow-sm">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="p-3 text-left font-medium">Prop</th>
              <th class="p-3 text-left font-medium">Type</th>
              <th class="p-3 text-left font-medium">Default</th>
              <th class="p-3 text-left font-medium">Description</th>
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
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 pb-2 border-b">
        Cloudinary Integration
      </h2>
      <div class="p-6 bg-muted rounded-lg shadow-sm">
        <p class="mb-4">
          This component integrates seamlessly with Cloudinary's Upload Widget
          to provide a robust and feature-rich upload experience:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-card p-4 rounded-lg shadow-sm border">
            <h3 class="font-medium mb-3 text-base">Key Features</h3>
            <ul class="space-y-3">
              <li class="flex gap-2">
                <Icon
                  name="ph:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <strong class="font-medium"
                    >Simple UI, powerful features</strong
                  >
                  <p class="text-sm text-muted-foreground">
                    Clean interface with click-to-upload functionality
                  </p>
                </div>
              </li>
              <li class="flex gap-2">
                <Icon
                  name="ph:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <strong class="font-medium">Multiple upload sources</strong>
                  <p class="text-sm text-muted-foreground">
                    Upload from local device, URL, camera, Google Drive,
                    Dropbox, Unsplash, and more
                  </p>
                </div>
              </li>
              <li class="flex gap-2">
                <Icon
                  name="ph:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <strong class="font-medium">Interactive cropping</strong>
                  <p class="text-sm text-muted-foreground">
                    Built-in image editing capabilities when cropping option is
                    enabled
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-card p-4 rounded-lg shadow-sm border">
            <h3 class="font-medium mb-3 text-base">Additional Benefits</h3>
            <ul class="space-y-3">
              <li class="flex gap-2">
                <Icon
                  name="ph:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <strong class="font-medium">Smart error handling</strong>
                  <p class="text-sm text-muted-foreground">
                    Clear feedback for errors and upload status
                  </p>
                </div>
              </li>
              <li class="flex gap-2">
                <Icon
                  name="ph:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <strong class="font-medium">Fallback UI</strong>
                  <p class="text-sm text-muted-foreground">
                    Helpful guidance when Cloudinary is not configured
                  </p>
                </div>
              </li>
              <li class="flex gap-2">
                <Icon
                  name="ph:check-circle"
                  class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <strong class="font-medium">Responsive design</strong>
                  <p class="text-sm text-muted-foreground">
                    Adapts to different screen sizes and container widths
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-card p-6 rounded-lg border shadow-sm mb-4">
          <h3 class="font-medium mb-4 text-base">Upload Flow</h3>
          <ol class="space-y-3">
            <li class="flex gap-3">
              <div
                class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                1
              </div>
              <div class="flex-1 pt-1">User clicks on the upload area</div>
            </li>
            <li class="flex gap-3">
              <div
                class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                2
              </div>
              <div class="flex-1 pt-1">Cloudinary widget opens in a modal</div>
            </li>
            <li class="flex gap-3">
              <div
                class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                3
              </div>
              <div class="flex-1 pt-1">
                User selects an image through their preferred method
              </div>
            </li>
            <li class="flex gap-3">
              <div
                class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                4
              </div>
              <div class="flex-1 pt-1">Image uploads to Cloudinary</div>
            </li>
            <li class="flex gap-3">
              <div
                class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                5
              </div>
              <div class="flex-1 pt-1">
                Component receives the URL and updates the v-model
              </div>
            </li>
          </ol>
        </div>

        <div class="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <p class="flex items-center gap-2">
            <Icon name="ph:code" class="h-5 w-5 text-primary" />
            <span class="font-medium">Installation</span>
          </p>
          <p class="mt-2 text-sm">
            Make sure to install and configure the
            <code class="bg-primary/10 px-1.5 py-0.5 rounded"
              >@nuxtjs/cloudinary</code
            >
            module to use this component. Set your Cloudinary credentials in
            your .env file.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6 pb-2 border-b">
        Cloudinary-specific Options
      </h2>
      <div class="border rounded-lg overflow-hidden shadow-sm">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="p-3 text-left font-medium">Prop</th>
              <th class="p-3 text-left font-medium">Type</th>
              <th class="p-3 text-left font-medium">Default</th>
              <th class="p-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td class="p-3 font-mono text-sm">cropping</td>
              <td class="p-3">Boolean</td>
              <td class="p-3">false</td>
              <td class="p-3">
                Enable interactive cropping in the Cloudinary upload widget
              </td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">folder</td>
              <td class="p-3">String</td>
              <td class="p-3">''</td>
              <td class="p-3">Cloudinary folder to store the uploaded image</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">multipleFiles</td>
              <td class="p-3">Boolean</td>
              <td class="p-3">false</td>
              <td class="p-3">
                Allow multiple file uploads (only the last one will be used for
                v-model)
              </td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">tags</td>
              <td class="p-3">Array</td>
              <td class="p-3">[]</td>
              <td class="p-3">
                Tags to apply to uploaded images in Cloudinary
              </td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-sm">sources</td>
              <td class="p-3">Array</td>
              <td class="p-3">
                ['local', 'url', 'camera', 'google_drive', 'dropbox',
                'unsplash']
              </td>
              <td class="p-3">
                Available upload sources in the Cloudinary widget
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
