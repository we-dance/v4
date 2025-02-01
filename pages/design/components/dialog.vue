<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

const isOpen = ref(false)
const isDestructiveOpen = ref(false)
const isFormOpen = ref(false)

const formData = ref({
  name: '',
  email: '',
})

const onSubmit = () => {
  isFormOpen.value = false
  formData.value = { name: '', email: '' }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Dialog</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        Dialogs are modal windows that appear in front of the main content to
        provide critical information or ask for decisions.
      </p>
    </section>

    <!-- Usage -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Usage</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          Import and use the Dialog components:
        </p>
        <pre class="p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre">
&lt;Dialog :open="isOpen" @update:open="isOpen = $event"&gt;
  &lt;DialogContent&gt;
    &lt;DialogHeader&gt;
      &lt;DialogTitle&gt;Dialog Title&lt;/DialogTitle&gt;
      &lt;DialogDescription&gt;Dialog description here.&lt;/DialogDescription&gt;
    &lt;/DialogHeader&gt;
    &lt;div&gt;Dialog content here&lt;/div&gt;
  &lt;/DialogContent&gt;
&lt;/Dialog&gt;</pre
        >
      </div>
    </section>

    <!-- Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Examples</h2>
      <div class="space-y-8">
        <!-- Basic Dialog -->
        <div>
          <h3 class="text-lg font-medium mb-4">Basic Dialog</h3>
          <div class="flex gap-4">
            <Button @click="isOpen = true">Open Dialog</Button>

            <Dialog :open="isOpen" @update:open="isOpen = $event">
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Welcome to WeDance</DialogTitle>
                  <DialogDescription>
                    Join our community of dancers and start exploring events
                    near you.
                  </DialogDescription>
                </DialogHeader>
                <div class="py-4">
                  <p>
                    Ready to get started? Click the button below to create your
                    account.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" @click="isOpen = false"
                    >Cancel</Button
                  >
                  <Button @click="isOpen = false">Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <!-- Destructive Dialog -->
        <div>
          <h3 class="text-lg font-medium mb-4">Destructive Dialog</h3>
          <div class="flex gap-4">
            <Button variant="destructive" @click="isDestructiveOpen = true"
              >Delete Account</Button
            >

            <Dialog
              :open="isDestructiveOpen"
              @update:open="isDestructiveOpen = $event"
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" @click="isDestructiveOpen = false"
                    >Cancel</Button
                  >
                  <Button
                    variant="destructive"
                    @click="isDestructiveOpen = false"
                    >Delete</Button
                  >
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <!-- Form Dialog -->
        <div>
          <h3 class="text-lg font-medium mb-4">Form Dialog</h3>
          <div class="flex gap-4">
            <Button @click="isFormOpen = true">Edit Profile</Button>

            <Dialog :open="isFormOpen" @update:open="isFormOpen = $event">
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <form @submit.prevent="onSubmit" class="space-y-4 py-4">
                  <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      v-model="formData.name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      v-model="formData.email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      @click="isFormOpen = false"
                      >Cancel</Button
                    >
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
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
          <div class="font-mono text-sm">open</div>
          <div class="text-muted-foreground">boolean</div>
          <div class="text-muted-foreground">false</div>
          <div class="text-muted-foreground">
            Controls the visibility of the dialog
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4">
          <div class="font-mono text-sm">@update:open</div>
          <div class="text-muted-foreground">function</div>
          <div class="text-muted-foreground">-</div>
          <div class="text-muted-foreground">
            Event emitted when dialog visibility changes
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
            <p class="font-medium">Keep dialogs focused</p>
            <p class="text-muted-foreground">
              Each dialog should focus on a single task or decision.
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
            <p class="font-medium">Provide clear actions</p>
            <p class="text-muted-foreground">
              Use descriptive labels for buttons and make the primary action
              clear.
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
            <p class="font-medium">Don't nest dialogs</p>
            <p class="text-muted-foreground">
              Avoid opening dialogs from within other dialogs.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
